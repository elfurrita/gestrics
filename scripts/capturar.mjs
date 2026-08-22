// capturar.mjs — genera las capturas de pantalla de la portada.
//
//   node scripts/capturar.mjs es
//   node scripts/capturar.mjs en
//
// Deja cinco PNG en shots/<idioma>/ a 2352×1500 (densidad 2×, que es lo que
// pide una pantalla moderna). La portada las muestra a unos 500px de ancho,
// así que sobra resolución para que se vean nítidas y para abrirlas a tamaño
// real al pulsarlas.
//
// ── Antes de ejecutarlo ────────────────────────────────────────────────────
//
// 1. Sembrar los datos de demostración: node scripts/sembrar-demo.mjs <idioma>
//    (léete su cabecera: hay un paso que NO se puede saltar sin acabar
//    publicando el CV real del traductor en una captura).
// 2. Arrancar la aplicación en http://localhost:5173 — front y back.
//
// Se pilota el Edge instalado por CDP en vez de usar puppeteer: Node 24 trae
// WebSocket global, así que no hace falta añadir ninguna dependencia ni a este
// repositorio ni al de la aplicación.

import { spawn } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), "..");
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const PUERTO = 9333;
const APP = "http://localhost:5173";

// El armazón de la aplicación mide 1176px fijos. Con la ventana a ese ancho
// exacto no asoma nada del fondo de la página a los lados y la captura sale
// limpia sin recortarla después.
const ANCHO = 1176;
const ALTO = 750;

const IDIOMA = (process.argv[2] || "es").toLowerCase();
if (!["es", "en"].includes(IDIOMA)) {
  console.error('Idioma no reconocido. Usa "es" o "en".');
  process.exit(1);
}

const DESTINO = join(RAIZ, "shots", IDIOMA);
const dormir = ms => new Promise(r => setTimeout(r, ms));

// ── Los pasos ──────────────────────────────────────────────────────────────
//
// Cada paso lleva un guion que se ejecuta DENTRO de la página (pulsar una
// pestaña, elegir un proyecto, bajar hasta una tarjeta) y una espera antes de
// disparar la foto. Solo cambian de un idioma a otro los rótulos de las
// pestañas y los títulos de los proyectos sembrados.

const T = IDIOMA === "en"
  ? { prospeccion: "OUTREACH", proyectos: "PROJECTS", metricas: "METRICS",
      contacto: "Sofia Marchetti", proyectoCat: "pressure sensor",
      proyectoPagado: "Interface localisation", grafico: "COLLECTED PER MONTH",
      nombres: { prospeccion: "outreach", vista: "overview", proyecto: "project",
                 factura: "invoice", metricas: "metrics" } }
  : { prospeccion: "PROSPECCIÓN", proyectos: "PROYECTOS", metricas: "MÉTRICAS",
      contacto: "Sofia Marchetti", proyectoCat: "sensor de presión",
      proyectoPagado: "Localización de interfaz", grafico: "COBRADO POR MES",
      nombres: { prospeccion: "prospeccion", vista: "overview", proyecto: "proyecto",
                 factura: "factura", metricas: "metricas" } };

// React no reacciona a un .click() suelto en todos los controles: se emite la
// secuencia completa de eventos de puntero, como haría un ratón de verdad.
const CLIC = "var clic=function(el){if(!el)return false;" +
  "['pointerdown','mousedown','pointerup','mouseup','click'].forEach(function(t){" +
  "el.dispatchEvent(new MouseEvent(t,{bubbles:true,cancelable:true,view:window}));});return true;};";

// Se busca por NODO HOJA (sin hijos) para no quedarse con un contenedor de
// media pantalla que casualmente contiene el texto.
const hoja = txt => "[].slice.call(document.querySelectorAll('*')).find(function(x){" +
  "return x.children.length===0&&x.textContent.indexOf(" + JSON.stringify(txt) + ")>=0;})";
const boton = txt => "[].slice.call(document.querySelectorAll('button')).find(function(x){" +
  "return x.offsetParent&&x.textContent.indexOf(" + JSON.stringify(txt) + ")>=0;})";

const pestana = (rotulo, despues = "") =>
  "(function(){" + CLIC + "var b=" + boton(rotulo) + ";clic(b);" + despues + "return !!b;})()";

