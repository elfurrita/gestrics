// analitica.js — la baliza de Cloudflare Web Analytics.
//
// El identificador vive AQUÍ y en ningún otro sitio. Las cuatro páginas
// cargan este archivo, así que cambiarlo o quitarlo se hace en un solo
// lugar. Ojo con changelog.html: no se edita a mano, su marco está
// copiado dentro de scripts/generar-changelog.mjs y de ahí sale la
// etiqueta que carga este archivo.
//
// Por qué Cloudflare y no otra: no pone cookies ni escribe nada en el
// navegador de quien visita, así que no hace falta banner de consentimiento
// — y un producto cuyo argumento es "tus datos no salen de tu ordenador" no
// puede permitirse pedir permiso para rastrear en su propia portada.
//
// Lo que mide: cuántas visitas recibe cada página y desde qué tipo de
// dispositivo, en agregado. No identifica a nadie ni sigue a la misma
// persona entre sitios.
//
// Está declarado en el punto 11 de privacy.html, en los dos idiomas. Si
// algún día se quita esto, hay que quitar también ese apartado: un texto
// legal que describe algo que ya no existe miente igual que uno que calla
// algo que sí.

// ── El identificador del sitio, de Cloudflare ──────────────────────────
//
// Se saca del panel de Cloudflare Web Analytics, al añadir el sitio: es la
// cadena larga que aparece en el fragmento que te dan para pegar, dentro de
// data-cf-beacon={"token": "..."}. Pega SOLO esa cadena aquí.
const TOKEN = "PEGA_AQUI_EL_TOKEN";

// Mientras el token siga sin poner, esto no hace nada: ni carga la baliza ni
// pide nada a ningún sitio. Es a propósito — olvidarse de pegarlo no debe
// dejar la web haciendo peticiones rotas a Cloudflare en cada visita.
if (TOKEN && TOKEN !== "PEGA_AQUI_EL_TOKEN") {
  const baliza = document.createElement("script");
  baliza.defer = true;
  baliza.src = "https://static.cloudflareinsights.com/beacon.min.js";
  baliza.setAttribute("data-cf-beacon", JSON.stringify({ token: TOKEN }));
  document.head.appendChild(baliza);
}
