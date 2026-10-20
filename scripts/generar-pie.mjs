// Escribe el pie de `pie.mjs` en todas las páginas del sitio.
//
//   node scripts/generar-pie.mjs            # lo aplica
//   node scripts/generar-pie.mjs --revisar  # solo dice cuáles están al día
//
// El pie se edita en `pie.mjs` y se reparte desde aquí. `changelog.html` no
// se ESCRIBE aquí —lo genera `generar-changelog.mjs`, que importa el mismo
// módulo—, pero sí se COMPRUEBA: si su pie no coincide, se dice y `--revisar`
// sale con 1. Saltárselo del todo dejaba pasar un sitio desfasado.
//
// NO HAY LISTA DE ARCHIVOS a mano, que es justo lo que hacía falta evitar: se
// recorre la carpeta, y de cada página se deduce lo que hace falta saber.
//
//   - Bilingüe o de un idioma: lo dice el conmutador. Las bilingües llevan
//     <button data-lang>, que conmuta en la propia página; las de un idioma
//     llevan <a data-lang>, que lleva a la URL del otro idioma. Comprobado en
//     las nueve: terms, privacy y changelog son las de botones.
//   - El idioma de una página suelta: su <html lang>.
//
// Una página sin <footer> se salta sin ruido — hoy es el archivo de
// verificación de Google, que es una línea y no debe llevar marco.

import { readdirSync, readFileSync, writeFileSync, statSync, existsSync } from "node:fs";
import { join, dirname, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { pie, COLUMNAS } from "./pie.mjs";

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), "..");
const SOLO_REVISAR = process.argv.includes("--revisar");

// Recorre la raíz y un nivel de subcarpetas, que es toda la profundidad que
// tiene el sitio (`es/`). Se saltan las de trabajo.
const IGNORAR = new Set([".git", "scripts", "shots", "node_modules"]);

function paginas(carpeta = RAIZ, prof = 0) {
  const salida = [];
  for (const entrada of readdirSync(carpeta)) {
    if (IGNORAR.has(entrada)) continue;
    const ruta = join(carpeta, entrada);
    if (statSync(ruta).isDirectory()) {
      if (prof < 1) salida.push(...paginas(ruta, prof + 1));
    } else if (entrada.endsWith(".html")) {
      salida.push(ruta);
    }
  }
  return salida;
}

// Se admiten atributos en la etiqueta. Exigir "<footer>" pelado hacía que un
// <footer class="algo"> no coincidiera, y el guion lo habría dado por página
// sin pie y seguido adelante sin decir nada — el fallo callado de siempre.
// Antes de tocar nada: que cada enlace del pie lleve a algo que exista. Un
// destino renombrado no avisa — la página sigue sirviéndose y el enlace
// devuelve 404 solo cuando alguien lo pulsa. Esto se venía comprobando a mano.
function comprobarDestinos() {
  const rotos = [];
  for (const [lang, columnas] of Object.entries(COLUMNAS)) {
    for (const [, enlaces] of columnas) {
      for (const [href] of enlaces) {
        if (href.startsWith("mailto:")) continue;
        // Se quita la query y se traduce la URL a su archivo en disco.
        const limpio = href.split("?")[0].replace(/^\//, "");
        const archivo = limpio === "" || limpio.endsWith("/") ? limpio + "index.html" : limpio;
        if (!existsSync(join(RAIZ, archivo))) rotos.push(`${lang}: ${href} -> ${archivo}`);
      }
    }
  }
  if (rotos.length) {
    console.error("ABORTA: el pie enlaza a páginas que no existen:");
    rotos.forEach(r => console.error("  " + r));
    process.exit(1);
  }
}

comprobarDestinos();

const RE_PIE = /<footer(?:\s[^>]*)?>[\s\S]*?<\/footer>/;

let alDia = 0, cambiadas = 0, sinPie = 0;
let historialDesfasado = false;

for (const ruta of paginas()) {
  const nombre = relative(RAIZ, ruta).split(sep).join("/");
  const original = readFileSync(ruta, "utf8");
  const crlf = original.includes("\r\n");
  const t = original.replace(/\r\n/g, "\n");

  const encontrados = t.match(new RegExp(RE_PIE.source, "g")) || [];
  if (encontrados.length === 0) { sinPie++; continue; }
  if (encontrados.length > 1) {
    console.error(`ABORTA: ${nombre} tiene ${encontrados.length} <footer>; se esperaba uno.`);
    process.exit(1);
  }

  const bilingue = /<button[^>]*data-lang=/.test(t);
  const lang = (t.match(/<html[^>]*\slang="([a-z]{2})"/) || [])[1] || "en";
  const nuevo = pie({ lang, bilingue });
  const coincide = encontrados[0] === nuevo;

  // changelog.html SÍ se comprueba, pero no se escribe: lo escribe su propio
  // generador con este mismo módulo. Saltárselo del todo era un agujero —
  // --revisar daba por bueno el sitio entero con el historial desfasado.
  if (nombre === "changelog.html") {
    if (coincide) alDia++;
    else { historialDesfasado = true; console.log(`  ${nombre}  (bilingüe, lo escribe su generador)`); }
    continue;
  }

  if (coincide) { alDia++; continue; }

  if (!SOLO_REVISAR) {
    const salida = t.replace(RE_PIE, nuevo);
    writeFileSync(ruta, crlf ? salida.replace(/\n/g, "\r\n") : salida);
  }
  cambiadas++;
  console.log(`  ${nombre}  (${bilingue ? "bilingüe" : lang})`);
}

console.log(`\n${alDia} al día, ${cambiadas} ${SOLO_REVISAR ? "desfasada(s)" : "reescrita(s)"}, ${sinPie} sin <footer>.`);

if (historialDesfasado) {
  console.log("changelog.html tiene el pie viejo. Ejecuta: node scripts/generar-changelog.mjs");
}

if (SOLO_REVISAR && (cambiadas || historialDesfasado)) {
  console.error("El sitio NO está al día con pie.mjs.");
  process.exit(1);
}
if (!SOLO_REVISAR && cambiadas && !historialDesfasado) {
  console.log("Si el pie ha cambiado, regenera tambien el historial: node scripts/generar-changelog.mjs");
}
