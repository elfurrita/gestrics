// Genera changelog.html (inglés) y es/changelog.html (español) a partir de
// CHANGELOG.en.md y CHANGELOG.md.
//
// La portada enlazaba antes al archivo renderizado en GitHub. Se dejó de
// hacer a propósito: esa página lleva al repositorio, y de ahí a la de
// releases, que tiene el instalador al final y es pública. Ahora el historial
// se sirve desde el propio sitio y no manda a nadie fuera.
//
// Los dos .md los trae copiar-changelogs.mjs del repositorio de la aplicación
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
import { pie } from "./pie.mjs";

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
  // Los tramos de código se apartan lo primero y vuelven al final. Dentro de
  // ellos una barra invertida es texto —una ruta de Windows—, no un escape, y
  // quitarla rompería la ruta.
  // El marcador <cN> no puede chocar con el texto: escapar() ya ha convertido
  // todo "<" en &lt;, así que a esta altura no queda ninguno del original.
  const codigos = [];
  let t = escapar(s).replace(/`([^`]+)`/g, (_, c) => "<c" + (codigos.push(c) - 1) + ">");

  t = t
    // No greedy: hay negritas que llevan dentro un asterisco suelto
    // (Veri*Factu), y [^*]+ las partiría por la mitad.
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Escapes de markdown. La barra invertida ante un signo de puntuación no se
    // imprime: solo evita que markdown lea el signo. Los changelogs escriben
    // "Veri\*Factu" en la 1.0.0 y "Veri*Factu" en la 1.1.0 —las dos formas son
    // válidas—, y sin esto la primera publicaba la barra a la vista.
    //
    // Va la última a propósito: quitarla antes convertiría un \*\* escapado en
    // negrita de verdad. Y solo ante puntuación ASCII, que es lo que permite
    // CommonMark, para que un %APPDATA%\gestrics conserve la suya.
    .replace(/\\([!-\/:-@\[-`{-~])/g, "$1");

  return t.replace(/<c(\d+)>/g, (_, i) => "<code>" + codigos[i] + "</code>");
}

// Lo que todavía no se ha publicado no se pinta. Quien copia los .md ya
// debería haberlo quitado —lo hace copiar-changelogs.mjs, y ahí está el
// porqué largo—, pero esto es la red por si alguien vuelve a copiarlos a
// mano: ese bloque describe trabajo que NO está en el instalador que cuelga
// de la página, y enseñárselo a quien entra a comprar es prometerle algo que
// no puede descargarse.
const SIN_PUBLICAR = /^##\s*\[?\s*(sin publicar|unreleased)\s*\]?/i;

