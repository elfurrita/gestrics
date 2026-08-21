(function () {
  function setLang(lang) {
    // "article [lang]", no solo "[lang]" — <html lang="en"> también tiene
    // el atributo, así que el selector sin acotar ocultaba la página
    // entera (display:none en la raíz) en vez de solo el bloque de texto.
    // ".page > [lang]" además de "article [lang]": la portada dejó de ser
    // un <article> al convertirse en página de venta, y con el selector
    // antiguo el botón de idioma no encontraba nada que conmutar allí.
    // Sigue acotado —nunca "[lang]" a secas— porque <html lang="en">
    // también lleva el atributo y ocultaría la página entera.
    document.querySelectorAll("article [lang], .page > [lang]").forEach(function (el) {
      // "block" explícito, no "" — el CSS ya oculta [lang="es"] por defecto
      // (red de seguridad si este script no llega a cargar), y borrar el
      // estilo inline con "" no gana esa regla: hay que fijar el valor
      // contrario de forma explícita en los dos casos.
      el.style.display = el.getAttribute("lang") === lang ? "block" : "none";
    });
    document.querySelectorAll(".lang-toggle button").forEach(function (btn) {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
    try { localStorage.setItem("outreach-legal-lang", lang); } catch (e) {}
  }

  document.addEventListener("DOMContentLoaded", function () {
    var buttons = document.querySelectorAll(".lang-toggle button");
    if (!buttons.length) return;
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () { setLang(btn.dataset.lang); });
    });
    var saved = null;
    try { saved = localStorage.getItem("outreach-legal-lang"); } catch (e) {}
    setLang(saved === "es" ? "es" : "en");
  });
})();
