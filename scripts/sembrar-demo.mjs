// sembrar-demo.mjs — datos de demostración para las capturas y el vídeo de la portada.
//
//   (PowerShell) $env:GESTRICS_DB = "$env:TEMP\gestrics-mirar\outreach-studio.db"
//   node scripts/sembrar-demo.mjs es
//   node scripts/sembrar-demo.mjs en
//
// Escribe dieciséis contactos en todos los estados de la prospección,
// diecinueve proyectos (siete abiertos y doce cobrados a lo largo de casi un
// año, para que el gráfico mensual tenga forma), un glosario y seis gastos.
// Las fechas se cuentan hacia atrás desde HOY, así que la demostración nunca
// envejece: lo abierto vence la semana que viene y lo cobrado llega hasta este
// mes.
//
// ── SOLO CONTRA UNA CARPETA DESECHABLE ─────────────────────────────────────
//
// Vacía contactos, proyectos, facturas, glosario y gastos antes de sembrar. Por
// eso exige GESTRICS_DB y se NIEGA a escribir en %APPDATA%\gestrics\: esa es la
// base de pruebas del traductor que desarrolla la aplicación, que no se borra
// ni se pisa (sus datos de prueba, además, llevan su correo real). La carpeta
// la crea `backend-aislado.cjs` de la aplicación (%TEMP%\gestrics-mirar).
//
// Y deja la marca `demo_capturas` en los ajustes: capturar.mjs y grabar-demo.mjs
// la piden al backend antes de disparar, y abortan si no está. Así no se puede
// fotografiar por descuido la base de pruebas.
//
// ── EL ORDEN IMPORTA, Y NO ES OPCIONAL ─────────────────────────────────────
//
// La aplicación trae una migración que "congela" las plantillas de correo
// heredadas —que llevan el nombre, la biografía y los perfiles profesionales
// reales del traductor original— y se dispara cuando detecta que YA HAY
// CONTACTOS, porque eso significa que es una instalación de siempre y no una
// nueva. Si se siembran los contactos primero, la aplicación se toma por
// aquella instalación y rellena las plantillas con esos datos personales. La
// captura de Prospección enseña justo el redactor de correo. Pasó una vez.
//
// Por eso se siembra directo en la base con el backend PARADO:
//
//   1. node <app>/backend/scripts/backend-aislado.cjs  (crea la carpeta y la base vacía)
//   2. Marcar los centinelas — AÚN SIN CONTACTOS:
//        node <app>/scripts/dev-skip-first-run.mjs
//        PUT /api/settings/migration_legacyTemplatesFrozen  -> true
//        PUT /api/settings/translator_fiscalCountry         -> "ES"
//   3. Parar el backend.
//   4. node scripts/sembrar-demo.mjs <idioma>   (con GESTRICS_DB, ver arriba)
//   5. Arrancar el backend aislado y el front (http://localhost:5173).
//   6. node scripts/capturar.mjs <idioma>   (o grabar-demo.mjs)
//   7. Para el otro idioma, parar el backend y volver al paso 4: este script
//      vacía las tablas antes de sembrar, y los centinelas ya están puestos.
//   8. Al terminar, borrar la carpeta desechable entera.
//
// ── Sobre el libro de facturas ─────────────────────────────────────────────
//
// Se escriben filas en `invoices` pero NUNCA en `invoice_records`, que es la
// cadena de asientos encadenados: las facturas se ven en la interfaz para la
// foto sin fabricar un libro fiscal.

import { createRequire } from "node:module";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), "..");

// Ruta al repositorio de la aplicación, de donde sale sql.js. Por defecto se
// busca al lado de este repositorio; con GESTRICS_APP se apunta a otro sitio.
// No se escribe una ruta absoluta aquí: este repositorio es público.
const APP = process.env.GESTRICS_APP || join(RAIZ, "..", "outreach-studio");
const require = createRequire(join(APP, "backend/package.json"));
const initSqlJs = require("sql.js");

const IDIOMA = (process.argv[2] || "es").toLowerCase();
if (!["es", "en"].includes(IDIOMA)) {
  console.error('Idioma no reconocido. Usa "es" o "en".');
  process.exit(1);
}

