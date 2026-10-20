// Escribe el pie de `pie.mjs` en todas las páginas del sitio.
//
//   node scripts/generar-pie.mjs            # lo aplica
//   node scripts/generar-pie.mjs --revisar  # solo dice cuáles están al día
//
// El pie se edita en `pie.mjs` y se reparte desde aquí. `changelog.html` NO
// se toca con este script: lo genera `generar-changelog.mjs`, que importa el
// mismo módulo, así que basta con volver a ejecutarlo.
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

import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { pie } from "./pie.mjs";

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

const RE_PIE = /<footer>[\s\S]*?<\/footer>/;

let alDia = 0, cambiadas = 0, saltadas = 0;
const desfasadas = [];

for (const ruta of paginas()) {
  const nombre = relative(RAIZ, ruta).replace(/\\/g, "/");
  const original = readFileSync(ruta, "utf8");
  const crlf = original.includes("\r\n");
  const t = original.replace(/\r\n/g, "\n");

  const encontrados = t.match(new RegExp(RE_PIE.source, "g")) || [];
  if (encontrados.length === 0) { saltadas++; continue; }
  if (encontrados.length > 1) {
    console.error(`ABORTA: ${nombre} tiene ${encontrados.length} <footer>; se esperaba uno.`);
    process.exit(1);
  }

  // changelog.html lo escribe su propio generador, que usa el mismo módulo.
  if (nombre === "changelog.html") { saltadas++; continue; }

  const bilingue = /<button[^>]*data-lang=/.test(t);
  const lang = (t.match(/<html[^>]*\slang="([a-z]{2})"/) || [])[1] || "en";
  const nuevo = pie({ lang, bilingue });

  if (encontrados[0] === nuevo) { alDia++; continue; }

  desfasadas.push(nombre);
  if (!SOLO_REVISAR) {
    const salida = t.replace(RE_PIE, nuevo);
    writeFileSync(ruta, crlf ? salida.replace(/\n/g, "\r\n") : salida);
  }
  cambiadas++;
  console.log(`  ${nombre}  (${bilingue ? "bilingüe" : lang})`);
}

console.log(`\n${alDia} al día, ${cambiadas} ${SOLO_REVISAR ? "desfasada(s)" : "reescrita(s)"}, ${saltadas} sin pie propio.`);

if (SOLO_REVISAR && cambiadas) {
  console.error("El pie de esas páginas no coincide con pie.mjs. Ejecuta: node scripts/generar-pie.mjs");
  process.exit(1);
}
if (!SOLO_REVISAR && cambiadas) {
  console.log("Y si el pie ha cambiado: node scripts/generar-changelog.mjs");
}
