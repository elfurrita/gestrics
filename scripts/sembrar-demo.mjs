// sembrar-demo.mjs — datos de demostración para las capturas de la portada.
//
//   node scripts/sembrar-demo.mjs es
//   node scripts/sembrar-demo.mjs en
//
// Escribe ocho contactos, diez proyectos repartidos por todos los estados,
// siete facturas (una parte cobrada, a lo largo de seis meses para que el
// gráfico mensual tenga forma), un glosario y dos gastos.
//
// ── EL ORDEN IMPORTA, Y NO ES OPCIONAL ─────────────────────────────────────
//
// La aplicación trae una migración que "congela" las plantillas de correo
// heredadas —que llevan el nombre, la biografía y los perfiles profesionales
// reales del traductor original— y se dispara cuando detecta que YA HAY
// CONTACTOS, porque eso significa que es una instalación de siempre y no una
// nueva.
//
// Si se siembran los contactos primero, la aplicación se toma por aquella
// instalación y rellena las plantillas con esos datos personales. La captura
// de Prospección enseña justo el redactor de correo, así que eso acabaría
// publicado en la web. Pasó una vez.
//
// Por eso este script NO siembra contra la aplicación en marcha: escribe
// directo en la base con el backend PARADO, y el procedimiento completo es:
//
//   1. Parar el backend.
//   2. Borrar %APPDATA%\gestrics\outreach-studio.db
//   3. Arrancar el backend (crea la base vacía, con las plantillas genéricas).
//   4. Marcar los centinelas — AÚN SIN CONTACTOS:
//        node <app>/scripts/dev-skip-first-run.mjs
//        PUT /api/settings/migration_legacyTemplatesFrozen  -> true
//        PUT /api/settings/translator_fiscalCountry         -> "ES"
//   5. Parar el backend.
//   6. node scripts/sembrar-demo.mjs <idioma>
//   7. Arrancar el backend y el front.
//   8. node scripts/capturar.mjs <idioma>
//   9. Al terminar, BORRAR la base: son datos falsos y el contador de facturas
//      tiene que quedar en -001.
//
// capturar.mjs comprueba por su cuenta que no haya datos personales en
// pantalla y aborta si los encuentra, pero eso es una red, no el método.
//
// ── Sobre el libro Veri*Factu ──────────────────────────────────────────────
//
// Se escriben filas en `invoices` pero NUNCA en `invoice_records`, que es la
// cadena de asientos encadenados. Así las facturas se ven en la interfaz para
// la foto y el libro fiscal sigue intacto: el siguiente número real sale
// 2026-001.

import { createRequire } from "node:module";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), "..");

// Ruta al repositorio de la aplicación, de donde sale sql.js. Por defecto se
// busca al lado de este repositorio; con GESTRICS_APP se apunta a otro sitio.
// No se escribe una ruta absoluta aquí: este repositorio es público.
const APP = process.env.GESTRICS_APP || join(RAIZ, "..", "outreach-studio");
const require = createRequire(join(APP, "backend/package.json"));
const initSqlJs = require("sql.js");

const BASE = join(process.env.APPDATA, "gestrics", "outreach-studio.db");
const IDIOMA = (process.argv[2] || "es").toLowerCase();
if (!["es", "en"].includes(IDIOMA)) {
  console.error('Idioma no reconocido. Usa "es" o "en".');
  process.exit(1);
}
if (!existsSync(BASE)) {
  console.error("No hay base en " + BASE + ".\nArranca el backend una vez para que la cree (paso 3 de la cabecera).");
  process.exit(1);
}

// Los títulos van en el idioma de la captura: un proyecto en español bajo una
// interfaz inglesa se lee como un descuido.
const ES = IDIOMA === "es";
const txt = (es, en) => (ES ? es : en);