// Sin valor por defecto a propósito: antes caía en %APPDATA% y un descuido
// vaciaba la base de pruebas del traductor.
if (!process.env.GESTRICS_DB) {
  console.error("Falta GESTRICS_DB: la base de una carpeta DESECHABLE (la de backend-aislado.cjs).");
  console.error('  PowerShell:  $env:GESTRICS_DB = "$env:TEMP\\gestrics-mirar\\outreach-studio.db"');
  process.exit(1);
}
const BASE = resolve(process.env.GESTRICS_DB);
const PROHIBIDA = process.env.APPDATA ? resolve(process.env.APPDATA, "gestrics") : null;
if (PROHIBIDA && BASE.toLowerCase().startsWith(PROHIBIDA.toLowerCase())) {
  console.error("NO: " + BASE + " es la base de pruebas del traductor, que no se pisa.");
  console.error("Siembra en la carpeta de backend-aislado.cjs (%TEMP%\\gestrics-mirar).");
  process.exit(1);
}
if (!existsSync(BASE)) {
  console.error("No hay base en " + BASE + ".\nArranca backend-aislado.cjs una vez para que la cree (paso 1 de la cabecera).");
  process.exit(1);
}

// Los títulos van en el idioma de la captura: un proyecto en español bajo una
// interfaz inglesa se lee como un descuido.
const ES = IDIOMA === "es";
const txt = (es, en) => (ES ? es : en);

// Fecha local AAAA-MM-DD de hace `dias` días (negativo = en el futuro). Con los
// getters locales y no con toISOString(), que da el día UTC.
const hace = dias => {
  if (dias == null) return null;
  const d = new Date();
  d.setDate(d.getDate() - dias);
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
};

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

// [id, nombre, empresa, email, país, estado, especialidad, último contacto (días), seguimientos]
const CONTACTOS = [
  [1, "Annika Lindqvist", "Nordlys Language Services", "annika.lindqvist@nordlys-ls.example", txt("Suecia", "Sweden"), "activeClient", txt("Técnica / Manuales", "Technical / Manuals"), 24, 0],
  [2, "Marc Delacroix", "Atelier Linguistique", "marc.delacroix@atelier-ling.example", txt("Francia", "France"), "activeClient", txt("Jurídica", "Legal"), 6, 0],
  [3, "Sofia Marchetti", "Verba Traduzioni", "sofia.marchetti@verba-trad.example", txt("Italia", "Italy"), "activeClient", "Marketing", 20, 0],
  [4, "Kenji Watanabe", "Sakura Localization", "kenji.watanabe@sakura-loc.example", txt("Japón", "Japan"), "activeClient", txt("Videojuegos", "Video games"), 30, 0],
  [5, "Clara Nowak", "Vistula Language Group", "clara.nowak@vistula-lg.example", txt("Polonia", "Poland"), "responded", "Software", 3, 1],
  [6, "Hannah Weber", "Nordwind Übersetzungen", "hannah.weber@nordwind-ub.example", txt("Alemania", "Germany"), "sent", txt("Técnica", "Technical"), 12, 0],
  [7, "Paulo Ribeiro", "Lusofonia Traduções", "paulo.ribeiro@lusofonia.example", "Portugal", "pending", txt("Financiera", "Financial"), null, 0],
  [8, "Diego Alarcón", "Andes Localización", "diego.alarcon@andes-loc.example", "Chile", "negotiation", txt("Médica", "Medical"), 2, 1],
  [9, "Eva Horváth", "Danubia Fordítóiroda", "eva.horvath@danubia.example", txt("Hungría", "Hungary"), "activeClient", txt("Farmacéutica", "Pharmaceutical"), 4, 0],
  [10, "Liam O'Connor", "Shamrock Translations", "liam.oconnor@shamrock-tr.example", txt("Irlanda", "Ireland"), "activeClient", txt("Jurídica", "Legal"), 1, 0],
  [11, "Ingrid Solberg", "Fjord Språktjenester", "ingrid.solberg@fjord-sprak.example", txt("Noruega", "Norway"), "sent", txt("Energía", "Energy"), 4, 0],
  [12, "Tomás Herrera", "Ibérica Lingua", "tomas.herrera@iberica-lingua.example", txt("España", "Spain"), "responded", txt("Turismo", "Tourism"), 5, 1],
  [13, "Nadia Petrescu", "Carpatia Translations", "nadia.petrescu@carpatia.example", txt("Rumanía", "Romania"), "pending", "Software", null, 0],
  [14, "Jonas Becker", "Rheinland Fachübersetzungen", "jonas.becker@rheinland-fu.example", txt("Alemania", "Germany"), "sent", txt("Automoción", "Automotive"), 13, 1],
  [15, "Amélie Rousseau", "Lumière Traductions", "amelie.rousseau@lumiere-trad.example", txt("Bélgica", "Belgium"), "rejected", txt("Marketing", "Marketing"), 45, 2],
  [16, "Rafael Costa", "Atlântico Localização", "rafael.costa@atlantico-loc.example", txt("Brasil", "Brazil"), "pending", txt("Videojuegos", "Video games"), null, 0],
];

