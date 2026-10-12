// Genera las versiones WebP reducidas de las capturas de la portada.
//
//   node scripts/optimizar-capturas.mjs
//
// POR QUÉ EXISTE. Las capturas salen de `capturar.mjs` a 2352×1500, que es lo
// que necesita la de la portada en una pantalla de densidad doble. Pero las
// cuatro de los pasos se enseñan MUCHO más pequeñas, y se estaban sirviendo
// enteras: 1,2 MB por visita y por idioma, de los que el HTML y la hoja de
// estilos son 18 kB. Desde un país lejano eso es lo que se nota, y no hay
// ningún truco de CSS que lo arregle — son bytes que viajan.
//
// Los anchos NO están elegidos a ojo. Medidos sobre la página servida:
//
//              portada (overview)   capturas de los pasos
//   1600/1280        974 px                492 px
//   1040             959 px                483 px
//   800              719 px                719 px   <- aquí es donde más miden
//   380              314 px                314 px
//
// Ojo con eso último, que es contraintuitivo y me costó una medida mal hecha:
// las de los pasos se ven MÁS GRANDES en pantalla estrecha, porque la maqueta
// pasa a una columna y ocupan el ancho entero. Medir solo a 1280 lleva a
// generarlas demasiado pequeñas y a que se vean borrosas justo en el móvil.
//
// De ahí los dos anchos de cada una: el mayor cubre el caso peor a densidad
// doble (719×2 = 1438, y 974×2 = 1948), y el menor sirve a quien tenga
// pantalla normal. El navegador elige con el `sizes` del <picture>.
//
// EL PNG NO SE BORRA, por dos razones: es el respaldo de quien no entienda
// WebP, y es el destino del enlace "ver grande" que envuelve cada captura.
//
// No añade ninguna dependencia: pilota el Edge instalado por CDP, como
// `capturar.mjs`, y convierte con el canvas del propio navegador. Hace falta
// `--allow-file-access-from-files` o el canvas sale contaminado y toDataURL
// lanza SecurityError al leer un file:// desde otro file://.

import { spawn } from "node:child_process";
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), "..");
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const PUERTO = 9334; // distinto del de capturar.mjs, por si acaso coinciden
const CALIDAD = 0.85;

// Sin argumento hace los dos idiomas; con uno, solo ese. capturar.mjs lo llama
// asi al terminar, para que los WebP no puedan quedarse atras de sus PNG.
const IDIOMAS = process.argv[2] ? [process.argv[2].toLowerCase()] : ["es", "en"];

// Cada captura y los dos anchos que se le generan.
const ANCHOS = { overview: [980, 1960] };
const ANCHOS_POR_DEFECTO = [740, 1480];

const dormir = ms => new Promise(r => setTimeout(r, ms));
const kB = n => Math.round(n / 1024);

const edge = spawn(EDGE, [
  "--headless=new",
  `--remote-debugging-port=${PUERTO}`,
  "--allow-file-access-from-files",
  "--force-color-profile=srgb",
  "--user-data-dir=" + join(tmpdir(), "gestrics-webp-edge"),
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
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + " — " + (r.exceptionDetails.exception?.description || ""));
  return r.result?.value;
};

await cdp("Page.enable");
await cdp("Runtime.enable");

// Se navega a un file:// del propio repositorio para que el origen sea de
// archivo; con el flag de arriba, el canvas puede leer los PNG sin mancharse.
await cdp("Page.navigate", { url: "file:///" + join(RAIZ, "icon.png").replace(/\\/g, "/") });
await dormir(600);

let antes = 0, despues = 0, generados = 0;

for (const idioma of IDIOMAS) {
  const carpeta = join(RAIZ, "shots", idioma);
  const pngs = readdirSync(carpeta).filter(f => f.endsWith(".png"));
  console.log(`\n${idioma}/`);

  for (const png of pngs) {
    const base = png.replace(/\.png$/, "");
    const anchos = ANCHOS[base] || ANCHOS_POR_DEFECTO;
    const origen = ("file:///" + join(carpeta, png).replace(/\\/g, "/"));
    antes += statSync(join(carpeta, png)).size;

    for (const ancho of anchos) {
      const datos = await evaluar(`(async () => {
        const img = new Image();
        img.src = ${JSON.stringify(origen)};
        await img.decode();
        const c = document.createElement("canvas");
        c.width = ${ancho};
        c.height = Math.round(img.naturalHeight * ${ancho} / img.naturalWidth);
        const ctx = c.getContext("2d");
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, c.width, c.height);
        return c.toDataURL("image/webp", ${CALIDAD});
      })()`);

      if (!datos || !datos.startsWith("data:image/webp")) {
        throw new Error(`${idioma}/${png} a ${ancho}px no salió en WebP (devolvió ${String(datos).slice(0, 30)}…). ` +
          "Si empieza por data:image/png, este Edge no sabe exportar WebP.");
      }

      const buf = Buffer.from(datos.split(",")[1], "base64");
      const salida = join(carpeta, `${base}-${ancho}.webp`);
      writeFileSync(salida, buf);
      despues += buf.length;
      generados++;
      console.log(`  ${base}-${ancho}.webp  ${kB(buf.length)} kB`);
    }
  }
}

ws.close();
edge.kill();

console.log(`\n${generados} archivos generados.`);
console.log(`Los PNG de origen suman ${kB(antes)} kB; sus WebP, ${kB(despues)} kB.`);
console.log("Los PNG NO se borran: son el respaldo y el destino del enlace de ver grande.");