const CAT = JSON.stringify({
  categories: {
    contextMatch: { words: 1240, weight: 0 }, repetitions: { words: 860, weight: 20 },
    match100: { words: 2100, weight: 20 }, match95_99: { words: 1450, weight: 30 },
    match85_94: { words: 980, weight: 60 }, match75_84: { words: 640, weight: 60 },
    match50_74: { words: 1120, weight: 100 }, noMatch: { words: 4210, weight: 100 },
    pemtFull: { words: 0, weight: 60 }, pemtLight: { words: 0, weight: 30 },
    revision: { words: 0, weight: 50 },
  },
  sourceFileName: "Analysis_A320_manual.csv",
});

const CONTACTOS = [
  [1, "Annika Lindqvist", "Nordlys Language Services", "annika.lindqvist@nordlys-ls.example", txt("Suecia", "Sweden"), "activeClient", txt("Técnica / Manuales", "Technical / Manuals")],
  [2, "Marc Delacroix", "Atelier Linguistique", "marc.delacroix@atelier-ling.example", txt("Francia", "France"), "activeClient", txt("Jurídica", "Legal")],
  [3, "Sofia Marchetti", "Verba Traduzioni", "sofia.marchetti@verba-trad.example", txt("Italia", "Italy"), "activeClient", "Marketing"],
  [4, "Kenji Watanabe", "Sakura Localization", "kenji.watanabe@sakura-loc.example", txt("Japón", "Japan"), "activeClient", txt("Videojuegos", "Video games")],
  [5, "Clara Nowak", "Vistula Language Group", "clara.nowak@vistula-lg.example", txt("Polonia", "Poland"), "responded", "Software"],
  [6, "Hannah Weber", "Nordwind Übersetzungen", "hannah.weber@nordwind-ub.example", txt("Alemania", "Germany"), "sent", txt("Técnica", "Technical")],
  [7, "Paulo Ribeiro", "Lusofonia Traduções", "paulo.ribeiro@lusofonia.example", "Portugal", "pending", txt("Financiera", "Financial")],
  [8, "Diego Alarcón", "Andes Localización", "diego.alarcon@andes-loc.example", "Chile", "negotiation", txt("Médica", "Medical")],
];

// [contacto, título, par, tipo, palabras, tarifa, divisa, importe, estado,
//  recepción, entrega, desglose CAT, fecha de cobro]
const PROYECTOS = [
  [1, txt("Manual de usuario — bomba de infusión volumétrica", "User manual — volumetric infusion pump"), "EN→ES", txt("Técnico", "Technical"), 12400, 0.11, "EUR", 1364, "quoted", "2026-08-18", "2026-09-04", null, null],
  [2, txt("Contrato marco de distribución", "Master distribution agreement"), "FR→ES", txt("Jurídico", "Legal"), 8600, 0.13, "EUR", 1118, "in_progress", "2026-08-10", "2026-08-27", null, null],
  [3, txt("Catálogo de producto — temporada AW26", "Product catalogue — AW26 season"), "IT→ES", "Marketing", 6200, 0.12, "EUR", 744, "delivered", "2026-08-03", "2026-08-19", null, null],
  [4, txt("Guía de estilo de marca", "Brand style guide"), "EN→ES", "Marketing", 4800, 0.14, "EUR", 672, "invoiced", "2026-07-21", "2026-08-06", null, null],
  [1, txt("Especificaciones técnicas — sensor de presión", "Technical specifications — pressure sensor"), "EN→ES", txt("Técnico", "Technical"), 12600, 0.11, "EUR", 1386, "paid", "2026-06-02", "2026-06-18", CAT, "2026-06-28"],
  [2, txt("Informe anual 2025", "Annual report 2025"), "FR→ES", txt("Financiero", "Financial"), 9400, 0.13, "EUR", 1222, "paid", "2026-05-11", "2026-05-29", null, "2026-06-12"],
  [5, txt("Documentación de API", "API documentation"), "EN→ES", "Software", 15200, 0.12, "USD", 1824, "paid", "2026-04-07", "2026-04-24", null, "2026-05-09"],
  [3, txt("Notas de prensa Q2", "Q2 press releases"), "IT→ES", "Marketing", 3900, 0.12, "EUR", 468, "paid", "2026-07-06", "2026-07-17", null, "2026-07-30"],
  [4, txt("Localización de interfaz", "Interface localisation"), "EN→ES", txt("Videojuegos", "Video games"), 7300, 0.14, "EUR", 1022, "paid", "2026-08-01", "2026-08-12", null, "2026-08-19"],
  [1, txt("Fichas de seguridad — reactivos", "Safety data sheets — reagents"), "EN→ES", txt("Técnico", "Technical"), 5100, 0.11, "EUR", 561, "paid", "2026-03-09", "2026-03-24", null, "2026-04-08"],
];

