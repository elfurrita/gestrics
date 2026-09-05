# Changelog

Cambios visibles de Gestrics, versión a versión. Lo que no se nota al usar la
aplicación (refactorizaciones, pruebas, ajustes de compilación) no se recoge
aquí.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y
el versionado es [semántico](https://semver.org/lang/es/).

Versión en inglés: [CHANGELOG.en.md](CHANGELOG.en.md)

---

## [1.1.0] — 2026-09-05

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
- **Dirección de soporte dentro de la aplicación**: en el perfil del traductor,
  junto al botón de descargar el registro técnico, en la pantalla de servidor no
  disponible y en la de recuperación tras un error. Estaba solo en la web, así
  que quien se atascaba dentro del programa no tenía a quién escribir sin salir
  a buscarlo.
- La pantalla de activación de licencia ya dice a quién escribir. Los mensajes
  de licencia suspendida, bloqueada o activada en el máximo de equipos piden
  contactar con soporte, y esa pantalla —la primera de todas, con la aplicación
  entera detrás— no daba ninguna dirección: la única que hay vive en el perfil
  del traductor, o sea al otro lado de la puerta que no se abre.
- La guía de inicio se puede volver a abrir siempre, desde Configuración.
  Estaba en un icono de la cabecera que solo aparecía si se había omitido el
  paso del perfil, así que quien rellenó su nombre —lo más probable— perdía el
  asistente y el recorrido para siempre. Ahora vive junto al Diagnóstico, que
  es donde está el resto del mantenimiento, y no ocupa sitio en una cabecera
  que no da más de sí.
- La lista de contactos vacía dice por dónde se empieza. Recién instalada era lo
  primero que se miraba —un icono, «Sin contactos» y nada más—, con las dos
  puertas a la vista pero sin que ninguna se anunciara como el primer paso.
  Ahora nombra las dos: la pestaña «Nuevo contacto» de arriba y el botón
  «Importar contactos» de abajo. Solo aparece con la lista de verdad vacía,
  nunca cuando es el buscador o el filtro de estado el que no encuentra nada.
- El formulario de un proyecto nuevo dice de dónde salen los clientes cuando no
  hay ninguno. Quien compra la aplicación por la facturación va derecho a
  Proyectos y se encuentra el desplegable de cliente con una sola opción, la de
  «elige uno»: los clientes son los contactos de Prospección, que es otra
  pestaña, con otro nombre y sin nada que las relacione. La pista solo aparece
  con la lista vacía.
- El asistente de bienvenida ya explica qué decide el país fiscal, con la misma
  frase que el perfil del traductor: de esa elección salen el nombre de cada
  impuesto, los porcentajes que se ofrecen, la etiqueta del identificador
  fiscal y si la factura lleva Veri*Factu. Era el único de los dos sitios donde
  se elige que no lo contaba, y encima es el primero por el que se pasa.
- **Periodo de prueba de 14 días.** La aplicación se puede usar entera, sin
  clave y sin tarjeta, durante catorce días desde la primera vez que se abre.
  Una franja bajo la cabecera dice cuántos quedan, y en los tres últimos pasa
  de ámbar a rojo; desde ahí se puede comprar la licencia o introducir una que
  ya se tenga. Cumplido el plazo, la aplicación pide licencia para volver a
  entrar y lo dice con esas palabras, en vez de mandar a buscar una clave de
  compra que nunca hubo. Los datos siguen donde estaban.

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
- **La pantalla de "servidor no disponible" deja de pedir una orden de
  terminal.** Enseñaba `cd server && npm start` a quien no tiene terminal —el
  servidor local lo arranca la propia aplicación—, y encima esa carpeta no
  existe con ese nombre. Ahora dice lo único que el usuario puede hacer de
  verdad: cerrar Gestrics y volver a abrirlo, que relanza el proceso.
- Conectar el correo deja de ser obligatorio para entrar. El paso «Conecta tu
  correo» del asistente de bienvenida no se podía omitir, no se cierra con
  Escape ni con un clic fuera y tapa el resto de la aplicación, así que quien no
  tuviera a mano una contraseña de aplicación se quedaba fuera de lo que acababa
  de instalar — aunque proyectos, presupuestos y facturas funcionan sin correo.
  Ahora se puede dejar para luego: mientras siga pendiente, el engranaje de
  Configuración lleva un punto ámbar que lo explica al pasar el ratón, y
  cualquier intento de envío lo dice en el idioma de la interfaz en vez de
  fallar contra el servidor.
- El paso del correo del asistente dice qué cuenta hay conectada, no solo que
  la hay. Un tick verde sin dirección obliga a fiarse, y es justo la duda que
  lleva a reescribir una contraseña de aplicación que estaba bien.
- El segundo paso del asistente se llamaba «Datos de facturación» y recogía dos
  campos de los veintisiete del perfil. Ahora se llama «Nombre y país fiscal» y
  dice dónde se rellena el resto —identificador fiscal, dirección, IBAN—, en
  vez de dar por cerrada una facturación que se queda a medias.
- **Los Términos de Uso recogen el periodo de prueba.** El punto 3 pasa a
  llamarse "Periodo de prueba, licencia de uso y activación" y describe los
  catorce días: todas las funciones, sin clave y sin medio de pago, contados
  en el propio equipo. Antes decía solo que el uso estaba sujeto al pago y a
  una clave de licencia. Al ser un cambio sustancial, la aplicación vuelve a
  pedir que se acepten los términos la próxima vez que se abre.

### Corregido

**Alta**

- Cambiar de proveedor de correo en el asistente dejaba en pantalla el error
  del proveedor anterior: elegir «Personalizado» después de fallar con Gmail
  seguía enseñando el aviso sobre la contraseña de aplicación de Gmail, debajo
  de un formulario que ya pedía otra cosa.
- Con un proveedor de correo «Personalizado», la casilla «Usar SSL/TLS» venía
  marcada mientras el puerto sugerido era el 587 — justo la combinación que no
  funciona, porque 465 es TLS desde el primer byte y 587 es STARTTLS. Quien
  escribiera su servidor y dejara el puerto sugerido fallaba en el primer
  intento sin haberse equivocado en nada. Ahora la casilla arranca desmarcada,
  a juego con el 587, y sigue al puerto en los dos valores donde la respuesta
  no admite discusión; en cualquier otro (2525, 25, uno propio del proveedor)
  se respeta lo que se haya marcado a mano. Vale para los dos formularios, el
  del asistente y el de Configuración.
- Conectar el correo desde el asistente de bienvenida dejaba la pantalla de
  Configuración como si no hubiera ninguna cuenta —proveedor «Gmail» y los
  campos vacíos— con el correo ya funcionando. El asistente solo guardaba donde
  lee el servidor para enviar, y esa pantalla se pinta de otro sitio que nadie
  actualizaba; por lo mismo, volver a abrir el asistente pedía otra vez la
  contraseña de una cuenta que ya estaba conectada. La contraseña sigue sin
  guardarse ahí.

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
- La etiqueta del campo de nota fiscal del perfil decía «Nota de IVA / TVA» a
  fuego: dos nombres de impuesto de dos países concretos en el mismo renglón,
  mirara quien mirara. Ahora sale del perfil fiscal como el resto de la
  aplicación — «Nota de GST» con perfil de India, y el genérico traducido
  cuando el país no tiene término propio.
- El marcador de posición del IBAN proponía un número con forma española
  (`ES00 0000…`) tuviera el perfil fiscal que tuviera. Ahora es neutro
  (`XX00 0000…`): conserva la pista de cómo se agrupa un IBAN sin dar por
  hecho el país, y hace juego con el del BIC de al lado.
- La exportación contable a CSV escribía a fuego y en español las cabeceras de
  los dos impuestos («% IVA», «% IRPF»), sin mirar el perfil fiscal: un
  traductor con perfil de México recibía una columna «IRPF» de lo que en su
  país es el ISR, contradiciendo al PDF de esa misma factura. Con la interfaz
  en inglés salían igualmente en español la cabecera entera, el estado de cada
  fila y el nombre del archivo.
- El «Historial de rectificaciones» de una factura llamaba a la retención por su
  nombre genérico en vez de por el que tiene en el país del traductor: con perfil
  fiscal de México ponía «IRPF» donde el resto de la aplicación ya decía «ISR».
  El IVA de esa misma línea sí salía bien.
- El aviso de un porcentaje de impuesto negativo nombraba el IVA y el IRPF, dos
  impuestos españoles, sin mirar el país del traductor: uno mexicano leía que el
  problema estaba en su IRPF, que no existe allí —su retención es el ISR—, y uno
  indio, que solo tiene GST, lo mismo. Ahora habla de «los porcentajes de
  impuestos», sin nombrar ninguno.
- La retención salía llamada «IRPF» en la factura de casi todo el mundo. Solo
  España y México tenían nombre propio para ella, así que un traductor
  colombiano, argentino o chileno —o cualquiera de los demás países— veía el
  nombre del impuesto español ahí donde debía ir el suyo. Ahora, cuando el país
  no tiene un nombre concreto, pone «Retención» a secas. El IVA no cambia: ese
  sí se llama igual en toda Hispanoamérica.
- El motivo de una rectificativa pedía el cambio «al modificar IVA/IRPF» y
  proponía de ejemplo «IVA aplicado incorrectamente», dos renglones por debajo
  de unas casillas que sí llamaban a cada impuesto por su nombre. Ahora también
  esas dos frases usan el del país.

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
- El aviso que recorta un envío en lote al llegar al límite diario dejaba un
  `{{remaining}}` literal a la vista en su segunda frase («Se enviará a
  {{remaining}} de 8 contactos»), en español y en inglés: el hueco aparece dos
  veces en la cadena y solo se rellenaba la primera.

**Envío de correo**

- Un mismo correo podía llegarle al cliente **tres veces**. Si la conexión se
  cortaba justo después de entregar el mensaje —el servidor ya lo tenía en
  cola y lo único que se perdió fue la confirmación—, la aplicación lo daba
  por fallido y volvía a mandarlo hasta tres veces, para acabar avisando de un
  error. En prospección eso es el mismo correo en frío repetido a un cliente
  potencial. Ahora solo se reintenta lo que se sabe ocurrido antes de la
  entrega, como un rechazo temporal del destinatario; el resto se avisa sin
  repetir el envío.
- Cualquier negativa del servidor de correo se anunciaba como «verifica tu
  contraseña de aplicación». Una dirección que no existe, un mensaje demasiado
  grande o uno bloqueado por el filtro antispam mandaban a reescribir una
  contraseña que estaba perfecta, sin ninguna salida: la comprobación de
  Configuración seguía diciendo que era correcta. Cada caso dice ahora lo que
  pasó de verdad.
- Un servidor que se quedaba a medias podía dejar la aplicación en «Enviando…»
  hasta media hora —diez minutos por intento, y lo intentaba tres veces— sin
  nada que pulsar y sin saber si el correo había salido. Ahora cada fase de la
  conexión tiene su propio límite de espera.
- El asunto podía salir con las variables sin resolver. Si llevaba
  «{{idiomas}}» o «{{especialidad}}» —la plantilla del cuerpo admite las dos, y
  el aviso de variables sin resolver las daba por buenas—, el cliente recibía
  las llaves literales en la línea de asunto de un correo en frío. El historial
  del contacto guardaba además el asunto bien resuelto, así que ni ahí se veía.
- Un adjunto vacío se enviaba como si nada. Un archivo de 0 bytes —un export
  que falló a medias, o uno que la nube todavía no había bajado del todo— se
  aceptaba, aparecía listado como adjunto y el envío lo descartaba sin decir
  nada: el cliente recibía el correo sin el archivo y la aplicación informaba
  de éxito. Ahora no se puede añadir, y si alguno llega vacío por otro camino
  el envío se detiene y dice cuál es.
- Guardar la configuración de correo cuando el archivo no se podía escribir en
  disco —sin espacio libre, sin permisos o con un antivirus bloqueándolo—
  apagaba en silencio el servidor interno de la aplicación: la ventana seguía
  abierta y todo lo demás dejaba de responder sin un solo aviso. Ahora lo
  explica y la aplicación sigue en pie.

- Un formato que no se puede mandar se avisa al elegir el archivo, no al
  enviar. Un .exe o un .docm se aceptaba como adjunto —el filtro del diálogo
  de archivos es solo una sugerencia y basta con elegir «Todos los archivos»—,
  se quedaba en la lista como uno más y el rechazo llegaba al pulsar Enviar;
  en un lote, una vez por cada contacto. Ahora se comprueba al elegirlo y
  también al guardarlo, con el mismo criterio que ya usaban los entregables.
- Los avisos del envío que estaban escritos a fuego en español ahora salen en
  el idioma de la interfaz: la dirección de destinatario mal escrita, el
  adjunto demasiado grande, el formato no admitido, más de cinco archivos y el
  límite de envíos seguidos. Hasta ahora solo se traducían los errores de
  conexión con el proveedor de correo.
- Cambiar la cuenta de correo sin escribir la contraseña decía «Configuración
  guardada» y no cambiaba nada: la pantalla pasaba a mostrar la dirección
  nueva mientras los correos seguían saliendo de la anterior. Como la
  contraseña nunca se prerrellena, bastaba con reabrir Configuración y tocar el
  correo. Ahora avisa de que hace falta la contraseña para verificar la cuenta
  y deja el diálogo abierto con todo lo escrito, en vez de dar por guardado lo
  que no lo estaba.

**Otros**

- Los indicadores de respuesta se quedaban en 0 tras la retirada de la
  detección automática de respuestas.
- Los formatos de archivo admitidos como adjunto son los mismos en todos los
  puntos de la aplicación, e incluyen los propios de la traducción.
- Los ejemplos de los formularios ya no muestran direcciones ni números que
  parecieran datos reales ya introducidos.
- Con Windows en modo oscuro, el armazón de la aplicación aparecía flanqueado
  por dos bandas casi negras. Sobrevivía un bloque de modo oscuro heredado de la
  plantilla del andamiaje que redefinía el fondo, el texto y el borde de una
  interfaz que usa una paleta clara a propósito.
- Las plantillas de correo ya no llevan la identidad del traductor de la
  instalación original en ninguna parte de la aplicación instalada. Quedaba una
  migración con su nombre, su titulación y sus perfiles profesionales escritos
  en claro, dentro de un archivo que se instala sin comprimir.
- Una caída del servidor interno ya deja constancia en `send.log`. Es un camino
  distinto del de la pantalla de error, que registraba y sigue registrando lo
  suyo: aquí se trata del proceso que guarda los datos. Que se hubiera muerto
  no quedaba anotado en ningún sitio, y el motivo dependía de una carrera: el
  registro se escribe por un flujo que el cierre del proceso no espera, así que
  ese último renglón —el que explica la caída— llegaba o no sin que nada lo
  garantizara, y con el archivo aún sin estrenar no llegaba nunca. Ahora se
  escribe directamente antes de salir, y la aplicación anota además que el
  servidor interno ha terminado, cosa que hasta ahora solo iba a una consola
  que la versión instalada no tiene.
- Un fallo inesperado del servidor ya no se lleva por delante lo último que
  hayas hecho. La base de datos se guarda en diferido —los cambios se acumulan
  en memoria y bajan a disco un segundo después—, y cerrar la aplicación por
  las buenas fuerza ese guardado antes de salir. Estrellarse, en cambio, no lo
  hacía: había dos manejadores de excepciones no controladas y el primero
  mataba el proceso antes de que el segundo, el único que guardaba, llegara a
  ejecutarse. Cualquier excepción no capturada, o cualquier promesa rechazada
  sin capturar, tiraba lo que estuviera pendiente: el contacto recién editado,
  las horas recién anotadas. Ahora los cuatro caminos de salida guardan.
- Los cierres inesperados de la interfaz no dejaban rastro en `send.log`.
  Había dos redes de seguridad anidadas, y la interior —que era la que
  atrapaba todos los fallos, por estar más cerca— solo escribía en la consola
  del navegador: el archivo que la propia pantalla de error pide adjuntar
  llegaba sin una línea sobre ese fallo. Queda solo la red exterior, que sí
  registra la traza.
- Esa pantalla de error aparece ya en el idioma activo. Llevaba todo su texto
  en español y en inglés a la vez, uno debajo del otro, y era la única de la
  aplicación que no pasaba por el sistema de traducción. Además, mientras no
  se hubiera elegido idioma caía siempre en español, aunque el sistema
  estuviera en inglés.
- Todos los avisos que la aplicación te da cuando algo no se puede hacer salen
  ya en el idioma de la interfaz. Antes buena parte de ellos llegaba en español
  aunque la tuvieras en inglés, porque el texto se escribía en el interior del
  programa y se enseñaba tal cual. Son unos cincuenta: contactos, encargos,
  facturas, planes recurrentes, horas, gastos, glosario, entregables, Stripe,
  licencia y tipos de cambio. De paso varios dicen mejor lo que pasa — que ese
  correo ya lo tiene otro contacto, cuántos encargos hay que quitar antes de
  poder eliminarlo, o que un encargo ya facturado tiene el importe congelado en
  su factura.

### Seguridad

Primera revisión de seguridad de la aplicación, centrada en lo que de verdad
puede pasarle a un traductor: un archivo malo que abre él mismo, y una web
abierta en el navegador mientras Gestrics está en marcha.

- **Restaurar una copia de seguridad incompleta ya no borra las facturas
  emitidas.** Restaurar una copia hecha con una versión anterior —de las que no
  guardaban el libro de facturas— vaciaba ese libro y decía que todo había ido
  bien. Y como la numeración se calcula a partir de él, la siguiente factura
  volvía a llamarse 2026-001: un número que ya se le había enviado a otro
  cliente. Ahora la aplicación se detiene antes de tocar nada, dice cuántas
  facturas emitidas se perderían y con qué números, y solo sigue si lo
  confirmas expresamente.
- **Una copia con el libro de facturas manipulado no se guarda.** Los asientos
  van encadenados por hash, precisamente para que alterar uno se note; pero al
  restaurar se guardaban tal cual, sin comprobarlos. Un archivo de copia
  editado a mano podía escribir facturas inventadas con el importe que se
  quisiera. Ahora la cadena se verifica entera antes de restaurar nada, y un
  asiento que no cuadre no llega al disco bajo ningún concepto. Si el libro de
  la copia está dañado, la aplicación te lo dice y te ofrece recuperar todo lo
  demás —contactos, encargos, facturas— dejando el libro vacío, en vez de
  dejarte sin poder restaurar nada.
- **Una restauración que falla a medias ya no deja los datos a medias.** Antes
  se vaciaban las tablas y luego se iba fila por fila, saltando las que
  fallaban: el resultado era "restaurado" con un recuento de errores al lado, y
  una base de datos incompleta. Ahora la restauración es una sola operación —
  entra entera o no entra nada— y si algo falla te dice qué fila fue, con tus
  datos intactos.
- **El servidor local solo atiende a quien pregunta por 127.0.0.1.** Gestrics
  levanta un servidor en tu equipo para que la propia aplicación hable con él.
  Aunque solo escuchaba en local, una web abierta en el navegador podía
  alcanzarlo haciendo que su dominio apuntara a tu propio equipo, y leer desde
  ahí tus contactos, tus facturas y tus claves guardadas. Ahora se comprueba
  con qué nombre se ha llamado y se rechaza cualquiera que no sea el tuyo.
- **La fecha de la última validación de la licencia se guarda cifrada.** De ella
  cuelga el margen de 7 días que la aplicación concede sin conexión, y estaba en
  claro dentro de `license-config.json`: una fecha en un JSON invitando a
  cambiarla con el Bloc de notas. Ahora va cifrada como el resto, y una fecha
  escrita a mano se descarta en vez de aceptarse. Es el mismo criterio que ya
  se seguía con el registro del periodo de prueba; este archivo se había quedado
  fuera. Si el primer arranque tras actualizar ocurre sin conexión, hará falta
  una comprobación con red para volver a tener margen sin ella.
- **Un contacto importado ya no puede colar una fórmula en tus exportaciones.**
  Excel y LibreOffice ejecutan una celda que empiece por `=`, `+`, `-` o `@`.
  Si importabas una lista de contactos de una agencia y alguno de sus campos
  venía con una fórmula dentro, se guardaba tal cual: al exportar tus
  contactos y abrir el archivo, la fórmula se ejecutaba en tu equipo. Ahora
  esas celdas salen marcadas como texto en los CSV y TSV. Los importes no se
  tocan, así que el CSV para tu asesor sigue sumando igual, y volver a
  importar en Gestrics una exportación propia devuelve el texto original.

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