// [contacto, título, par, tipo, palabras, tarifa, divisa, estado,
//  recibido (días), entrega (días; negativo = futura), cobro (días), desglose CAT]
const PROYECTOS = [
  [1, txt("Manual de usuario — bomba de infusión volumétrica", "User manual — volumetric infusion pump"), "EN→ES", txt("Técnico", "Technical"), 12400, 0.11, "EUR", "quoted", 3, -14, null, null],
  [2, txt("Contrato marco de distribución", "Master distribution agreement"), "FR→ES", txt("Jurídico", "Legal"), 8600, 0.13, "EUR", "in_progress", 6, -5, null, null],
  [9, txt("Prospecto de medicamento — 3 presentaciones", "Patient leaflet — 3 presentations"), "EN→ES", txt("Farmacéutico", "Pharmaceutical"), 5300, 0.12, "EUR", "in_progress", 4, -3, null, null],
  [10, txt("Condiciones generales de venta", "General terms and conditions of sale"), "EN→ES", txt("Jurídico", "Legal"), 6900, 0.13, "EUR", "quoted", 1, -10, null, null],
  [3, txt("Catálogo de producto — temporada AW26", "Product catalogue — AW26 season"), "IT→ES", "Marketing", 6200, 0.12, "EUR", "delivered", 20, 4, null, null],
  [4, txt("Guía de estilo de marca", "Brand style guide"), "EN→ES", "Marketing", 4800, 0.14, "EUR", "invoiced", 30, 16, null, null],
  [2, txt("Poderes notariales — lote de 6", "Powers of attorney — batch of 6"), "FR→ES", txt("Jurídico", "Legal"), 3100, 0.13, "EUR", "invoiced", 52, 40, null, null],
  [1, txt("Especificaciones técnicas — sensor de presión", "Technical specifications — pressure sensor"), "EN→ES", txt("Técnico", "Technical"), 12600, 0.11, "EUR", "paid", 60, 48, 30, CAT],
  [1, txt("Manual de mantenimiento — compresor", "Maintenance manual — compressor"), "EN→ES", txt("Técnico", "Technical"), 14200, 0.11, "EUR", "paid", 35, 24, 9, null],
  [9, txt("Ensayo clínico — consentimiento informado", "Clinical trial — informed consent"), "EN→ES", txt("Farmacéutico", "Pharmaceutical"), 4400, 0.12, "EUR", "paid", 80, 72, 55, null],
  [4, txt("Localización de interfaz", "Interface localisation"), "EN→ES", txt("Videojuegos", "Video games"), 7300, 0.14, "EUR", "paid", 105, 95, 88, null],
  [2, txt("Estatutos sociales", "Articles of association"), "FR→ES", txt("Jurídico", "Legal"), 5200, 0.13, "EUR", "paid", 120, 110, 100, null],
  [3, txt("Notas de prensa Q2", "Q2 press releases"), "IT→ES", "Marketing", 3900, 0.12, "EUR", "paid", 140, 130, 118, null],
  [10, txt("Sentencia de apelación", "Appeal court judgment"), "EN→ES", txt("Jurídico", "Legal"), 7800, 0.13, "EUR", "paid", 170, 158, 140, null],
  [2, txt("Informe anual 2025", "Annual report 2025"), "FR→ES", txt("Financiero", "Financial"), 9400, 0.13, "EUR", "paid", 200, 185, 165, null],
  [5, txt("Documentación de API", "API documentation"), "EN→ES", "Software", 15200, 0.12, "USD", "paid", 230, 214, 198, null],
  [1, txt("Fichas de seguridad — reactivos", "Safety data sheets — reagents"), "EN→ES", txt("Técnico", "Technical"), 5100, 0.11, "EUR", "paid", 260, 248, 232, null],
  [4, txt("Diálogos — expansión «Tidebound»", "Dialogue — “Tidebound” expansion"), "EN→ES", txt("Videojuegos", "Video games"), 18500, 0.10, "EUR", "paid", 300, 280, 262, null],
  [3, txt("Web corporativa — 40 páginas", "Corporate website — 40 pages"), "IT→ES", "Marketing", 9800, 0.11, "EUR", "paid", 330, 316, 300, null],
];

const GLOSARIO = [
  ["invoice", "factura", txt("No traducir en cabeceras de tabla", "Do not translate in table headers")],
  ["batch record", "registro de lote", ""],
  ["flow rate", "caudal", txt('Nunca "tasa de flujo"', 'Never "tasa de flujo"')],
  ["syringe driver", "bomba de jeringa", ""],
];

