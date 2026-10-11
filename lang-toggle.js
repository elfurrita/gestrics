(function () {
  function setLang(lang, guardar) {
    // "article [lang]", no solo "[lang]" — <html lang="en"> también tiene
    // el atributo, así que el selector sin acotar ocultaba la página
    // entera (display:none en la raíz) en vez de solo el bloque de texto.
    // ".page > [lang]" además de "article [lang]": la portada dejó de ser
    // un <article> al convertirse en página de venta, y con el selector
    // antiguo el botón de idioma no encontraba nada que conmutar allí.
    // La cabecera y la navegación se suman: estaban en inglés fijo también
    // bajo la página en español, en las tres páginas del sitio.
    // Sigue acotado —nunca "[lang]" a secas— porque <html lang="en">
    // también lleva el atributo y ocultaría la página entera.
    document.querySelectorAll("article [lang], .page > [lang], header [lang], nav [lang], footer [lang]").forEach(function (el) {
      // "block" explícito, no "" — el CSS ya oculta [lang="es"] por defecto
      // (red de seguridad si este script no llega a cargar), y borrar el
      // estilo inline con "" no gana esa regla: hay que fijar el valor
      // contrario de forma explícita en los dos casos.
      el.style.display = el.getAttribute("lang") === lang ? "block" : "none";
    });
    document.querySelectorAll(".lang-toggle button").forEach(function (btn) {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
    // El atributo del <html> también: es lo que leen los lectores de
    // pantalla para elegir la pronunciación, y los buscadores para saber en
    // qué idioma está la página. Se quedaba en "en" con la página en español.
    document.documentElement.setAttribute("lang", lang);
    // Solo se guarda lo que la persona ELIGE con el conmutador, no el idioma
    // por defecto: si se guardara siempre, la primera visita a cualquier
    // página dejaba escrito "en" y la guía, que abre en español, ya no podía
    // distinguir entre "eligió inglés" y "nadie ha elegido nada".
    if (guardar) { try { localStorage.setItem("outreach-legal-lang", lang); } catch (e) {} }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var buttons = document.querySelectorAll(".lang-toggle button");
    if (!buttons.length) return;
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () { setLang(btn.dataset.lang, true); });
    });
    var saved = null;
    try { saved = localStorage.getItem("outreach-legal-lang"); } catch (e) {}
    // Una página puede abrir en español con data-lang-defecto="es" en su
    // <html> (la guía de facturación, cuyo público es de habla hispana). Lo
    // que la persona ya haya elegido manda siempre sobre ese defecto.
    var defecto = document.documentElement.getAttribute("data-lang-defecto") === "es" ? "es" : "en";
    setLang(saved === "es" || saved === "en" ? saved : defecto, false);
  });
})();
