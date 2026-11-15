// calculadora-tarifa.js — la calculadora de tarifa por palabra de las guías
// guia-tarifa-por-palabra-traductor.html (es) y
// translator-per-word-rate-calculator.html (en).
//
// Solo aritmética sobre dos fuentes, las mismas que cita la guía:
//
// - La cuota de autónomos de 2026: tabla de tramos y bases mínimas del art. 18
//   de la Orden PJC/297/2026 (BOE-A-2026-7296), y tipos de los arts. 18 y 37:
//   28,30 contingencias comunes + 1,30 profesionales + 0,90 equidad
//   intergeneracional + 0,90 cese de actividad + 0,10 formación = 31,50 %.
// - Cómo se elige el tramo: art. 308.1.c del texto refundido de la Ley General
//   de la Seguridad Social (BOE-A-2015-11724). Rendimiento computable =
//   rendimiento neto + la propia cuota (o sea, ingresos menos gastos sin la
//   cuota), con un 7 % de deducción por gastos genéricos, repartido por meses.
//
// Lo que NO hace, y la página lo dice: IRPF, IVA, la cuota reducida del art. 38
// ter del Estatuto del Trabajo Autónomo (su cuantía la fija cada Ley de
// Presupuestos y no se ha leído la de 2026) y cualquier base distinta de la
// mínima del tramo. AL CAMBIAR DE AÑO, la tabla y los tipos se vuelven a leer
// en la orden de cotización nueva y se actualizan aquí Y en la tabla de la guía.
(function () {
  var TIPO = 0.315;
  var GASTOS_GENERICOS = 0.07;
  // [límite superior del tramo en euros/mes, base mínima, nombre es, nombre en, ¿límite inclusivo?]
  // El tramo 3 de la reducida es «> 900 y < 1.166,70» (estricto) y el 1 de la
  // general «≥ 1.166,70»: por eso el tercero no incluye su límite.
  var TRAMOS = [
    [670, 653.59, "tabla reducida, tramo 1", "reduced table, bracket 1", true],
    [900, 718.95, "tabla reducida, tramo 2", "reduced table, bracket 2", true],
    [1166.70, 849.67, "tabla reducida, tramo 3", "reduced table, bracket 3", false],
    [1300, 950.98, "tabla general, tramo 1", "general table, bracket 1", true],
    [1500, 960.78, "tabla general, tramo 2", "general table, bracket 2", true],
    [1700, 960.78, "tabla general, tramo 3", "general table, bracket 3", true],
    [1850, 1143.79, "tabla general, tramo 4", "general table, bracket 4", true],
    [2030, 1209.15, "tabla general, tramo 5", "general table, bracket 5", true],
    [2330, 1274.51, "tabla general, tramo 6", "general table, bracket 6", true],
    [2760, 1356.21, "tabla general, tramo 7", "general table, bracket 7", true],
    [3190, 1437.91, "tabla general, tramo 8", "general table, bracket 8", true],
    [3620, 1519.61, "tabla general, tramo 9", "general table, bracket 9", true],
    [4050, 1601.31, "tabla general, tramo 10", "general table, bracket 10", true],
    [6000, 1732.03, "tabla general, tramo 11", "general table, bracket 11", true],
    [Infinity, 1928.10, "tabla general, tramo 12", "general table, bracket 12", true],
  ];

  function tramoDe(mensual) {
    for (var i = 0; i < TRAMOS.length; i++) {
      var t = TRAMOS[i];
      if (t[4] ? mensual <= t[0] : mensual < t[0]) return t;
    }
    return TRAMOS[TRAMOS.length - 1];
  }

  function centimos(x) { return Math.round(x * 100) / 100; }

  // La cuota depende de los rendimientos, y los rendimientos de lo que se
  // factura, que a su vez tiene que cubrir la cuota. Se itera hasta que el
  // tramo no cambia; si oscila entre dos (justo en un límite), se queda con
  // la cuota mayor, que es la que no deja corta la tarifa.
  function cuotaPara(objetivo) {
    var cuota = 0, vista = {};
    for (var i = 0; i < 30; i++) {
      var computableMensual = (objetivo + cuota * 12) * (1 - GASTOS_GENERICOS) / 12;
      var t = tramoDe(computableMensual);
      var nueva = centimos(t[1] * TIPO);
      if (nueva === cuota) return { cuota: cuota, tramo: t };
      if (vista[nueva]) { var mayor = Math.max(nueva, cuota); return { cuota: mayor, tramo: mayor === nueva ? t : tramoDe((objetivo + mayor * 12) * (1 - GASTOS_GENERICOS) / 12) }; }
      vista[cuota] = true;
      cuota = nueva;
    }
    return { cuota: cuota, tramo: tramoDe((objetivo + cuota * 12) * (1 - GASTOS_GENERICOS) / 12) };
  }

  // Cifras tecleadas como las escribe cada idioma: en español el punto separa
  // miles y la coma decimales; en inglés, al revés. El separador de miles solo
  // vale agrupando de tres en tres: «37.5» en español no es 375 sino un error,
  // porque quien lo teclea casi seguro quería 37,5 (y en inglés, «37,5»). Lo
  // ambiguo no se adivina: devuelve NaN y la calculadora lo dice en vez de
  // calcular con una cifra diez veces mayor.
  function leer(texto, lang) {
    var t = String(texto).replace(/[\s€%]/g, "");
    if (!t) return NaN;
    var valido = lang === "es" ? /^-?(\d{1,3}(\.\d{3})+|\d+)(,\d+)?$/ : /^-?(\d{1,3}(,\d{3})+|\d+)(\.\d+)?$/;
    if (!valido.test(t)) return NaN;
    t = lang === "es" ? t.replace(/\./g, "").replace(",", ".") : t.replace(/,/g, "");
    return parseFloat(t);
  }

  function iniciar() {
    var raiz = document.getElementById("calculadora");
    if (!raiz) return;
    var lang = document.documentElement.getAttribute("lang") === "es" ? "es" : "en";
    var loc = lang === "es" ? "es-ES" : "en-GB";
    var eur = function (x, dec) {
      return new Intl.NumberFormat(loc, { style: "currency", currency: "EUR", minimumFractionDigits: dec, maximumFractionDigits: dec }).format(x);
    };
    var num = function (x) { return new Intl.NumberFormat(loc, { maximumFractionDigits: 0 }).format(x); };
    // La tarifa mínima se redondea AL ALZA: redondear al más cercano podría
    // dejarla una milésima por debajo de lo que cubre los costes.
    var alAlza = function (x, dec) { var f = Math.pow(10, dec); return Math.ceil(x * f - 1e-9) / f; };

    var campos = ["objetivo", "gastos", "semanas", "horas", "palabras", "pagado"];
    var salida = raiz.querySelector("[data-salida]");
    var T = lang === "es" ? {
      error: "Revisa los campos marcados: tienen que ser números mayores que cero, con coma para los decimales (37,5). Los gastos pueden ser cero; las semanas no pasan de 52, las horas a la semana de 168 ni el porcentaje de 100.",
      cuota: "Cuota de autónomos estimada", cuotaDe: function (t) { return "al mes, base mínima de la " + t; },
      ingresos: "Lo que necesitas facturar al año (sin IVA)",
      horas: "Horas facturables al año", palabras: "Palabras al año",
      porHora: "Tarifa mínima por hora", porPalabra: "Tarifa mínima por palabra",
      conDescuento: "Por palabra, si se aplican descuentos por coincidencias",
      conDescuentoNota: function (p) { return "la que tendrías que fijar si de media se paga el " + p + " % de las palabras"; },
    } : {
      error: "Check the highlighted fields: they must be numbers above zero, with a point for decimals (37.5). Expenses can be zero; weeks cannot exceed 52, hours a week 168, or the percentage 100.",
      cuota: "Estimated self-employed contribution", cuotaDe: function (t) { return "a month, minimum base of the " + t; },
      ingresos: "What you need to invoice a year (excluding VAT)",
      horas: "Billable hours a year", palabras: "Words a year",
      porHora: "Minimum rate per hour", porPalabra: "Minimum rate per word",
      conDescuento: "Per word, if match discounts are applied",
      conDescuentoNota: function (p) { return "the rate you would need to set if on average " + p + "% of the words are paid"; },
    };

    function fila(etiqueta, valor, nota) {
      return '<div class="calc-fila"><span class="calc-etiqueta">' + etiqueta + '</span><span class="calc-valor">' + valor + "</span>" +
        (nota ? '<span class="calc-nota">' + nota + "</span>" : "") + "</div>";
    }

    function calcular() {
      var v = {}, malos = [];
      campos.forEach(function (c) {
        var el = raiz.querySelector('[name="' + c + '"]');
        var x = leer(el.value, lang);
        var tope = { semanas: 52, horas: 168, pagado: 100 }[c];
        var valido = c === "gastos" ? x >= 0 : x > 0 && (tope === undefined || x <= tope);
        el.setAttribute("aria-invalid", valido ? "false" : "true");
        if (!valido) malos.push(c);
        v[c] = x;
      });
      if (malos.length) { salida.innerHTML = '<p class="calc-error">' + T.error + "</p>"; return; }

      var c = cuotaPara(v.objetivo);
      var ingresos = v.objetivo + v.gastos + c.cuota * 12;
      var horas = v.semanas * v.horas;
      var palabras = horas * v.palabras;
      var html = fila(T.cuota, eur(c.cuota, 2), T.cuotaDe(c.tramo[lang === "es" ? 2 : 3])) +
        fila(T.ingresos, eur(centimos(ingresos), 2)) +
        fila(T.horas, num(horas)) +
        fila(T.palabras, num(palabras)) +
        fila(T.porHora, eur(alAlza(ingresos / horas, 2), 2)) +
        fila(T.porPalabra, eur(alAlza(ingresos / palabras, 3), 3));
      if (v.pagado < 100) {
        var p = new Intl.NumberFormat(loc, { maximumFractionDigits: 1 }).format(v.pagado);
        html += fila(T.conDescuento, eur(alAlza(ingresos / (palabras * v.pagado / 100), 3), 3), T.conDescuentoNota(p));
      }
      salida.innerHTML = html;
    }

    raiz.addEventListener("input", calcular);
    calcular();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();

  // Para las pruebas desde la consola o desde node, sin tocar la página.
  if (typeof window !== "undefined") window.__calculadoraTarifa = { cuotaPara: cuotaPara, tramoDe: tramoDe, leer: leer };
})();
