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

**Datos y copias de seguridad**

- Restaurar una copia de seguridad conservaba el contacto pero **perdía todo su
  historial**. Ya no.
- Restaurar tampoco pierde ya las fechas de creación y modificación.
- Avanzar de estado borraba todos los entregables, incluidos los que aún no se
  habían enviado a nadie. Ahora solo se borran los que ya llegaron al cliente.

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