// [descripción, importe, categoría, fecha (días)]
const GASTOS = [
  [txt("Licencia CAT anual", "Annual CAT licence"), 420, "software", 300],
  [txt("Cuota de asociación profesional", "Professional association fee"), 180, "memberships", 280],
  [txt("Diccionario jurídico en línea", "Online legal dictionary"), 96, "software", 150],
  [txt("Curso de posedición", "Post-editing course"), 240, "training", 90],
  [txt("Monitor de 27 pulgadas", "27-inch monitor"), 329, "equipment", 60],
  [txt("Gestoría — trimestre", "Accountant — quarter"), 165, "advisory", 25],
];

const SQL = await initSqlJs();
const db = new SQL.Database(readFileSync(BASE));

for (const tabla of ["projects", "invoices", "glossary_terms", "contacts", "expenses"]) {
  try { db.run(`DELETE FROM ${tabla}`); } catch { /* La tabla puede no existir aún. */ }
}

for (const [id, nombre, empresa, email, pais, estado, especialidad, ultimo, seguimientos] of CONTACTOS) {
  db.run(`INSERT INTO contacts
    (id, nombre, empresa, email, pais, status, especialidad, tipo, idiomas, firstContactDate, lastContactDate, followUpCount)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
    [id, nombre, empresa, email, pais, estado, especialidad, "Agencia", "EN, ES",
     ultimo == null ? null : hace(ultimo + 30), hace(ultimo), seguimientos]);
}

// La numeración, correlativa por año y en orden de emisión, como la de verdad.
const facturables = PROYECTOS
  .map((p, i) => ({ p, i }))
  .filter(({ p }) => p[7] === "invoiced" || p[7] === "paid")
  .sort((a, b) => b.p[9] - a.p[9]);
const numeros = new Map();
const porAnio = {};
for (const { i, p } of facturables) {
  const anio = hace(p[9]).slice(0, 4);
  porAnio[anio] = (porAnio[anio] || 0) + 1;
  numeros.set(i, anio + "-" + String(porAnio[anio]).padStart(3, "0"));
}

PROYECTOS.forEach((p, i) => {
  const [contacto, titulo, par, tipo, palabras, tarifa, divisa, estado, recibido, entrega, cobro, cat] = p;
  // Con análisis CAT el importe es la suma ponderada del desglose, como lo
  // calcula la aplicación; palabras × tarifa haría que la tabla de la captura
  // no sumara el importe que tiene encima.
  const importe = cat
    ? Math.round(Object.values(JSON.parse(cat).categories)
        .reduce((s, c) => s + c.words * tarifa * c.weight / 100, 0) * 100) / 100
    : Math.round(palabras * tarifa * 100) / 100;
  db.run(`INSERT INTO projects
    (contact_id, title, lang_pair, content_type, word_count, rate, currency, amount,
     status, received_date, delivery_date, cat_breakdown)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
    [contacto, titulo, par, tipo, palabras, tarifa, divisa, importe, estado, hace(recibido), hace(entrega), cat]);
  if (!numeros.has(i)) return;
  const pid = db.exec("SELECT last_insert_rowid()")[0].values[0][0];
  // Todos los clientes son extranjeros: inversión del sujeto pasivo o
  // exportación, sin IVA ni retención. Es lo habitual de un traductor que
  // trabaja para agencias de fuera, y así el total coincide con la base.
  db.run(`INSERT INTO invoices
    (project_id, invoice_number, issue_date, due_date, vat_rate, irpf_rate,
     currency, subtotal, vat_amount, irpf_amount, total, paid_date)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
    [pid, numeros.get(i), hace(entrega), hace(entrega - 30), 0, 0, divisa, importe, 0, 0, importe, hace(cobro)]);
});

for (const [origen, destino, nota] of GLOSARIO) {
  db.run("INSERT INTO glossary_terms (contact_id, source_term, target_term, notes) VALUES (1,?,?,?)",
    [origen, destino, nota]);
}

for (const [descripcion, importe, categoria, dias] of GASTOS) {
  db.run("INSERT INTO expenses (description, amount, currency, category, date) VALUES (?,?,'EUR',?,?)",
    [descripcion, importe, categoria, hace(dias)]);
}

// La marca que capturar.mjs y grabar-demo.mjs piden antes de disparar.
db.run("INSERT OR REPLACE INTO settings (key, value) VALUES ('demo_capturas', 'true')");

writeFileSync(BASE, Buffer.from(db.export()));

const cuenta = t => db.exec(`SELECT COUNT(*) FROM ${t}`)[0].values[0][0];
console.log(`  contactos ${cuenta("contacts")} · proyectos ${cuenta("projects")} · facturas ${cuenta("invoices")} · gastos ${cuenta("expenses")}`);
console.log(`  libro: ${cuenta("invoice_records")} asientos (no se fabrica ninguno)`);
console.log(`\nSembrado en ${IDIOMA} en ${BASE}.\nArranca backend-aislado.cjs y el front, y lanza: node scripts/capturar.mjs ${IDIOMA}`);
