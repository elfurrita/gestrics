// EL PIE DEL SITIO, EN UN SOLO SITIO.
//
// Este módulo no se ejecuta solo: lo usan `generar-pie.mjs`, que lo escribe en
// todas las páginas de mano, y `generar-changelog.mjs`, que lo mete en el
// marco de la página que genera. Para cambiar el pie se edita AQUÍ y se
// ejecuta `node scripts/generar-pie.mjs`.
//
// Por qué existe: el pie llegó a estar copiado en nueve archivos —seis páginas
// de un idioma, dos bilingües y el marco del generador del historial—, así que
// añadir un enlace eran nueve ediciones a mano y nada avisaba si una se
// quedaba atrás. Ya pasó con la línea de enlaces anterior: la guía de tarifas
// entró en el pie español y no en el inglés.
//
// Las rutas son ABSOLUTAS (`/...`) a propósito. La portada española vive en
// `/es/index.html`, un nivel más abajo, así que con rutas relativas el mismo
// pie no valdría para las dos.

const CORREO = "contact@outreachstudio.app";
const FIRMA = "Gestrics — outreachstudio";

// Un idioma por bloque: título de columna y sus enlaces, en orden.
export const COLUMNAS = {
  en: [
    ["Gestrics", [["/", "Home"], ["/changelog.html", "Changelog"]]],
    ["Guides", [["/invoicing-guide-translators.html", "Invoicing for translators"],
                ["/cat-analysis-rates-guide.html", "Pricing from a CAT analysis"]]],
    ["Legal", [["/terms.html", "Terms of Use"], ["/privacy.html", "Privacy Policy"]]],
    ["Contact", [[`mailto:${CORREO}`, CORREO]]],
  ],
  es: [
    ["Gestrics", [["/es/", "Inicio"], ["/changelog.html?lang=es", "Historial de cambios"]]],
    ["Guías", [["/guia-facturacion-traductores.html", "Facturar como traductor"],
               ["/guia-tarifas-analisis-cat.html", "Tarifas con el análisis TAO"]]],
    ["Legal", [["/terms.html?lang=es", "Términos de uso"],
               ["/privacy.html?lang=es", "Política de privacidad"]]],
    ["Contacto", [[`mailto:${CORREO}`, CORREO]]],
  ],
};

const VOLVER = { en: "Back to top", es: "Volver arriba" };
const GALON = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
              '<path d="M6 14l6-6 6 6"/></svg>';

function columnas(lang, sangria) {
  const s = " ".repeat(sangria);
  const bloques = COLUMNAS[lang].map(([titulo, enlaces]) =>
    `${s}  <div>\n` +
    `${s}    <span class="pie-tit">${titulo}</span>\n` +
    enlaces.map(([href, texto]) => `${s}    <a href="${href}">${texto}</a>`).join("\n") +
    `\n${s}  </div>`
  ).join("\n");
  return `${s}<div class="pie-cols">\n${bloques}\n${s}</div>\n` +
         `${s}<div class="pie-firma">${FIRMA}</div>`;
}

function volverArriba(lang, conLang) {
  const t = VOLVER[lang];
  const attr = conLang ? ` lang="${lang}"` : "";
  return `  <a class="arriba" href="#arriba"${attr} title="${t}" aria-label="${t}">${GALON}</a>`;
}

// Devuelve el <footer> entero. `bilingue` lleva los dos idiomas con el
// conmutador; si no, solo `lang`.
//
// OJO CON EL ENVOLTORIO de las bilingües: el atributo lang NO puede ir sobre
// .pie-cols. lang-toggle.js pone display:block EXPLÍCITO al mostrar un bloque
// —y lo hace a propósito, porque la red de seguridad de la CSS oculta
// [lang="es"] por defecto y un "" no le ganaría—, así que aplastaría la
// rejilla. Va en un <div lang> cuyo display natural ya es block.
export function pie({ lang = "en", bilingue = false } = {}) {
  if (!bilingue) {
    return `<footer>\n${columnas(lang, 2)}\n${volverArriba(lang, false)}\n</footer>`;
  }
  const bloques = ["en", "es"]
    .map(l => `  <div lang="${l}">\n${columnas(l, 4)}\n  </div>`)
    .join("\n");
  return `<footer>\n${bloques}\n` +
         `${volverArriba("en", true)}\n${volverArriba("es", true)}\n</footer>`;
}