const GLOSARIO = [
  ["invoice", "factura", txt("No traducir en cabeceras de tabla", "Do not translate in table headers")],
  ["batch record", "registro de lote", ""],
  ["flow rate", "caudal", txt('Nunca "tasa de flujo"', 'Never "tasa de flujo"')],
  ["syringe driver", "bomba de jeringa", ""],
];

const SQL = await initSqlJs();
const db = new SQL.Database(readFileSync(BASE));

for (const tabla of ["projects", "invoices", "glossary_terms", "contacts", "expenses"]) {
  try { db.run(`DELETE FROM ${tabla}`); } catch { /* La tabla puede no existir aún. */ }
}

for (const [id, nombre, empresa, email, pais, estado, especialidad] of CONTACTOS) {
  db.run(`INSERT INTO contacts
    (id, nombre, empresa, email, pais, status, especialidad, tipo, idiomas, firstContactDate)
    VALUES (?,?,?,?,?,?,?,?,?,?)`,
    [id, nombre, empresa, email, pais, estado, especialidad, "Agencia", "EN, ES", "2026-03-12"]);
}

PROYECTOS.forEach((p, i) => {
  const [contacto, titulo, par, tipo, palabras, tarifa, divisa, importe, estado, recepcion, entrega, cat, cobro] = p;
  db.run(`INSERT INTO projects
    (contact_id, title, lang_pair, content_type, word_count, rate, currency, amount,
     status, received_date, delivery_date, cat_breakdown)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
    [contacto, titulo, par, tipo, palabras, tarifa, divisa, importe, estado, recepcion, entrega, cat]);
  if (estado !== "invoiced" && estado !== "paid") return;
  const pid = db.exec("SELECT last_insert_rowid()")[0].values[0][0];
  db.run(`INSERT INTO invoices
    (project_id, invoice_number, issue_date, due_date, vat_rate, irpf_rate,
     currency, subtotal, total, paid_date)
    VALUES (?,?,?,?,?,?,?,?,?,?)`,
    [pid, "2026-" + String(i).padStart(3, "0"), entrega, entrega, 21, 15,
     divisa, importe, Math.round(importe * 1.06 * 100) / 100, cobro]);
});

for (const [origen, destino, nota] of GLOSARIO) {
  db.run("INSERT INTO glossary_terms (contact_id, source_term, target_term, notes) VALUES (1,?,?,?)",
    [origen, destino, nota]);
}

db.run("INSERT INTO expenses (description, amount, currency, category, date) VALUES (?,420,'EUR','software','2026-01-15')",
  [txt("Licencia CAT anual", "Annual CAT licence")]);
db.run("INSERT INTO expenses (description, amount, currency, category, date) VALUES (?,180,'EUR','otros','2026-02-03')",
  [txt("Cuota de asociación profesional", "Professional association fee")]);

writeFileSync(BASE, Buffer.from(db.export()));

const cuenta = t => db.exec(`SELECT COUNT(*) FROM ${t}`)[0].values[0][0];
console.log(`  contactos ${cuenta("contacts")} · proyectos ${cuenta("projects")} · facturas ${cuenta("invoices")}`);
console.log(`  libro Veri*Factu: ${cuenta("invoice_records")} asientos (intacto, el siguiente número real sigue siendo 2026-001)`);
console.log(`\nSembrado en ${IDIOMA}. Arranca la aplicación y lanza: node scripts/capturar.mjs ${IDIOMA}`);
