# Changelog

Cambios visibles de Gestrics, versión a versión. Lo que no se nota al usar la
aplicación (refactorizaciones, pruebas, ajustes de compilación) no se recoge
aquí.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y
el versionado es [semántico](https://semver.org/lang/es/).

Versión en inglés: [CHANGELOG.en.md](CHANGELOG.en.md)

---

## [1.1.0]

Primera versión que se lanza de verdad. Sustituye al instalador que se subió el
10 de agosto bajo este mismo número: aquel se generó antes de que existiera el
código de licencias, así que no llevaba la activación que su propia nota de
publicación anunciaba.

### Añadido

- **Activación y validación de licencia.** La aplicación pide una licencia
  activa para usarse, y permite desactivar el equipo actual para poder
  activarla en otro.
- **"Enviar encargo"** en la tarjeta del encargo. Antes había que bajar hasta
  una tarjeta aparte al final de la ficha, subir allí los archivos y, en un
  segundo paso, marcarlos y enviarlos; quien no supiera que esa tarjeta existía
  no encontraba cómo entregar el trabajo. Ahora los archivos se eligen dentro
  del propio diálogo de envío.
- **"Enviar factura"** en la tarjeta de la factura, con su archivo a la vista y
  el botón de descarga al lado. Mandar la factura por correo era posible antes,
  pero solo por un camino que había que conocer de antemano.
- **Desglose por categorías CAT en la ficha del proyecto.** Antes solo se veía
  reabriendo el formulario de edición.
- **Par de idiomas de escritura libre**, con las combinaciones habituales como
  sugerencias. Antes eran seis opciones fijas, todas entre inglés, francés y
  español, más un "Otro" que obligaba a un rodeo en cada proyecto.
- **Teléfono, dirección y CIF** en la exportación e importación de contactos.
  Se perdían en cada exportación.
- **Gráficos en Métricas**: cobrado por mes, los últimos doce, y cobrado por
  cliente ordenado de mayor a menor. La pestaña era hasta ahora solo cifras y
  tablas: se leía cuánto se había cobrado en total, pero no si el mes va mejor
  que el anterior ni de qué clientes viene el dinero.
- **Moneda principal elegible** en los ajustes del traductor. En ella se
  resumen los totales de la cabecera y de Métricas. Se propone la que más se
  factura, pero la elección es del traductor: suele ser la divisa en la que
  piensa y paga impuestos, que no tiene por qué ser en la que más ingresa.

### Cambiado

- **Renovación visual completa**: logotipo nuevo, iconos coherentes en toda la
  aplicación, ventanas emergentes con un diseño común, siluetas de carga en vez
  de ruedas giratorias, barras de desplazamiento propias, y un sistema único de
  bordes y sombras.
- **Toda la redacción de la interfaz reescrita**, en español y en inglés.
- **Edición y vista previa de plantillas en una sola pantalla**, en vez de dos
  modos separados.
- **El asunto del correo se guarda solo** mientras se escribe.
- **La factura ya no se guarda como archivo**: se genera en el momento de
  descargarla o enviarla, así que siempre refleja los datos actuales. Antes
  circulaba una copia congelada al crear la factura, y quien generaba un enlace
  de pago después podía enviarle al cliente una factura **sin ese enlace**.
- **Las divisas se nombran con su sigla ISO** —EUR, USD, GBP— en Métricas y en
  la cabecera, en vez de con el símbolo. En español solo el euro y el dólar
  tienen símbolo, así que una misma lista mezclaba "€" y "US$" con "GBP" y
  "CHF".
- **La cabecera muestra un único total abreviado** en la moneda principal
  —"201k EUR"— en lugar de una lista de importes por divisa que no cabía en la
  celda. El importe completo aparece al pasar el ratón, y un beneficio negativo
  se pinta en rojo.
- **Métricas recién instalada ya no recibe con una rejilla de guiones.** Cuatro
  tarjetas con "—" y tres tablas repitiendo "Datos insuficientes" eran la
  primera impresión de quien acababa de instalar la aplicación.
- **El identificador fiscal del cliente deja de llamarse "CIF / NIF"** en
  español: un traductor mexicano veía terminología española encima del RFC de
  su cliente. Con la etiqueta caen cuatro marcadores con formato de NIF español
  que salían bajo campos que dicen RFC, SIRET o GST según el país.
- **El contador "Presupuestos" explica qué cuenta** al pasar el ratón: los ya
  enviados al cliente. Marcaba 0 con el primer proyecto en estado
  "Presupuestado", y sin explicarlo parecía una avería justo en el momento más
  frágil.
- **Los ejemplos del formulario de proyecto llevan "Ej." delante**, para que no
  se lean como datos ya introducidos. Los botones de nuevo contacto y nuevo
  proyecto pierden el "+".
- **La tarifa escribe el decimal según el idioma**: "0,11 EUR/pal" en español,
  donde antes ponía "0.11" justo debajo de importes con coma. El presupuesto
  que recibe el cliente sigue en inglés, con punto.

### Corregido

**Facturación y fiscalidad**

- La retención aparece con el nombre que tiene en el país del emisor —ISR en
  México, IRPF en España— en el formulario, en la ficha y en el PDF. Antes decía
  "IRPF" siempre, de modo que una factura canadiense mostraba un impuesto
  español, y una mexicana llegaba a mostrar cuatro nombres distintos para el
  mismo impuesto.
- Se rechazan tipos negativos de IVA y de retención al crear y al rectificar.
- Una rectificación que solo redistribuye IVA y retención sin cambiar el total
  ya se registra como tal.
- No se puede borrar un proyecto ya facturado.
- El estado manual del proyecto ya no permite marcarlo como facturado sin que
  exista factura.
- Los importes del desglose CAT respetan los decimales de cada divisa.
- Un mes de facturación recurrente saltado se perdía para siempre: si la
  aplicación no se abría durante un mes, al volver solo se generaba el
  corriente y el plan quedaba marcado como al día, sin aviso ni forma de
  recuperar el mes perdido desde ninguna pantalla.
- Restaurar una copia de seguridad podía emitir dos veces la factura del mismo
  mes, cada una con su número y su asiento en el libro.

**Datos y copias de seguridad**

- Restaurar una copia de seguridad conservaba el contacto pero **perdía todo su
  historial**. Ya no.
- Restaurar tampoco pierde ya las fechas de creación y modificación.
- Avanzar de estado borraba todos los entregables, incluidos los que aún no se
  habían enviado a nadie. Ahora solo se borran los que ya llegaron al cliente.

**Métricas**

- La cabecera se derramaba al haber varias divisas: el importe se salía de su
  celda y pisaba la etiqueta de al lado.
- La tarjeta "Beneficio neto" se estiraba a todo el ancho al bajar de fila, y
  dejaba de parecer una tarjeta más.
- La tabla de tarifa media enseñaba filas que parecían repetidas —dos
  "Técnico", dos "EN-ES"—. No lo eran: se agrupa por etiqueta, divisa y unidad,
  porque promediar 0,15 € con 0,18 $ no significaría nada. Ahora cada fila dice
  qué la distingue de sus hermanas.

**Prospección**

- El límite diario de envíos se guardaba y se mostraba, pero no se aplicaba.
- Cancelar un envío por lotes durante una espera de reintento tardaba hasta un
  minuto en surtir efecto. Ahora responde casi al instante.
- La estimación de duración de un envío por lotes se pasaba de largo,
  especialmente en tandas pequeñas.
- Los contactos cuyo último envío falló aparecían como "Pendiente", sin forma de
  distinguirlos de los que nunca se habían contactado.
- La búsqueda de contactos ignora los acentos: "jose" encuentra "José".
- El límite de 5 MB por adjunto se anunciaba pero no se comprobaba; el fallo
  aparecía al enviar, como un error de correo confuso.
- Los correos con espacios sobrantes al principio o al final se limpian al
  guardar.
- Borrar un contacto podía quedar bloqueado sin salida por términos de glosario
  o planes recurrentes que no había forma de gestionar desde ninguna pantalla.

**Otros**

- Los indicadores de respuesta se quedaban en 0 tras la retirada de la
  detección automática de respuestas.
- Los formatos de archivo admitidos como adjunto son los mismos en todos los
  puntos de la aplicación, e incluyen los propios de la traducción.
- Los ejemplos de los formularios ya no muestran direcciones ni números que
  parecieran datos reales ya introducidos.

---

## [1.0.0] — 2026-08-09

Primera versión pública. CRM de escritorio para traductores autónomos, con los
datos guardados en el propio equipo.

### Añadido

- **Prospección**: contactos, plantillas de correo, envío por lotes con límites
  de frecuencia, seguimiento del estado de cada contacto e historial.
- **Proyectos**: encargos con recuento de palabras, tarifas, importación de
  análisis CAT, control de horas, entregables y glosario por cliente.
- **Facturación**: facturas con IVA y retención, PDF propio, libro de asientos
  encadenado conforme a Veri\*Factu, rectificativas, perfiles fiscales por país
  y enlaces de pago con Stripe.
- **Métricas**: ingresos, gastos, tasas de respuesta y desglose por cliente.
- **Copias de seguridad** completas, exportación e importación de contactos en
  CSV, TSV, Excel y ODS.
- Envío por SMTP con detección automática de proveedor.
- Español e inglés.

[1.1.0]: https://github.com/elfurrita/gestrics/releases/tag/v1.1.0
[1.0.0]: https://github.com/elfurrita/gestrics/releases/tag/v1.0.0
