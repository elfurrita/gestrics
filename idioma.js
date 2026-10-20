// idioma.js — el idioma de quien visita, en las páginas que tienen una URL
// por idioma (la portada y la guía).
//
// Esas páginas ya no conmutan el texto en sitio: cada idioma es otra URL,
// porque Google indexa un solo idioma por URL y con los dos juntos la mitad
// en español no aparecía en ninguna búsqueda. Lo que queda aquí es recordar
// el idioma ELEGIDO y llevar a él:
//
// - "outreach-legal-lang" es lo que la persona eligió pulsando una bandera,
//   aquí o en las páginas bilingües (lang-toggle.js usa la misma clave). Si no
//   es el idioma de esta página, se va a la versión que la propia página
//   declara en <link rel="alternate" hreflang>. Por eso el script va en el
//   <head>, después de esos enlaces y sin defer: así no llega a pintarse la
//   versión equivocada. Al pulsar la bandera se guarda ANTES de salir; si no,
//   la página de destino leería la elección vieja y devolvería a la de origen.
// - La mera visita NO se guarda, por dos motivos. Uno: privacy.html (punto
//   11) promete que lo único que el sitio guarda en el navegador es el idioma
//   que se elige con el conmutador. Dos: si la visita redirigiera, quien
//   entró una vez en la portada inglesa (a la que lleva el aviso de versión
//   nueva de la app) acabaría en la guía inglesa al abrir un enlace a la
//   española. Para que terms.html, privacy.html y changelog.html abran en
//   español a quien viene de /es/, los enlaces de las páginas en español
//   llevan "?lang=es", que lang-toggle.js lee sin guardarlo.
//
// A Google no le afecta nada de esto, porque no guarda nada entre visitas.
(function () {
  var ELEGIDO = "outreach-legal-lang";
  var actual = document.documentElement.getAttribute("lang");
  try {
    var elegido = localStorage.getItem(ELEGIDO);
    if ((elegido === "es" || elegido === "en") && elegido !== actual) {
      var alt = document.querySelector('link[rel="alternate"][hreflang="' + elegido + '"]');
      // Solo la ruta: el href lleva el dominio de producción, y así la
      // redirección también funciona en el servidor local de pruebas.
      if (alt) { location.replace(new URL(alt.href).pathname); return; }
    }
  } catch (e) {}

  document.addEventListener("click", function (ev) {
    var a = ev.target.closest && ev.target.closest(".lang-toggle a[data-lang]");
    if (!a) return;
    try { localStorage.setItem(ELEGIDO, a.getAttribute("data-lang")); } catch (e) {}
  });
})();
