// Trae los dos CHANGELOG del repositorio de la aplicación y los deja como los
// quiere este sitio: en LF y SIN la sección de lo que todavía no se ha
// publicado.
//
//   node scripts/copiar-changelogs.mjs
//
// Antes este paso se hacía a mano y el README lo llamaba "copias literales".
// No lo eran: alguien venía quitando el bloque "[Sin publicar]" a conciencia,
// pero sin dejar rastro de que había que hacerlo. La próxima copia literal lo
// habría publicado.
//
// POR QUÉ SE QUITA, que es lo único que este script decide: ese bloque
// describe trabajo que NO está dentro del instalador que cuelga de la página.
// Enseñárselo a quien entra a comprar es prometerle lo que no puede
// descargar. El historial del sitio cuenta lo que se puede tener hoy; lo
// demás vive en el repositorio de la aplicación, que es donde corresponde.
//
// Y NO BASTA CON QUE EL GENERADOR NO LO PINTE. GitHub Pages sirve estos .md
// tal cual: https://outreachstudio.app/CHANGELOG.md responde 200, aunque no
// haya ningún enlace que lleve ahí. Así que el texto tiene que no llegar al
// archivo, no sólo a la página. generar-changelog.mjs lleva además su propia
// guarda para el caso de que alguien vuelva a copiar a mano.
//
// El paso de CRLF a LF tampoco es cosmético: aquel repositorio es CRLF y éste
// LF, y sin convertir el siguiente `git diff` sale entero como cambiado y
// esconde lo que de verdad cambió.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const origen = process.env.GESTRICS_APP || path.resolve(raiz, "..", "outreach-studio");

// Las dos lenguas escriben el encabezado distinto, y Keep a Changelog admite
// con y sin corchetes.
const SIN_PUBLICAR = /^##\s*\[?\s*(sin publicar|unreleased)\s*\]?/i;

function quitarSinPublicar(md) {
  const lineas = md.split("\n");
  const desde = lineas.findIndex((l) => SIN_PUBLICAR.test(l));
  if (desde < 0) return { texto: md, quitadas: 0 };

  // Hasta el siguiente encabezado de versión; si no lo hay, hasta el final.
  let hasta = desde + 1;
  while (hasta < lineas.length && !/^## /.test(lineas[hasta])) hasta++;

  return {
    texto: [...lineas.slice(0, desde), ...lineas.slice(hasta)].join("\n"),
    quitadas: hasta - desde,
  };
}

if (!fs.existsSync(origen)) {
  console.error(`No encuentro el repositorio de la aplicación en ${origen}.`);
  console.error('Pon GESTRICS_APP apuntando a él, o déjalo al lado de esta carpeta.');
  process.exit(1);
}

let total = 0;
for (const archivo of ["CHANGELOG.md", "CHANGELOG.en.md"]) {
  const ruta = path.join(origen, archivo);
  if (!fs.existsSync(ruta)) {
    console.error(`Falta ${ruta}.`);
    process.exit(1);
  }

  const { texto, quitadas } = quitarSinPublicar(fs.readFileSync(ruta, "utf8").replace(/\r\n/g, "\n"));
  fs.writeFileSync(path.join(raiz, archivo), texto);
  total += quitadas;

  const nota = quitadas
    ? `sin ${quitadas} líneas de "[Sin publicar]"`
    : "no había nada sin publicar";
  console.log(`${archivo}: ${texto.split("\n").length} líneas, ${nota}`);
}

console.log(
  total
    ? "\nAhora: node scripts/generar-changelog.mjs"
    : "\nAhora: node scripts/generar-changelog.mjs  (el bloque no estaba; nada que quitar)"
);
