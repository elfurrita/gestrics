// Genera changelog.html a partir de CHANGELOG.md y CHANGELOG.en.md.
//
// La portada enlazaba antes al archivo renderizado en GitHub. Se dejó de
// hacer a propósito: esa página lleva al repositorio, y de ahí a la de
// releases, que tiene el instalador al final y es pública. Ahora el historial
// se sirve desde el propio sitio y no manda a nadie fuera.
//
// Los dos .md se siguen copiando del repositorio de la aplicación tal cual
// (ver el README de esta carpeta). Este script NO los toca: solo los traduce
// a HTML dentro del marco de las otras páginas. Después de recopiarlos, hay
// que volver a ejecutarlo o la página se queda con el texto viejo.
//
//   node scripts/generar-changelog.mjs
//
// El conversor entiende exactamente la sintaxis que usan esos dos archivos y
// nada más — encabezados de dos y tres almohadillas, viñetas con líneas
// continuadas, negritas sueltas como subtítulo, negrita, código y enlaces.
// Si algún día el changelog usa tablas o listas anidadas, hay que ampliarlo:
// preferible eso a arrastrar una dependencia de markdown para diez páginas.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const IDIOMAS = [
  { lang: "en", archivo: "CHANGELOG.en.md", titulo: "Changelog", saltar: /^Spanish version:/ },
  { lang: "es", archivo: "CHANGELOG.md", titulo: "Historial de cambios", saltar: /^Versión en inglés:/ },
];

function escapar(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// El orden importa: primero se escapa, y solo después se meten etiquetas.
// Al revés, un < del texto se comería el HTML recién generado.
function enLinea(s) {
  return escapar(s)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    // No greedy: hay negritas que llevan dentro un asterisco suelto
    // (Veri*Factu), y [^*]+ las partiría por la mitad.
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function convertir(md, saltar) {
  const lineas = md.replace(/\r\n/g, "\n").split("\n");
  const salida = [];
  let lista = null;   // viñetas acumuladas del bloque en curso
  let parrafo = null; // líneas de un párrafo con saltos duros

  const cerrarLista = () => {
    if (lista) { salida.push("<ul>" + lista.map((i) => `<li>${enLinea(i)}</li>`).join("") + "</ul>"); lista = null; }
  };
  const cerrarParrafo = () => {
    if (parrafo) { salida.push(`<p>${enLinea(parrafo.join(" "))}</p>`); parrafo = null; }
  };
  const cerrarTodo = () => { cerrarLista(); cerrarParrafo(); };

  for (const linea of lineas) {
    const t = linea.trim();

    if (t === "" || t === "---") { cerrarTodo(); continue; }
    if (t.startsWith("# ")) { cerrarTodo(); continue; }            // el h1 lo pone el marco
    if (saltar.test(t)) { cerrarTodo(); continue; }                // "ver la otra versión": lo hace el conmutador

    // Los corchetes de "## [1.1.0] — fecha" son convención de Keep a
    // Changelog para el archivo; en una página se leen como resto de markdown.
    if (t.startsWith("## ")) { cerrarTodo(); salida.push(`<h2>${enLinea(t.slice(3).replace(/^\[([^\]]+)\]/, "$1"))}</h2>`); continue; }
    if (t.startsWith("### ")) { cerrarTodo(); salida.push(`<h3>${enLinea(t.slice(4))}</h3>`); continue; }

    // Una negrita sola en su línea es un subtítulo dentro de una sección
    // ("**Alta**", "**Facturación y fiscalidad**"), no un párrafo.
    if (/^\*\*[^*]+\*\*$/.test(t)) { cerrarTodo(); salida.push(`<h4>${enLinea(t.slice(2, -2))}</h4>`); continue; }

    if (t.startsWith("- ")) { cerrarParrafo(); (lista ??= []).push(t.slice(2)); continue; }

    // Línea continuada: pertenece a la viñeta o al párrafo de arriba.
    if (lista) { lista[lista.length - 1] += " " + t; continue; }
    (parrafo ??= []).push(t);
  }
  cerrarTodo();
  return salida.join("\n      ");
}

const bloques = IDIOMAS.map(({ lang, archivo, titulo, saltar }) => {
  const md = fs.readFileSync(path.join(raiz, archivo), "utf8");
  return `    <div lang="${lang}">
      <h1>${titulo}</h1>
      ${convertir(md, saltar)}
    </div>`;
}).join("\n");

// El marco es el mismo de terms.html y privacy.html, copiado a mano: no hay
// plantilla compartida en el sitio, así que un cambio de cabecera, navegación
// o pie hay que darlo también aquí.
const pagina = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Changelog — Gestrics</title>
<link rel="icon" href="icon.png">
<link rel="stylesheet" href="style.css">
</head>
<body>
<header>
  <img src="icon.png" alt="Gestrics">
  <div class="title">Gestrics<span lang="en">Changelog</span><span lang="es">Historial de cambios</span></div>
  <div class="lang-toggle">
    <button data-lang="en" class="active" title="English" aria-label="English"><svg class="bandera" viewBox="0 0 60 30" aria-hidden="true" focusable="false"><clipPath id="rec-gb"><path d="M0 0h60v30H0z"/></clipPath><g clip-path="url(#rec-gb)"><path d="M0 0h60v30H0z" fill="#012169"/><path d="M0 0l60 30m0-30L0 30" stroke="#fff" stroke-width="6"/><path d="M0 0l60 30m0-30L0 30" stroke="#C8102E" stroke-width="4"/><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/><path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6"/></g></svg></button>
    <button data-lang="es" title="Español" aria-label="Español"><svg class="bandera" viewBox="0 0 60 30" aria-hidden="true" focusable="false"><path d="M0 0h60v30H0z" fill="#C60B1E"/><path d="M0 7.5h60v15H0z" fill="#FFC400"/></svg></button>
  </div>
</header>
<nav>
  <a href="index.html" lang="en">Home</a>
  <a href="index.html" lang="es">Inicio</a>
  <a href="terms.html" lang="en">Terms of Use</a>
  <a href="terms.html" lang="es">Términos de Uso</a>
  <a href="privacy.html" lang="en">Privacy Policy</a>
  <a href="privacy.html" lang="es">Política de Privacidad</a>
</nav>
<main>
  <article class="changelog">
${bloques}
  </article>
</main>
<footer>
  <span lang="en">Gestrics — <a href="index.html" style="color:inherit">outreachstudio</a> · Support: <a href="mailto:soporte@outreachstudio.app">soporte@outreachstudio.app</a> · <a href="changelog.html">Changelog</a></span>
  <span lang="es">Gestrics — <a href="index.html" style="color:inherit">outreachstudio</a> · Soporte: <a href="mailto:soporte@outreachstudio.app">soporte@outreachstudio.app</a> · <a href="changelog.html">Historial de cambios</a></span>
</footer>
<script src="lang-toggle.js"></script>
</body>
</html>
`;

fs.writeFileSync(path.join(raiz, "changelog.html"), pagina);
console.log("changelog.html generado — " + pagina.split("\n").length + " líneas");
