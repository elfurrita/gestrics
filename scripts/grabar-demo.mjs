// grabar-demo.mjs — graba un vídeo corto de la aplicación, sin voz, con
// rótulos dentro de la propia página.
//
//   node scripts/grabar-demo.mjs es
//   node scripts/grabar-demo.mjs en
//
// Deja los fotogramas y una lista para FFmpeg en una carpeta del temporal del
// sistema, y muestra la orden que los monta en un MP4. No monta el vídeo por sí
// solo para no depender de dónde esté instalado FFmpeg.
//
// ── Antes de ejecutarlo ────────────────────────────────────────────────────
//
// Es la misma preparación que capturar.mjs, y por la misma razón: la
// aplicación tiene que mostrar los datos de demostración, no los reales.
//
// 1. Backend contra una carpeta DESECHABLE:
//      node ../outreach-studio/backend/scripts/backend-aislado.cjs
//    Con ella no hay cuenta de correo configurada, así que nada de lo que se
//    pulse puede mandar un correo de verdad, y la base real no se toca.
// 2. Sembrar la demostración con GESTRICS_DB apuntando a esa carpeta, siguiendo
//    el orden de la cabecera de sembrar-demo.mjs.
// 3. Front en http://localhost:5173.
//
// Se pilota Edge por CDP, igual que capturar.mjs. Los fotogramas salen de
// Page.startScreencast, no de una captura de pantalla de Windows: Edge va sin
// ventana, así que no hay nada visible que grabar.