const PASOS = [
  { nombre: T.nombres.prospeccion, espera: 3800,
    guion: pestana(T.prospeccion, "setTimeout(function(){clic(" + hoja(T.contacto) + ");},1200);") },

  { nombre: T.nombres.vista, espera: 3800,
    guion: pestana(T.proyectos, "setTimeout(function(){clic(" + hoja(T.proyectoCat) + ");},1200);") },

  // Sin cambiar de proyecto: solo se baja hasta el desglose CAT, que es lo que
  // ilustra el paso "importa el análisis de Trados/memoQ/Wordfast".
  { nombre: T.nombres.proyecto, espera: 1600,
    guion: "(function(){var e=" + hoja("CAT") + ";if(e)e.scrollIntoView({block:'center'});return !!e;})()" },

  { nombre: T.nombres.factura, espera: 4600,
    guion: pestana(T.proyectos,
      "setTimeout(function(){clic(" + hoja(T.proyectoPagado) + ");" +
      "setTimeout(function(){var f=" + hoja("2026-") + ";if(f)f.scrollIntoView({block:'center'});},1400);},1200);") },

  // Las cinco tarjetas de arriba dejan un hueco al bajar la quinta de fila, y
  // lo que hay que enseñar son los gráficos: se baja hasta que el primero
  // quede pegado arriba y el segundo entre entero por debajo.
  { nombre: T.nombres.metricas, espera: 4200,
    guion: pestana(T.metricas, "setTimeout(function(){" +
      "var t=[].slice.call(document.querySelectorAll('*')).find(function(x){" +
      "return x.children.length===0&&/" + T.grafico + "/i.test(x.textContent);});" +
      "if(!t)return;" +
      "var tarjeta=t.parentElement;" +
      "while(tarjeta&&!/border-radius/.test(tarjeta.getAttribute('style')||''))tarjeta=tarjeta.parentElement;" +
      "tarjeta=tarjeta||t.parentElement;" +
      "var sc=tarjeta.parentElement;" +
      "while(sc&&sc.scrollHeight<=sc.clientHeight+2)sc=sc.parentElement;" +
      "if(sc)sc.scrollTop+=tarjeta.getBoundingClientRect().top-sc.getBoundingClientRect().top-10;" +
      "},1600);") },
];

// ── El piloto ──────────────────────────────────────────────────────────────

mkdirSync(DESTINO, { recursive: true });

const edge = spawn(EDGE, [
  "--headless=new",
  `--remote-debugging-port=${PUERTO}`,
  `--window-size=${ANCHO},${ALTO}`,
  "--hide-scrollbars",
  "--force-color-profile=srgb",
  // El perfil va al temporal del SISTEMA. Apuntarlo cerca del destino dejó una
  // vez un perfil de navegador entero dentro del repositorio, y un git add -A
  // se tragó miles de ficheros de caché.
  "--user-data-dir=" + join(tmpdir(), "gestrics-capturas-edge"),
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
  throw new Error("Edge no expuso ningún objetivo CDP. ¿Está instalado en la ruta EDGE?");
}

const ws = new WebSocket(await objetivo());
await new Promise(r => ws.addEventListener("open", r, { once: true }));

let id = 0;
const pendientes = new Map();
ws.addEventListener("message", ev => {
  const m = JSON.parse(ev.data);
  if (m.id && pendientes.has(m.id)) { pendientes.get(m.id)(m); pendientes.delete(m.id); }
});

function cdp(metodo, params = {}) {
  const n = ++id;
  return new Promise((res, rej) => {
    pendientes.set(n, m => (m.error ? rej(new Error(metodo + ": " + m.error.message)) : res(m.result)));
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
// Sin esto, una segunda pasada fotografía la versión cacheada y las capturas
// salen con los cambios de la vez anterior.
await cdp("Network.setCacheDisabled", { cacheDisabled: true });
await cdp("Emulation.setDeviceMetricsOverride", {
  width: ANCHO, height: ALTO, deviceScaleFactor: 2, mobile: false,
});

await cdp("Page.navigate", { url: APP });
await dormir(6000);

// El idioma se elige con el propio conmutador de la aplicación.
await evaluar("(function(){" + CLIC +
  "var b=[].slice.call(document.querySelectorAll('button,span,div')).filter(function(e){" +
  "return e.children.length===0&&e.textContent.trim()===" + JSON.stringify(IDIOMA.toUpperCase()) + ";}).pop();" +
  "return clic(b);})()");
await dormir(1500);

// Red de seguridad: si la base tuvo contactos antes de marcarse el centinela,
// la aplicación se toma por la instalación original y rellena las plantillas
// con el nombre, la biografía y los perfiles reales del traductor. Eso
// viajaría a una captura pública. Ver la cabecera de sembrar-demo.mjs.
//
// La comprobación es GENÉRICA a propósito: enumerar aquí los datos concretos
// que se quieren evitar sería escribirlos en un repositorio público, que es
// justo el problema. Se busca la FORMA de una identidad real —un correo que no
// sea de los sembrados, un enlace a un perfil— y no a nadie en particular.
// Todo lo que siembra sembrar-demo.mjs usa el dominio reservado .example.
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
  console.error("Todo lo sembrado usa el dominio .example, así que eso no sale de la siembra.");
  console.error("Vuelve a empezar siguiendo el orden de sembrar-demo.mjs.\n");
  ws.close(); edge.kill();
  process.exit(1);
}

for (const { nombre, guion, espera } of PASOS) {
  const ok = await evaluar(guion);
  if (ok === false) console.log(`  (aviso) el guion de ${nombre} no encontró su objetivo`);
  await dormir(espera);
  const { data } = await cdp("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  const bytes = Buffer.from(data, "base64");
  writeFileSync(join(DESTINO, nombre + ".png"), bytes);
  console.log(`  ${nombre}.png  ${ANCHO * 2}×${ALTO * 2}  ${Math.round(bytes.length / 1024)} kB`);
}

ws.close();
edge.kill();
console.log(`\nListo: ${PASOS.length} capturas en shots/${IDIOMA}/`);