function convertir(md, saltar) {
  const lineas = md.replace(/\r\n/g, "\n").split("\n");
  const salida = [];
  let lista = null;    // viñetas acumuladas del bloque en curso
  let parrafo = null;  // líneas de un párrafo con saltos duros
  let sinPublicar = false; // dentro del bloque de lo no publicado

  const cerrarLista = () => {
    if (lista) { salida.push("<ul>" + lista.map((i) => `<li>${enLinea(i)}</li>`).join("") + "</ul>"); lista = null; }
  };
  const cerrarParrafo = () => {
    if (parrafo) { salida.push(`<p>${enLinea(parrafo.join(" "))}</p>`); parrafo = null; }
  };
  const cerrarTodo = () => { cerrarLista(); cerrarParrafo(); };

  for (const linea of lineas) {
    const t = linea.trim();

    // Va lo primero, antes que ninguna otra regla: un encabezado de versión
    // abre o cierra el tramo que no se publica, y mientras está abierto se
    // descarta TODO lo que venga detrás (subtítulos, viñetas y separadores),
    // no solo su encabezado.
    if (t.startsWith("## ")) sinPublicar = SIN_PUBLICAR.test(t);
    if (sinPublicar) { cerrarTodo(); continue; }

    if (t === "" || t === "---") { cerrarTodo(); continue; }
    if (t.startsWith("# ")) { cerrarTodo(); continue; }            // el h1 lo pone el marco
    if (saltar.test(t)) { cerrarTodo(); continue; }                // "ver la otra versión": lo hacen las banderas

    // Definiciones de referencia del final del archivo:
    //   [1.1.0]: https://github.com/.../releases/tag/v1.1.0
    // En markdown NO se ven —son el destino de los corchetes de cada versión—,
    // pero aquí se colaron como párrafos y publicaron cuatro URL de la página
    // de releases al pie, que es exactamente lo que esta página existe para
    // no hacer. Además los corchetes se quitan de los títulos, así que aquí
    // no definen nada.
    if (/^\[[^\]]+\]:\s/.test(t)) { cerrarTodo(); continue; }

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

// UNA PÁGINA POR IDIOMA, como la portada y las guías: changelog.html en inglés
// y es/changelog.html en español. Antes era una sola página con los dos
// bloques tras un conmutador, y los enlaces en español llevaban a
// changelog.html?lang=es. Google trató esa dirección como página propia
// (Search Console, 2026-10-30: «Seleccionada por Google como canónica: URL
// inspeccionada», aunque la página declaraba changelog.html), porque al
// cargarla veía el texto en español y en la otra en inglés. Con dos URL
// enlazadas por hreflang las señales dejan de contradecirse. La dirección
// vieja con ?lang=es la redirige idioma.js a la nueva.
const SITIO = "https://outreachstudio.app";
const BANDERA = {
  en: '<svg class="bandera" viewBox="0 0 60 30" aria-hidden="true" focusable="false"><clipPath id="rec-gb"><path d="M0 0h60v30H0z"/></clipPath><g clip-path="url(#rec-gb)"><path d="M0 0h60v30H0z" fill="#012169"/><path d="M0 0l60 30m0-30L0 30" stroke="#fff" stroke-width="6"/><path d="M0 0l60 30m0-30L0 30" stroke="#C8102E" stroke-width="4"/><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/><path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6"/></g></svg>',
  es: '<svg class="bandera" viewBox="0 0 60 30" aria-hidden="true" focusable="false"><path d="M0 0h60v30H0z" fill="#C60B1E"/><path d="M0 7.5h60v15H0z" fill="#FFC400"/></svg>',
};
const MARCO = {
  en: {
    archivo: "changelog.html", url: "/changelog.html", titulo: "Changelog",
    descripcion: "Changes you can see when using Gestrics, version by version.",
    nav: [["/", "Home"], ["/terms.html", "Terms of Use"], ["/privacy.html", "Privacy Policy"]],
    nombreIdioma: "English",
  },
  es: {
    archivo: "es/changelog.html", url: "/es/changelog.html", titulo: "Historial de cambios",
    descripcion: "Cambios visibles de Gestrics, versión a versión.",
    nav: [["/es/", "Inicio"], ["/terms.html?lang=es", "Términos de Uso"], ["/privacy.html?lang=es", "Política de Privacidad"]],
    nombreIdioma: "Español",
  },
};

// Todas las rutas son absolutas: la española vive un nivel más abajo.
// La x-default es la inglesa, como en la portada.
function pagina({ lang, archivo, saltar }) {
  const m = MARCO[lang];
  const md = fs.readFileSync(path.join(raiz, archivo), "utf8");
  const banderas = ["en", "es"].map((l) =>
    `    <a href="${MARCO[l].url}" hreflang="${l}" data-lang="${l}"${l === lang ? ' class="active" aria-current="page"' : ""} title="${MARCO[l].nombreIdioma}" aria-label="${MARCO[l].nombreIdioma}">${BANDERA[l]}</a>`
  ).join("\n");
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${m.titulo} — Gestrics</title>
<link rel="canonical" href="${SITIO}${m.url}">
<link rel="alternate" hreflang="en" href="${SITIO}${MARCO.en.url}">
<link rel="alternate" hreflang="es" href="${SITIO}${MARCO.es.url}">
<link rel="alternate" hreflang="x-default" href="${SITIO}${MARCO.en.url}">
<script src="/idioma.js"></script>
<meta name="description" content="${m.descripcion}">
<link rel="icon" href="/icon.png">
<link rel="stylesheet" href="/style.css">
</head>
<body>
<header id="arriba">
  <img src="/icon.png" alt="Gestrics">
  <div class="title">Gestrics<span>${m.titulo}</span></div>
  <nav>
${m.nav.map(([href, texto]) => `    <a href="${href}">${texto}</a>`).join("\n")}
  </nav>
  <div class="lang-toggle">
${banderas}
  </div>
</header>
<main>
  <article class="changelog">
    <div>
      <h1>${m.titulo}</h1>
      ${convertir(md, saltar)}
    </div>
  </article>
</main>
${pie({ lang })}
<script src="/analitica.js"></script>
</body>
</html>
`;
}

fs.mkdirSync(path.join(raiz, "es"), { recursive: true });
for (const idioma of IDIOMAS) {
  const html = pagina(idioma);
  fs.writeFileSync(path.join(raiz, MARCO[idioma.lang].archivo), html);
  console.log(`${MARCO[idioma.lang].archivo} generado — ${html.split("\n").length} líneas`);
}