import { spawn } from "node:child_process";
import { writeFileSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const PUERTO = 9334;
const APP = "http://localhost:5173";

// El armazón de la aplicación mide 1176px fijos. 662 de alto da 16:9, que es lo
// que espera un vídeo. Densidad 2× para que al bajar a 1920×1080 salga nítido.
const ANCHO = 1176;
const ALTO = 662;

const IDIOMA = (process.argv[2] || "es").toLowerCase();
if (!["es", "en"].includes(IDIOMA)) {
  console.error('Idioma no reconocido. Usa "es" o "en".');
  process.exit(1);
}

const SALIDA = join(tmpdir(), "gestrics-video-" + IDIOMA);
rmSync(SALIDA, { recursive: true, force: true });
mkdirSync(join(SALIDA, "frames"), { recursive: true });

const dormir = ms => new Promise(r => setTimeout(r, ms));

// ── Textos por idioma ────────────────────────────────────────────────────
const T = IDIOMA === "en"
  ? {
      prospeccion: "OUTREACH", proyectos: "PROJECTS", metricas: "METRICS",
      contacto: "Sofia Marchetti", proyectoCat: "pressure sensor",
      proyectoPagado: "Interface localisation", grafico: "COLLECTED BY MONTH",
      c0: "Gestrics · from the first email to the invoice being paid",
      c1: "01 · Outreach: contacts, templates and batch sending",
      c2: "02 · The job: import a Trados, memoQ or Wordfast analysis and price each match band",
      c3: "03 · The invoice: with your country's tax profile, as a PDF ready to send",
      c4: "04 · Getting paid: what has been collected, month by month",
      f1: "Your data stays on your computer", f2: "€150 one time · 14-day free trial, no card",
      f3: "outreachstudio.app",
    }
  : {
      prospeccion: "PROSPECCIÓN", proyectos: "PROYECTOS", metricas: "MÉTRICAS",
      contacto: "Sofia Marchetti", proyectoCat: "sensor de presión",
      proyectoPagado: "Localización de interfaz", grafico: "COBRADO POR MES",
      c0: "Gestrics · del primer correo a la factura cobrada",
      c1: "01 · Prospección: contactos, plantillas y envío por lotes",
      c2: "02 · El encargo: importa el análisis de Trados, memoQ o Wordfast y pon precio a cada tramo",
      c3: "03 · La factura: con el perfil fiscal de tu país, en un PDF listo para enviar",
      c4: "04 · El cobro: lo cobrado, mes a mes",
      f1: "Tus datos se quedan en tu ordenador", f2: "150 € una sola vez · 14 días gratis, sin tarjeta",
      f3: "outreachstudio.app",
    };

// ── Edge ─────────────────────────────────────────────────────────────────
const edge = spawn(EDGE, [
  "--headless=new",
  `--remote-debugging-port=${PUERTO}`,
  `--window-size=${ANCHO},${ALTO}`,
  "--hide-scrollbars",
  "--force-color-profile=srgb",
  "--user-data-dir=" + join(tmpdir(), "gestrics-video-edge"),
  "about:blank",
], { stdio: "ignore" });

async function objetivo() {
  for (let i = 0; i < 40; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PUERTO}/json/list`);
      const t = (await r.json()).find(x => x.type === "page");
      if (t?.webSocketDebuggerUrl) return t.webSocketDebuggerUrl;
    } catch { /* Edge todavía arrancando. */ }
    await dormir(400);
  }
  throw new Error("Edge no expuso ningún objetivo CDP.");
}

const ws = new WebSocket(await objetivo());
await new Promise(r => ws.addEventListener("open", r, { once: true }));

let id = 0;
const pendientes = new Map();
const fotogramas = [];
ws.addEventListener("message", ev => {
  const m = JSON.parse(ev.data);
  if (m.id && pendientes.has(m.id)) { pendientes.get(m.id)(m); pendientes.delete(m.id); return; }
  if (m.method === "Page.javascriptDialogOpening") {
    console.log("  (aviso) cuadro de diálogo: " + m.params.type + " «" + String(m.params.message).slice(0, 80) + "»");
    cdp("Page.handleJavaScriptDialog", { accept: false }).catch(() => {});
    return;
  }
  if (m.method === "Page.screencastFrame") {
    const n = fotogramas.length;
    const f = join(SALIDA, "frames", String(n).padStart(5, "0") + ".jpg");
    writeFileSync(f, Buffer.from(m.params.data, "base64"));
    fotogramas.push({ f, t: m.params.metadata.timestamp });
    cdp("Page.screencastFrameAck", { sessionId: m.params.sessionId }).catch(() => {});
  }
});

function cdp(metodo, params = {}) {
  const n = ++id;
  return new Promise((res, rej) => {
    // Sin límite, una orden que Edge nunca contesta (un cuadro de diálogo
    // abierto, una página colgada) deja el guion esperando para siempre y sin
    // decir nada.
    const t = setTimeout(() => { pendientes.delete(n); rej(new Error(metodo + ": sin respuesta en 20 s")); }, 20000);
    pendientes.set(n, m => { clearTimeout(t); m.error ? rej(new Error(metodo + ": " + m.error.message)) : res(m.result); });
    ws.send(JSON.stringify({ id: n, method: metodo, params }));
  });
}
const evaluar = async expr => {
  const r = await cdp("Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true });
  return r.result?.value;
};

await cdp("Page.enable");
await cdp("Runtime.enable");
await cdp("Network.enable");
await cdp("Network.setCacheDisabled", { cacheDisabled: true });
await cdp("Emulation.setDeviceMetricsOverride", { width: ANCHO, height: ALTO, deviceScaleFactor: 2, mobile: false });
await cdp("Page.navigate", { url: APP });
await dormir(6000);

// El idioma se elige con el propio conmutador de la aplicación.
const CLIC = "var clic=function(el){if(!el)return false;" +
  "['pointerdown','mousedown','pointerup','mouseup','click'].forEach(function(t){" +
  "el.dispatchEvent(new MouseEvent(t,{bubbles:true,cancelable:true,view:window}));});return true;};";
await evaluar("(function(){" + CLIC +
  "var b=[].slice.call(document.querySelectorAll('button,span,div')).filter(function(e){" +
  "return e.children.length===0&&e.textContent.trim()===" + JSON.stringify(IDIOMA.toUpperCase()) + ";}).pop();" +
  "return clic(b);})()");
await dormir(1500);

// La franja de «Prueba gratuita · quedan N días / Comprar licencia» se oculta SOLO
// en la grabación: es un aviso que no tiene sentido en un vídeo de
// demostración, y la aplicación no se modifica. Se vuelve a ocultar si React la
// repinta.
await evaluar(`(function () {
  function ocultar() {
    [].slice.call(document.querySelectorAll("*")).filter(function (x) {
      // Se excluyen los elementos del propio vídeo: la pantalla final dice
      // «14-day free trial» y el ocultador se la llevó por delante en inglés.
      return x.children.length === 0 && /Prueba gratuita|Free trial/i.test(x.textContent) &&
             !x.closest("#gd-fin") && !x.closest("#gd-cap");
    }).forEach(function (h) {
      // Se sube solo mientras el contenedor siga siendo una barra baja: subir
      // "hasta el ancho completo" se llevaba por delante la aplicación entera.
      var b = h;
      while (b.parentElement && b.parentElement !== document.body &&
             b.parentElement.getBoundingClientRect().height < 100) b = b.parentElement;
      if (b.getBoundingClientRect().height < 100) b.style.display = "none";
    });
  }
  ocultar();
  new MutationObserver(ocultar).observe(document.body, { childList: true, subtree: true });
})()`);
await dormir(400);

// Red de seguridad, la misma que capturar.mjs: si la base tuvo contactos antes
// de marcarse el centinela, la aplicación se toma por la instalación original y
// rellena las plantillas con datos personales reales, que acabarían en un
// vídeo público. Es GENÉRICA a propósito: busca la forma de una identidad real,
// no a nadie en concreto. Todo lo sembrado usa el dominio reservado .example.
const fuga = await evaluar(`(function () {
  var texto = document.body.innerText + " " +
    [].slice.call(document.querySelectorAll("textarea,input"))
      .map(function (e) { return e.value; }).join(" ");
  var sospechas = [];
  (texto.match(/[\\w.+-]+@[\\w.-]+\\.[a-z]{2,}/gi) || []).forEach(function (c) {
    if (!/\\.example$/i.test(c) && !/@outreachstudio\\.app$/i.test(c)) sospechas.push(c);
  });
  (texto.match(/\\b(?:[\\w-]+\\.)+(?:com|net|org|io|app)\\/[\\w./-]+/gi) || [])
    .forEach(function (u) { sospechas.push(u); });
  return sospechas.slice(0, 4).join(", ");
})()`);
if (fuga) {
  console.error("\nABORTADO: hay lo que parecen datos reales en pantalla (" + fuga + ").");
  ws.close(); edge.kill();
  process.exit(1);
}

// ── Cursor, pulsación y rótulos, fuera del árbol de React ─────────────────
await evaluar(`(function () {
  var s = document.createElement("style");
  s.textContent =
    "#gd-cursor{position:fixed;left:0;top:0;width:26px;height:26px;z-index:2147483647;pointer-events:none;" +
    "transform:translate(-3px,-2px);filter:drop-shadow(0 2px 3px rgba(0,0,0,.35));}" +
    "#gd-onda{position:fixed;width:34px;height:34px;margin:-17px 0 0 -17px;border-radius:50%;" +
    "border:3px solid #34B3A1;z-index:2147483646;pointer-events:none;opacity:0;}" +
    "#gd-onda.on{animation:gd-onda .5s ease-out;}" +
    "@keyframes gd-onda{from{opacity:.95;transform:scale(.4)}to{opacity:0;transform:scale(1.7)}}" +
    "#gd-cap{position:fixed;left:50%;bottom:26px;transform:translateX(-50%);max-width:92%;z-index:2147483645;" +
    "pointer-events:none;color:#fff;font:800 25px/1.3 Inter,system-ui,sans-serif;letter-spacing:.2px;" +
    "text-align:center;transition:opacity .35s;opacity:0;" +
    // Sin cuadro: contorno oscuro grueso DETRÁS del relleno (paint-order) y una
    // sombra suave debajo. Se lee igual sobre el fondo claro de la aplicación
    // que sobre la cabecera oscura.
    "paint-order:stroke fill;-webkit-text-stroke:6px #1E2D3D;" +
    "text-shadow:0 3px 10px rgba(30,45,61,.55),0 1px 0 #1E2D3D;}" +
    "#gd-fin{position:fixed;inset:0;z-index:2147483647;pointer-events:none;background:#1E2D3D;color:#fff;" +
    "display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;opacity:0;" +
    "transition:opacity .6s;font-family:Inter,system-ui,sans-serif;text-align:center;}" +
    "#gd-fin .a{font-size:34px;font-weight:700}#gd-fin .b{font-size:22px;color:#E8B98C}#gd-fin .c{font-size:26px;color:#34B3A1;font-weight:600}";
  document.head.appendChild(s);
  var c = document.createElement("div"); c.id = "gd-cursor";
  c.innerHTML = '<svg viewBox="0 0 24 24" width="26" height="26"><path d="M3 2l15 9-6.5 1.6L8.6 19z" fill="#fff" stroke="#1E2D3D" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  var o = document.createElement("div"); o.id = "gd-onda";
  var k = document.createElement("div"); k.id = "gd-cap";
  document.body.appendChild(o); document.body.appendChild(c); document.body.appendChild(k);
  window.__cur = function (x, y) { c.style.left = x + "px"; c.style.top = y + "px"; };
  window.__onda = function (x, y) { o.style.left = x + "px"; o.style.top = y + "px"; o.className = ""; void o.offsetWidth; o.className = "on"; };
  window.__cap = function (t) { if (!t) { k.style.opacity = 0; return; } k.textContent = t; k.style.opacity = 1; };
  window.__fin = function (a, b, cc) {
    var f = document.getElementById("gd-fin");
    if (!f) { f = document.createElement("div"); f.id = "gd-fin"; document.body.appendChild(f); }
    f.innerHTML = '<div class="a">' + a + '</div><div class="b">' + b + '</div><div class="c">' + cc + '</div>';
    void f.offsetWidth; f.style.opacity = 1;
  };
  window.__cur(ANCHO_X, ALTO_Y);
})()`.replace("ANCHO_X", String(Math.round(ANCHO / 2))).replace("ALTO_Y", String(Math.round(ALTO / 2))));

// ── Movimientos ──────────────────────────────────────────────────────────
let cx = ANCHO / 2, cy = ALTO / 2;
const suave = t => t * t * (3 - 2 * t);

// Aleatoriedad con semilla fija: el cursor "duda" y se pasa del objetivo, pero
// dos grabaciones seguidas dan el mismo vídeo, y si una escena sale mal se
// puede repetir sin que cambie nada más.
let semilla = 20261017;
const azar = () => {
  semilla = (semilla + 0x6D2B79F5) | 0;
  let t = Math.imul(semilla ^ (semilla >>> 15), 1 | semilla);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const entre = (a, b) => a + (b - a) * azar();

async function tramo(x, y, pasos) {
  const x0 = cx, y0 = cy;
  for (let i = 1; i <= pasos; i++) {
    const p = suave(i / pasos);
    // Un temblor pequeño, que se apaga al llegar, para que no sea una recta perfecta.
    const tremor = (1 - p) * 1.6;
    cx = x0 + (x - x0) * p + entre(-tremor, tremor);
    cy = y0 + (y - y0) * p + entre(-tremor, tremor);
    await cdp("Input.dispatchMouseEvent", { type: "mouseMoved", x: cx, y: cy });
    await evaluar(`window.__cur(${cx},${cy})`);
    await dormir(Math.round(entre(13, 22)));
  }
}

// El cursor no va derecho al objetivo: sale hacia un lado, pasa cerca, a veces
// se queda corto o se pasa y corrige, y se detiene un instante antes de
// asentarse. Lo que hace un ratón de verdad.
async function mover(x, y) {
  const dx = x - cx, dy = y - cy;
  const dist = Math.hypot(dx, dy) || 1;
  const nx = -dy / dist, ny = dx / dist;           // perpendicular al recorrido
  const pasos = d => Math.max(10, Math.min(38, Math.round(d / 11)));

  // 1) Un desvío lateral, hacia un punto intermedio.
  if (dist > 140) {
    const f = entre(0.3, 0.6), lado = entre(70, 170) * (azar() < 0.5 ? -1 : 1);
    const wx = cx + dx * f + nx * lado, wy = cy + dy * f + ny * lado;
    await tramo(Math.min(ANCHO - 8, Math.max(8, wx)), Math.min(ALTO - 8, Math.max(8, wy)), pasos(dist * f));
    await dormir(Math.round(entre(40, 170)));
  }
  // 2) Casi hasta el objetivo, pasándose un poco de largo.
  const pasaX = x + (dx / dist) * entre(10, 30) + entre(-6, 6);
  const pasaY = y + (dy / dist) * entre(10, 30) + entre(-6, 6);
  await tramo(pasaX, pasaY, pasos(Math.hypot(pasaX - cx, pasaY - cy)));
  await dormir(Math.round(entre(60, 200)));
  // 3) Corrección corta hasta el objetivo.
  await tramo(x, y, 9);
}

async function pulsar() {
  await evaluar(`window.__onda(${cx},${cy})`);
  await cdp("Input.dispatchMouseEvent", { type: "mousePressed", x: cx, y: cy, button: "left", clickCount: 1 });
  await dormir(70);
  await cdp("Input.dispatchMouseEvent", { type: "mouseReleased", x: cx, y: cy, button: "left", clickCount: 1 });
}

// Se busca por NODO HOJA (sin hijos), para no quedarse con un contenedor de
// media pantalla que casualmente contiene el texto.
const hoja = txt => "[].slice.call(document.querySelectorAll('*')).find(function(x){" +
  "return x.children.length===0&&x.offsetParent&&x.textContent.indexOf(" + JSON.stringify(txt) + ")>=0;})";
const boton = txt => "[].slice.call(document.querySelectorAll('button')).find(function(x){" +
  "return x.offsetParent&&x.textContent.indexOf(" + JSON.stringify(txt) + ")>=0;})";

async function centro(buscar) {
  const c = await evaluar("(function(){var e=" + buscar + ";if(!e)return null;" +
    "var r=e.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2};})()");
  return c;
}

// Con enLista=true se lleva antes el elemento al centro de su lista. Sin eso, un
// proyecto que queda más abajo de lo visible se pulsaba "a ciegas" en sus
// coordenadas, y ahí había otra cosa: el botón fijo «Nuevo proyecto» del pie
// de la lista se llevó el clic y el vídeo acabó enseñando un formulario vacío.
async function irA(buscar, etiqueta, enLista = false) {
  if (enLista) {
    await evaluar("(function(){var e=" + buscar + ";if(e)e.scrollIntoView({block:'center',behavior:'smooth'});})()");
    await dormir(900);
  }
  const c = await centro(buscar);
  if (!c) { console.log("  (aviso) no se encontró: " + etiqueta); return false; }
  await mover(c.x, c.y);
  await dormir(260);
  await pulsar();
  return true;
}

// Desplaza, con animación suave, el contenedor que se mueve hasta dejar el
// objetivo en el tercio de arriba de la pantalla. Antes se hacía con la rueda
// del ratón, y no era fiable: la rueda actúa sobre lo que hay BAJO el cursor, y
// tras pulsar un proyecto el cursor seguía sobre la lista de la izquierda, no
// sobre el panel del proyecto. Se desplaza el contenedor directamente.
//
// El objetivo se deja ARRIBA porque el rótulo ocupa la parte baja de la
// pantalla: lo que cuelga de él (el desglose, la factura, el gráfico) tiene
// que quedar a la vista y no debajo del rótulo.
async function bajarHasta(buscar, etiqueta) {
  await mover(ANCHO * 0.66, ALTO * 0.5);
  // La ficha de un proyecto carga sus datos (la factura, el desglose) un
  // instante después de abrirse: se espera a que el objetivo exista.
  for (let i = 0; i < 24 && !(await centro(buscar)); i++) await dormir(250);
  await dormir(250);
  const r = await evaluar("(function(){var e=" + buscar + ";if(!e)return 'sin-objetivo';" +
    "var sc=e.parentElement;while(sc&&sc.scrollHeight<=sc.clientHeight+2)sc=sc.parentElement;" +
    "if(!sc)return 'sin-contenedor';" +
    "var d=e.getBoundingClientRect().top-190;" +
    "sc.scrollBy({top:d,behavior:'smooth'});return 'ok';})()");
  if (r !== "ok") { console.log("  (aviso) " + etiqueta + ": " + r); return false; }
  await dormir(1500);
  return true;
}

async function rotulo(texto, retardo = 400) {
  console.log("  · " + texto.slice(0, 60));
  await evaluar(`window.__cap(${JSON.stringify(texto)})`);
  await dormir(retardo);
}

// ── Las escenas ──────────────────────────────────────────────────────────
await cdp("Page.startScreencast", { format: "jpeg", quality: 82, everyNthFrame: 1 });
await dormir(500);

// 0 · Inicio
await rotulo(T.c0);
await dormir(2800);

// 1 · Prospección
await rotulo(T.c1);
await dormir(600);
await irA(boton(T.prospeccion), "pestaña " + T.prospeccion);
await dormir(1300);
await irA(hoja(T.contacto), "contacto " + T.contacto, true);
await dormir(4200);

// 2 · El encargo
await rotulo(T.c2);
await dormir(600);
await irA(boton(T.proyectos), "pestaña " + T.proyectos);
await dormir(1300);
await irA(hoja(T.proyectoCat), "proyecto " + T.proyectoCat, true);
await dormir(1800);
await bajarHasta(hoja("CAT"), "desglose CAT");
await dormir(3800);

// 3 · La factura
await rotulo(T.c3);
await dormir(600);
await irA(boton(T.proyectos), "pestaña " + T.proyectos);
await dormir(1300);
await irA(hoja(T.proyectoPagado), "proyecto " + T.proyectoPagado, true);
await dormir(1800);
await bajarHasta(hoja("2026-"), "factura");
await dormir(4200);

// 4 · El cobro
await rotulo(T.c4);
await dormir(600);
await irA(boton(T.metricas), "pestaña " + T.metricas);
await dormir(1800);
{
  const gra = "[].slice.call(document.querySelectorAll('*')).find(function(x){" +
    "return x.children.length===0&&x.offsetParent&&/" + T.grafico + "/i.test(x.textContent);})";
  await bajarHasta(gra, "gráfico mensual");
}
await dormir(4200);

// Cierre
await evaluar("window.__cap('')");
await dormir(500);
await evaluar(`window.__fin(${JSON.stringify(T.f1)}, ${JSON.stringify(T.f2)}, ${JSON.stringify(T.f3)})`);
await dormir(4200);

await cdp("Page.stopScreencast");
await dormir(400);
ws.close();
edge.kill();

// ── Lista para FFmpeg ────────────────────────────────────────────────────
if (fotogramas.length < 10) {
  console.error("Salieron muy pocos fotogramas (" + fotogramas.length + "). Algo falló.");
  process.exit(1);
}
const lineas = [];
for (let i = 0; i < fotogramas.length; i++) {
  const dur = i < fotogramas.length - 1
    ? Math.max(0.001, fotogramas[i + 1].t - fotogramas[i].t)
    : 0.5;
  lineas.push("file '" + fotogramas[i].f.replace(/\\/g, "/") + "'", "duration " + dur.toFixed(4));
}
lineas.push("file '" + fotogramas[fotogramas.length - 1].f.replace(/\\/g, "/") + "'");
writeFileSync(join(SALIDA, "lista.txt"), lineas.join("\n"));

const segundos = fotogramas[fotogramas.length - 1].t - fotogramas[0].t;
console.log(`\n${fotogramas.length} fotogramas, ${segundos.toFixed(1)} s, en ${SALIDA}`);
console.log("\nPara montar el MP4:");
console.log(`  ffmpeg -f concat -safe 0 -i "${join(SALIDA, "lista.txt")}" -vf "scale=1920:1080:flags=lanczos,setsar=1,fps=30,format=yuv420p" -c:v libx264 -crf 20 -movflags +faststart "${join(SALIDA, "demo-" + IDIOMA + ".mp4")}"`);
