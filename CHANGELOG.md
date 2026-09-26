# Changelog

Cambios visibles de Gestrics, versión a versión. Lo que no se nota al usar la
aplicación (refactorizaciones, pruebas, ajustes de compilación) no se recoge
aquí.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y
el versionado es [semántico](https://semver.org/lang/es/).

Versión en inglés: [CHANGELOG.en.md](CHANGELOG.en.md)

---

## [1.1.1] — 2026-09-27

### Añadido

- **El análisis de memoQ se importa, en los cuatro formatos en que memoQ lo
  exporta.** «Importar análisis CAT» lee ahora lo que sale del botón Export de
  sus Estadísticas: el HTML y los tres CSV —el que refleja los resultados en
  pantalla, el de una fila por archivo compatible con Trados y el de una fila
  por archivo con toda la información—. Antes, su CSV se podía elegir pero
  caía entero en una sola columna —memoQ nunca separa con comas—, y su HTML se
  rechazaba con un «esto no lo reconozco como informe de Trados». Las filas llegan ya asignadas a su categoría —101 % y las
  pretraducidas como contexto, las repeticiones, el 100 %, cada banda y las
  que no tienen coincidencia—, y «Fragments» se enseña sin asignar, como
  «Bloqueado» en Trados: que eso se cobre o no lo decide cada cliente. Si el
  archivo trae varios análisis seguidos, se importa el primero y la ventana lo
  dice; si trae varios archivos, se suman, sin contar dos veces la fila de
  totales. Comprobado con el mismo análisis exportado en los cuatro formatos:
  los cuatro dan 249 palabras y el mismo reparto, y de ahí salen 18,10 € a
  0,09 €/palabra, tanto en pantalla como en el presupuesto en PDF.

- **El análisis de Wordfast Pro también se importa, en los cuatro formatos que
  usa un traductor.** «Importar análisis CAT» lee lo que saca su «Export
  report»: su CSV, el CSV compatible con Trados, el HTML y el XLS. Las filas
  llegan ya asignadas —contexto, repeticiones, 100 %, cada banda y las que no
  tienen coincidencia—, y los segmentos «Ignored» se enseñan sin asignar, como
  «Bloqueado» en Trados. Si el informe trae varios archivos, se suman, y su
  tabla de totales no se cuenta además de ellos. Wordfast escribe cinco
  formatos más, pensados para alimentar a otros programas: algunos ni siquiera
  traen las repeticiones o las palabras nuevas, así que no se reconocen y el
  archivo sigue al importador genérico, donde se eligen las columnas a mano.
  Comprobado con informes generados por el propio Wordfast: los cuatro formatos
  dan las mismas 311 palabras y el mismo reparto, y de ahí 22,09 € a
  0,09 €/palabra, tanto en pantalla como en el presupuesto en PDF.
### Cambiado

- **Un proyecto recién creado ya no parece presupuestado.** Hasta ahora nacía
  con «Presupuestado» relleno, como paso cumplido, y pedía el clic en «En
  curso», aunque el presupuesto no hubiera salido todavía. Ahora el paso
  pendiente es el propio «Presupuestado», punteado y sin fondo, y el aviso dice
  «Haz clic en Presupuestado para avanzar»: el presupuesto se edita y se envía
  las veces que haga falta, y el clic, cuando el cliente lo acepta, lleva el
  proyecto a «En curso».
- **El presupuesto tiene su propia tarjeta**, como el encargo y la factura, en
  vez de ir metido en la barra de estado. Sus botones son «Editar»,
  «Descargar» y «Enviar» (o «Reenviar», si ya salió), sin repetir
  «presupuesto» en los tres. Cuando el proyecto avanza, la tarjeta se queda con
  la fecha de envío y la descarga. La tarjeta de Factura sigue el mismo
  criterio: «Editar», «Descargar» y «Enviar».
- **Las fechas llevan el mes en letra**: «26 sept 2026» en español y «Sep 26,
  2026» en inglés, que es la convención de cada idioma (el formato medio de
  CLDR, el que aplican los navegadores). Antes eran numéricas y
  cambiaban de orden al cambiar de idioma (26/9/2026 frente a 9/26/2026), y un
  3/5 no decía si era marzo o mayo. Vale para toda la aplicación —fichas,
  listas, métricas, historial, avisos— y para los PDF de factura y presupuesto,
  que siguen en inglés: «26 Sep 2026», o «Sep 26, 2026» con la interfaz en
  inglés.
- **Un calendario propio para elegir fechas**, en los siete campos de fecha de
  la aplicación. El de Windows/Chromium enseñaba la fecha en el formato del
  idioma de Windows, no del de la aplicación, y su rueda desplazaba las
  semanas sin cambiar el mes del título. Ahora la rueda pasa de mes, los días
  del mes anterior y del siguiente salen en gris, y hay botón «Hoy» (y
  «Borrar» donde la fecha es opcional). Con el teclado: flechas para moverse,
  RePág/AvPág para cambiar de mes, Intro para elegir y Esc para cerrar.
- **«Enviar entregables» se bloquea mientras el presupuesto no está
  aceptado**, igual que «Crear factura» antes de entregar, y dice qué falta:
  «Marca Presupuestado antes de enviar entregables».
- **Los botones de confirmar envío dicen solo «Enviar»** en los diálogos de
  entregables, factura y presupuesto; el título del diálogo ya dice qué se
  envía.
- **El aviso bajo los tipos de impuesto de la factura explica qué son los
  botones** (el tipo general de tu país y el 0 % que suele corresponder a un
  cliente de otro país) y qué hacer si toca otro, en vez de un «tipos
  orientativos» que no aclaraba nada.
- En inglés, **«Encargo» se traduce ahora «Assignment»** en vez de «Job», en la
  ficha y en todos los mensajes.

- **«Nuevo contacto» ya no es una pestaña, es un botón.** La cabecera del
  panel de Prospección tenía dos pestañas, «Contactos» y «Nuevo contacto», y
  la segunda no llevaba a ninguna parte: abría el formulario de alta. Un botón
  de acción disfrazado de navegación, que además dejaba «Contactos» pintada
  como pulsable estando ya encima de ella. Ahora funciona como Proyectos:
  arriba queda el título de la sección —«Contactos», «Nuevo contacto» o
  «Editar contacto», según lo que haya debajo, y sin nada que pulsar— y el
  alta es un botón al pie de la lista. El formulario gana un «Cancelar» junto
  a su botón de guardar, que es la salida que antes daba la pestaña, y sus
  etiquetas —«Nombre», «Empresa»…— dejan de salir centradas sobre unos campos
  que van a la izquierda.
- **La lista vacía vuelve a decir solo «Sin contactos».** Llevaba debajo una
  pista de tres líneas que nombraba las dos puertas —«Nuevo contacto» e
  «Importar contactos»—. Con el alta convertida en botón al pie de la lista,
  las dos se anuncian solas, y la pista ocupaba la mitad de una caja que ya va
  justa de alto.
- **El buscador de contactos comparte fila con el título, y es una lupa.**
  Tenía una fila entera para él, y la lista se quedaba con 199 de los 652 px
  del panel: cuatro contactos y medio a la vista. Ahora va a la derecha de
  «Contactos» —que se corre a la izquierda hasta caer justo debajo de la «T»
  de «Todos los estados»— y el texto «Buscar contacto…» se sustituye por una
  lupa pegada al borde derecho, como en el explorador de Windows; mientras
  hay algo escrito, la equis de borrar ocupa su sitio. La lista pasa de 199 a
  262 px: **de 4,6 a 6,2 contactos a la vista** sin desplazar. Con el
  formulario de alta abierto el buscador no se pinta, porque no hay lista que
  filtrar.
- **El buscador de Proyectos, igual.** Mismas medidas que el de Prospección
  —campo de 12,5 px en una fila de 52, en vez de 13 en una de 62— y la misma
  lupa en lugar del texto «Buscar proyecto o cliente…». Estrena además la
  equis de borrar, que allí no había. Y el mismo orden: el filtro de estado
  arriba y el buscador debajo, como en Prospección, para que la cabecera del
  panel sea la misma en las dos vistas.
- **El soporte se muda del perfil del traductor a Configuración.** Estaba al
  final del perfil, entre el IBAN y las tarifas CAT: un apartado que no se
  configura, en la pantalla donde se rellenan los datos que salen impresos en
  la factura. Ahora cierra el bloque de mantenimiento, junto a la copia de
  seguridad, la guía de inicio y el diagnóstico, que es lo que se mira cuando
  algo no va.
- **Los títulos de Configuración van todos a la izquierda.** Los once salían
  centrados, y los más largos —«Contraseña de aplicación», con su aviso al
  lado— parecían alineados de otra forma sólo por ocupar más ancho. Los dos
  botones de la copia de seguridad, en cambio, sí estaban descolgados a la
  izquierda y ahora van centrados como los demás.
- **La copia de seguridad se va del panel a Configuración.** Estaba en una
  barra plegable al pie de Prospección, donde gastaba 50 px de alto para algo
  que se hace una vez al mes y donde no la encontraba nadie que estuviera en
  Proyectos. Ahora vive junto a la guía de inicio y el diagnóstico, con los
  dos botones y —esto es lo que no se podía perder— el aviso de cuánto hace
  de la última, que el menú Archivo no sabe dar. Con el hueco que deja, la
  lista de contactos llega a **7,4 contactos a la vista**.
- **El formulario de un proyecto nuevo ya no explica de dónde salen los
  clientes.** La pista «Los clientes son tus contactos de Prospección…»
  aparecía bajo el desplegable con la lista vacía; se retira.
- **«Sin proyectos» se ve como «Sin contactos».** Era una línea de texto más
  pequeña y sin nada alrededor; ahora lleva encima el icono de carpeta
  abierta —el de proyecto en toda esa vista— y el mismo tamaño de letra que
  su equivalente de Prospección. El icono cambia según el motivo del hueco:
  la carpeta cuando no hay ningún proyecto creado, la lupa cuando los hay
  pero el buscador o el filtro no encuentran ninguno.
- **El intervalo entre envíos se queda sólo en Configuración.** El panel de
  Prospección tenía un campo gemelo del que ya estaba allí —mismo ajuste,
  mismo rango de 3 a 300 segundos—, gastando alto permanente para un número
  que se pone una vez. Sumado a todo lo anterior, la lista de contactos pasa
  de los **4,6 contactos a la vista** con los que empezó la versión a **8,3**,
  sin quitar ninguna función del panel.

### Corregido

- **Un CSV con punto y coma ya no se lee como una sola columna.** Excel en
  español y en francés exporta «CSV delimitado por punto y coma», y las
  estadísticas de memoQ solo se exportan con punto y coma o con tabulador. La
  aplicación leía todo como si fuera coma, así que el archivo entero caía en
  una columna: al importar contactos salía una cabecera larguísima y ninguna
  otra, y al importar un análisis no se reconocía ninguna categoría. Ahora el
  separador se decide leyendo el propio archivo, sin mirar la extensión, y una
  coma dentro de «"Dupont, Marie"» sigue siendo parte del nombre.

- **«Archivo → Importar copia de seguridad…» no hacía nada.** No ha
  funcionado nunca desde que existe, y por dos motivos a la vez. Apuntaba al
  selector de archivos de «Importar contactos», así que habría pedido un CSV
  o un Excel y lo elegido se habría leído como una lista de contactos; y
  aunque hubiera apuntado al suyo, tampoco habría abierto ninguna ventana,
  porque el navegador que hay dentro de la aplicación sólo abre un selector
  de archivos cuando lo pide un clic del usuario, y una orden del menú no
  cuenta como tal. Ahora la ventana de elegir archivo la abre la propia
  aplicación, por fuera de esa regla, y la restauración sigue su curso
  normal: confirmación incluida.
- **El análisis de Trados se importa de verdad, en cualquiera de sus
  formatos.** «Importar análisis CAT» lee ahora el informe de «Analizar
  archivos» (o el de «Analizar y traducir con GroupShare») tal como lo deja
  Trados: el `.xml` de la carpeta Reports del proyecto y lo que sale de su
  «Guardar como» —XML, Excel, HTML o MHT—; el Excel, el HTML y el MHT, con
  Trados en inglés, alemán, español, francés o italiano. Lo reparte solo: las filas salen con los nombres de Trados, en
  el idioma de la aplicación, y en el mismo orden que en su informe, cada una
  ya asignada a su categoría, y basta con revisarlo y confirmar. Lo que el
  informe no deja claro si se cobra se queda sin asignar, para que lo decidas
  tú: «Bloqueado», las fuzzy internas cuando el total del informe no demuestra
  que van aparte de las demás filas, y las categorías que la tabla de Trados no
  enseña. Si la tabla de una exportación no tiene la forma esperada, la
  importación lo dice y pide el XML en vez de repartirla mal. Antes solo se
  podía elegir el Excel, y se leía mal: empieza por el título y los ajustes
  del análisis, repite cada categoría archivo por archivo —y se sumaban dos
  veces— y, con Trados en francés o en español, no reconocía las palabras
  nuevas. Con un análisis real de 862 palabras, la importación proponía 26;
  ahora, en cualquiera de los cuatro formatos, 862.
- **La tarifa acepta la coma decimal.** Al teclear «0,09» en la tarifa de un
  proyecto, la coma se descartaba sin avisar y quedaba «009»: nueve euros por
  palabra, cien veces más. Ahora la coma vale como punto decimal, y en
  «Palabras origen» un «1.234» con punto de miles son 1234 palabras, no 1,234.
- **Y lo mismo en el resto de campos de cifras.** En el plan de facturación
  recurrente, la coma también se descartaba al teclearla: el importe «150,50»
  quedaba en 15.050 € al mes y «1.500,00» en 1,50 €, y un IVA de «5,5», en
  55 %. Ahora el importe se lee con coma o con punto decimal y con separador de
  miles —«150,50», «1.500,00», «1 500», «1,500.00»—, un «1.500» son mil
  quinientos, y debajo del campo se ve el importe tal como se va a facturar; lo
  que no se puede leer sin adivinar, como «150 50», lo avisa y no deja guardar.
  El importe de un gasto se lee igual y enseña junto al botón cómo se va a
  guardar: era un campo numérico del navegador, que nunca toma el punto como
  separador de miles y que acepta la coma o no según el idioma de Windows. Los
  tipos de IVA y de retención al emitir o rectificar una factura y los pesos
  del tarifario CAT eran campos de esa misma clase, y ahora todos los
  porcentajes aceptan la coma con cualquier Windows —«5,5»—, también pegados
  con su «%». Y en el registro manual de horas, «1,5» era una hora y se perdía
  la media hora: ahora es hora y media, y también valen «1:30» y «1h30».
- **Un PDF ya no abre el importador como si fuera una hoja de cálculo.** El
  selector de archivos deja elegir «Todos los archivos», y el PDF del análisis
  que suelen mandar las agencias abría el mapeo de columnas con el contenido
  interno del PDF como cabecera; en «Importar contactos» pasaba lo mismo con un
  vCard. Ahora cada importación solo lee los formatos que ofrece su selector, y
  lo demás da un aviso que dice cuáles valen.
- **Con una ventana abierta, el teclado ya no llega a lo que queda detrás.**
  Las ventanas de la aplicación dejaban salir el foco: pulsando Tab desde
  «Importar análisis CAT», o desde los términos de uso del primer arranque, se
  llegaba a los botones de la cabecera, detrás del velo, y desde ahí se podía
  usar la página entera con la ventana todavía abierta. Si se volvía a pulsar
  «Importar contactos» o «Importar análisis CAT», el archivo nuevo se quedaba
  además con el mapeo de columnas —o la asignación de filas— del anterior, que
  caía desplazado sobre él sin avisar. Ahora el foco entra en la ventana al
  abrirse, Tab y Mayús+Tab dan la vuelta dentro sin salir, y al cerrarla vuelve
  al botón desde el que se abrió; y cada archivo importado abre su ventana de
  cero. Escape, además, cierra solo la ventana de encima: si al enviar los
  entregables sin adjuntos se pulsaba Escape en la pregunta de confirmación, se
  cerraban las dos y se perdía el correo que se estaba escribiendo.
- **Y el menú tampoco actúa por detrás de una ventana abierta.** «Nuevo
  contacto», «Nuevo proyecto», las dos copias de seguridad y «Ver guía de
  inicio» funcionaban con una ventana delante: Ctrl+N cambiaba de vista sin que
  se viera, e «Importar copia de seguridad…» llegaba a restaurar la base entera
  con un correo a medio escribir encima. Ahora se ven en gris mientras haya una
  ventana abierta, como hace Windows con el menú de una ventana que tiene un
  diálogo delante, y vuelven en cuanto se cierra. Copiar, pegar, el zoom y
  salir siguen disponibles: hacen falta dentro de la ventana.
- **Los selectores de idioma, los «omitir» y los enlaces del análisis CAT
  responden al teclado.** El «ES | EN» de la cabecera y el de los términos de
  uso del primer arranque, los «Omitir paso» y «Omitir recorrido» de la guía de
  inicio, y el «Reemplazar análisis» y «Quitar análisis» del formulario de
  proyecto solo respondían al ratón: Tab se los saltaba, e Intro y Espacio no
  hacían nada. En los términos, que no se cierran sin aceptarlos y ya no dejan
  salir el foco, quien usa el teclado se quedaba sin forma de cambiar de idioma
  antes de leerlos. Ahora Tab llega a todos, con el anillo de foco del
  navegador, e Intro o Espacio los accionan; se ven igual que antes. Los
  lectores de pantalla, además, saben cuál es el idioma activo.
- **La tabla del desglose CAT ya no dice un céntimo más que el importe del
  proyecto.** Sumaba los importes de cada categoría sin redondear, mientras el
  «Importe calculado» y el PDF suman los ya redondeados: con dos categorías
  bastaba para ver 49,73 € en la tabla encima de un importe de 49,72 €. Y sus
  palabras salen ahora con el formato del idioma de la aplicación: tomaban el
  del sistema, así que con el sistema en otro idioma no casaban con los
  importes de al lado.
- **Un nombre con «$» o con llaves ya no descoloca los mensajes que lo llevan
  dentro**, como la confirmación de borrar un contacto o de enviarle un correo,
  la de generar una factura recurrente o el resumen de un análisis de Trados.
  Pasaban el nombre por una sustitución que interpreta ciertas combinaciones
  con «$»: «Libro de $'final» duplicaba el resto de la frase y dejaba un
  `{language}` a la vista, y «$$» se quedaba en un solo «$». Y los huecos se
  rellenaban de uno en uno, así que un contacto llamado «Ana {email}» se
  llevaba el email dentro del nombre y el hueco de verdad quedaba a la vista.
  Ahora el nombre se copia tal cual. Los correos a los clientes no estaban
  afectados: rellenan sus variables por otro camino.
- **Los avisos de la campana y las carpetas de cliente responden al teclado.**
  Cada aviso del desplegable de la campana y cada fila de cliente del árbol de
  proyectos servían solo con el ratón: el tabulador pasaba de largo y ni Intro
  ni Espacio hacían nada, así que sin ratón no había forma de abrir un aviso
  ni de plegar un cliente. Ahora entran en el recorrido del tabulador, se
  accionan con Intro y con Espacio, y al tabular se ve un recuadro alrededor
  del que tiene el foco. El aviso de una factura recurrente que se está
  generando se queda fuera del recorrido mientras dura, igual que ya estaba
  fuera del alcance del ratón. Y un lector de pantalla anuncia cada carpeta
  como «Cliente NOMBRE, N proyectos», en vez de leer de corrido todo lo que
  hay en la fila. Nada de lo que se ve cambia.
- **La primera pulsación sobre una carpeta de cliente ya no se pierde.** En el
  árbol de proyectos hacían falta dos clics para plegar un cliente que nadie
  hubiera tocado desde que se abrió la aplicación: el primero se descartaba
  sin hacer nada. Ahora pliega a la primera.

## [1.1.0] — 2026-09-21

Primera versión que se lanza de verdad. Sustituye al instalador que se subió el
10 de agosto bajo este mismo número: aquel se generó antes de que existiera el
código de licencias, así que no llevaba la activación que su propia nota de
publicación anunciaba.

### Añadido

- **Barra de menú propia** (Archivo, Editar, Ver, Ventana, Ayuda), con las
  funciones reales de la aplicación en vez de la genérica que trae Electron
  por defecto: nuevo contacto o proyecto, exportar e importar copia de
  seguridad, comprobar actualizaciones, volver a ver la guía de inicio,
  descargar el registro técnico, términos de uso y contacto de soporte. En
  español o en inglés según el idioma elegido en la aplicación.
- **Aviso de versión nueva.** La aplicación comprueba al arrancar si hay una
  versión posterior publicada y, si la hay, lo dice en una franja bajo la
  cabecera con el enlace de descarga. No descarga ni instala nada por su
  cuenta. "Ahora no" silencia esa versión concreta, así que el aviso vuelve
  cuando se publique la siguiente. Sin conexión, la franja simplemente no
  aparece.
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
- **Gestrics ya se descarga también para Mac.** Un solo instalador que vale
  para Apple Silicon y para Intel, sin tener que saber cuál llevas. Va sin
  firma de desarrollador, así que la primera vez macOS se niega a abrirlo y
  hay que autorizarlo en Ajustes del Sistema → Privacidad y seguridad; la web
  lo explica junto al botón de descarga.

### Cambiado

- **El total aproximado de Métricas ya convierte 24 divisas, no cuatro.** Solo
  se pedían tipos de cambio para dólar, libra, franco suizo y dólar canadiense,
  así que facturar en coronas suecas, pesos mexicanos o yenes dejaba ese dinero
  fuera del total consolidado. Ahora se piden para todas las del desplegable
  que publica el Banco Central Europeo. Las cuatro que no publica —peso
  argentino, peso chileno, peso colombiano y dírham— siguen quedando fuera, y
  la pantalla las enumera en vez de callárselo.
- **El desplegable de divisa deja de tener 159 monedas.** Para llegar al euro
  había que pasar por el afgani afgano, el kwanza angoleño y el manat
  azerbaiyano. Quedan 28, las que un traductor con clientes internacionales
  puede cobrar de verdad. Un proyecto ya guardado en cualquier otra la
  conserva: sigue apareciendo en su propio desplegable, así que abrirlo y
  guardarlo no le cambia la divisa.
- **Se acabó el «follow-up» en la interfaz en español**, que convivía con
  «seguimiento» en la misma pantalla: el estado del contacto, la plantilla, el
  botón del envío en lote y el tipo de entrada del historial dicen ahora todos
  «seguimiento». Los envíos ya registrados se ven con la palabra nueva sin
  tener que hacer nada. En inglés no cambia: allí «follow-up» es el término
  correcto, no un anglicismo.
- **Botones con nombres más cortos.** Los dos «Mostrar clave» de Configuración
  pasan a «Mostrar»; el de Stripe, a «Conectar», que hace pareja con el
  «Desconectar» de al lado; «Desactivar este equipo» a «Desactivar»; y el de la
  guía de inicio dice ya qué abre: «Abrir guía de inicio».

- **La política de privacidad enumera también la comprobación de versión.**
  Es la cuarta conexión que hace la aplicación, junto al servidor de correo,
  Keygen y los tipos de cambio, y esa lista está para ser completa. No se
  envía ningún dato —es una petición de lectura de un archivo estático—, pero
  ahora lo dice. Al ser un cambio de la lista de tratamientos, la aplicación
  vuelve a pedir que se acepten los textos legales la próxima vez que se abre.

- **La moneda principal se elige por su nombre, no por sus siglas.** El campo
  del perfil enseña «Euro» o «Dólar estadounidense», con el código en el
  tooltip, y la lista va ordenada alfabéticamente por ese nombre. Los
  desplegables de divisa de un proyecto siguen con el código: van en línea y
  estrechos, y ahí un nombre largo no cabe.
- **El inglés de la aplicación deja de ser una traducción literal del
  español.** Auditoría de los 867 pares leídos uno a uno: se quitaron los
  calcos («E.g.:» donde va «e.g.», rayas españolas, órdenes de frase copiados)
  y se unificaron los términos que tenían varias formas a la vez — «encargo»
  era "job" doce veces y "assignment" una, y «factura rectificativa» llegó a
  tener tres ingleses distintos, uno de ellos ("credit note") otro documento
  diferente.
- **El botón «Enviar encargo» pasa a llamarse «Enviar entregables».** Abría un
  diálogo titulado «Enviar entregables», y lo que se manda son los archivos,
  no el encargo.

- **Los términos de uso ya no afirman que la factura cumpla el Real Decreto
  1007/2023.** El apartado de facturación decía que, con el perfil España, la
  aplicación genera documentos «siguiendo, en modalidad "No Veri*Factu", los
  requisitos técnicos» de esa norma. No era exacto: el registro encadenado por
  hash que lleva la aplicación es una medida propia de trazabilidad, y ni el
  código QR ni la huella siguen el formato que exige la Orden HAC/1177/2024.
  El texto explica ahora lo que de verdad hace y dice de forma expresa lo que
  todavía no cumple, para que nadie se apoye en ello ante su asesoría.
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

- **La dirección de soporte pasa a ser `contact@outreachstudio.app`.**
  Sustituye a `soporte@`, y es la que sale en el perfil del traductor, en la
  pantalla de servidor no disponible, en la de recuperación tras un error, en
  la de activación de licencia y en la línea que pide adjuntar el registro de
  envíos. Sale de una sola constante, así que las cinco cambian a la vez; la
  web la anuncia igual.

### Corregido

**Copia de seguridad**

- **Restaurar una copia perdía once columnas por el camino, sin decir nada.** La
  restauración escribe cada tabla nombrando sus columnas una a una, y las que se
  habían añadido después nunca se añadieron ahí. Se perdían, entre otras: la
  identidad del emisor congelada al facturar —con lo que una factura vieja
  volvía a tomar tus datos de HOY—, el país fiscal con el que se emitió, la
  fecha de operación, el estado de los recordatorios de cobro —tu cliente
  recibía otra vez la reclamación entera de una factura que quizá ya había
  pagado—, el enlace de pago de Stripe, y el marcador de entregable ya enviado.
  El más silencioso: el periodo de una factura recurrente, que es lo que impide
  facturar dos veces el mismo mes; sin él, restaurar bastaba para emitir la
  mensualidad por duplicado. Ahora la copia devuelve exactamente lo que guardó,
  y hay una comprobación que lo verifica exportando, restaurando y comparando.

**Facturas y presupuestos**

- **La ficha de un plan recurrente decía "Palabras origen 1" y "320,00 EUR/pal".**
  Una cuota mensual no se cobra ni por palabras ni por horas, pero por dentro se
  guarda como una palabra a una "tarifa" igual a la cuota, y eso se enseñaba en
  crudo en todos los retainers. La factura en PDF ya lo resolvía; ahora la ficha
  también, con la cuota y su etiqueta.

- **El presupuesto ya no desaparece al avanzar el encargo.** En cuanto el
  proyecto pasaba de "Presupuestado", el PDF que el cliente tiene delante dejaba
  de poder descargarse: para recuperarlo había que devolver el proyecto a su
  estado anterior. Ahora queda su botón de descarga, sin las opciones de editar
  ni reenviar, que ahí ya no tienen sentido.

- **Un encargo podía cobrar un céntimo distinto del que sumaban sus propias
  líneas.** Con desglose CAT, el total se calculaba sumando los importes en
  crudo y redondeando al final, mientras que el PDF imprime una fila por
  categoría ya redondeada: con una tarifa de 0,11 €, las cinco filas suman
  145,69 € y el total decía 145,70 €. Lo mismo por horas, donde salen medios
  céntimos de verdad: un cuarto de hora a 32,50 €/h son 8,125 €, un importe que
  en dinero no existe, y se guardaba así cada vez que parabas el cronómetro.
  Ahora el total es siempre la suma de lo que se ve impreso, y todo importe
  CALCULADO por la aplicación —palabras por tarifa, horas por tarifa, desglose
  CAT— se redondea al céntimo antes de guardarse.

- **El libro de facturas archivaba un número que su propia firma no
  respaldaba.** La base imponible entraba en el registro encadenado tal cual
  salía de multiplicar palabras por tarifa —1.480 × 0,14 da 207,20000000000002
  en coma flotante—, mientras que el hash que sella ese asiento se calcula
  sobre la cifra ya redondeada. Nada de esto se veía en pantalla ni en el PDF,
  que siempre formatearon bien, pero quien leyera la base de datos por su
  cuenta —una revisión, una exportación futura— se encontraba el valor sucio, y
  base + cuota no cuadraba con el total guardado.

- **Un presupuesto ya enviado se veía exactamente igual que uno sin enviar.** La
  ficha seguía diciendo «Envía el presupuesto al cliente o edítalo antes de
  enviarlo» aunque hubiera salido semanas atrás: el único sitio que lo sabía era
  el contador «Presupuestos» de la cabecera, así que era fácil mandarle dos
  veces lo mismo al cliente. Ahora la ficha dice el día en que se envió y el
  botón pasa a «Reenviar presupuesto».

- **Un plan de facturación recurrente recién creado no aparecía en Avisos hasta
  reiniciar.** El propio diálogo te dice que la generación se confirma desde
  Avisos; ibas allí siguiendo esa instrucción y estaba vacío. Ahora aparece —y
  desaparece al borrar el plan— sin reiniciar nada.

- **El motivo de una rectificación se imprime en la factura que recibe el
  cliente, y el texto de ayuda no lo decía.** Decía solo «queda registrado
  junto a la rectificación», que se lee como una nota interna de archivo. Ahora
  avisa de que se imprime en el documento del cliente y de que conviene
  escribirlo en inglés, como el resto de la factura.

- **Una factura recurrente se emitía sin que aparecieran ni el proyecto ni la
  factura.** Al confirmarla desde Avisos estando ya en la pestaña de Proyectos,
  la aplicación avisaba de que la había generado y la lista no cambiaba: el
  proyecto nuevo y su factura —ya asentada en el libro, con su número— no se
  veían por ninguna parte hasta reiniciar la aplicación. Venía de que la lista
  solo se recargaba al cambiar de pestaña, así que fallaba justo en el camino
  más probable: estar mirando tus proyectos y confirmar el aviso. Ahora se
  actualiza sola y se abre la ficha del proyecto nuevo, que era lo que
  pretendía hacer desde el principio.

- **Una de cada diez facturas no sumaba su propio total.** El IVA y la retención
  se redondean al céntimo, pero el total se calculaba sobre los decimales
  completos, así que el bloque de totales podía contradecirse: con una base de
  50,03 €, la factura decía 50,03 + 10,51 − 7,50 y un TOTAL de **53,03** en vez
  de 53,04. Barriendo las bases entre 50 y 10.000 € con los tipos habituales,
  descuadraban 1.160.062 de 11.940.012 combinaciones. Ahora cada importe se
  redondea a la unidad mínima de su divisa —el yen no tiene céntimos, el dinar
  kuwaití tiene tres— y el total es la suma de esas cifras, que es lo que se
  paga.

- **Las líneas del desglose CAT no sumaban su propio total.** Cada línea se
  redondeaba por separado y el total salía de los importes exactos, así que la
  suma de lo impreso podía separarse un céntimo de la cifra de abajo: con una
  tarifa de 0,0333 €/palabra, cuatro líneas sumaban 43,92 € y el total decía
  43,91 €. En el presupuesto invita a una consulta del cliente; en la factura el
  descuadre iba contra la **base imponible**, que es justo lo que esas líneas
  sirven para determinar. Ahora la diferencia se reparte sobre la línea de mayor
  importe y el documento cuadra consigo mismo.

- **Una factura sin fecha de emisión desaparecía del CSV contable.** Se
  descartaba incluso al exportarlo todo sin acotar fechas, así que una factura
  emitida podía no llegar nunca a tu asesoría sin que nada lo dijera. Ahora sale
  en el listado completo, con la fecha en blanco para que se vea que hay algo que
  corregir; en la exportación de un trimestre sigue sin salir, porque sin fecha
  no se puede asignar a un periodo.

- **Un nombre de cliente en hindi (o cualquier alfabeto índico) salía en
  cuadraditos.** La fuente de respaldo que debía cubrirlos estaba buscada con un
  nombre de archivo que no existe en Windows, así que nunca se usaba. Ya se
  imprime bien, y el aviso interno que denunciaba los caracteres perdidos —que sí
  funcionaba— deja de saltar.

- **Aviso nuevo al emitir a un cliente con datos en árabe o hebreo.** El PDF
  imprime esas letras del revés y sin unir, porque no compone texto de derecha a
  izquierda. Como el nombre del destinatario es obligatorio en la factura, ahora
  el diálogo lo advierte antes de emitir en vez de dejarte descubrirlo en el
  documento ya enviado.

- **Un país escrito sin tildes dejaba la factura sin su mención obligatoria.**
  El desplegable de la ficha guarda nombres canónicos, pero al **importar
  contactos** desde una hoja de cálculo se guarda lo que traiga el archivo:
  «Espana», «Belgica», «Paises Bajos», «Deutschland», «Holanda», «USA»… Ninguno
  se reconocía, y un país que no se reconoce hacía que la aplicación no
  imprimiera la mención de inversión del sujeto pasivo en una factura
  intracomunitaria. Ahora los acentos, los puntos y los endónimos más corrientes
  se resuelven igual. Y cuando el país sigue sin reconocerse, el diálogo de
  emisión **avisa antes de emitir** en vez de callar.

- **Editar una factura ya cobrada le borraba la fecha de cobro.** Bastaba con
  abrir la factura y volver a guardar, aunque no cambiaras nada: el diálogo no
  envía la fecha de cobro, y el servidor la ponía a vacío igualmente. A partir de
  ahí, el CSV para tu asesoría declaraba esa factura como **pendiente** y con la
  columna de fecha de cobro vacía, desaparecía de «Cobrado» y del tiempo medio de
  cobro en Métricas, y la ficha volvía a ofrecerte generar un enlace de pago para
  algo que tu cliente ya había pagado.

- **El vencimiento por defecto contaba desde hoy, no desde la fecha de la
  factura.** Una factura con fecha anterior salía diciendo «30 días» y venciendo
  a 47. Además, la suma se hacía en horas: el día en que acaba el horario de
  verano dura 25, así que el plazo caía en la víspera. Ahora son 30 días desde la
  fecha de la factura, contados en días.

- **Las fechas se corrían un día si no trabajas en el huso de Madrid.** Una
  fecha guardada como `2026-08-20` se interpretaba como medianoche UTC, así que
  en México, Estados Unidos, Brasil, Chile, Colombia, Perú, Argentina o Canadá
  se veía y se imprimía como el 19. Afectaba a todo a la vez: la fecha de
  expedición y el vencimiento de la factura, la validez del presupuesto, la
  fecha de operación, y cada fecha de la interfaz. Al escribir fallaba en el
  sentido contrario —se usaba el día UTC—, de modo que facturar por la tarde en
  México emitía con la **fecha del día siguiente**, y esa fecha queda congelada
  en el libro de facturas. Los avisos también iban corridos: una factura
  aparecía como vencida el mismo día de su vencimiento, y el **recordatorio de
  cobro le llegaba al cliente un día antes de tocar**.

- **Se podía emitir una factura sin tus propios datos fiscales.** Hasta ahora
  el identificador fiscal y el domicilio eran campos opcionales de
  Configuración, así que una instalación recién estrenada podía generar una
  factura cuyo emisor era solo un nombre. Una factura así no es válida en
  ningún país. Ahora la aplicación se niega a emitirla y dice exactamente qué
  campos faltan y dónde rellenarlos; la factura rechazada no consume número ni
  deja rastro. Los datos del cliente no se bloquean —su identificador fiscal no
  siempre es obligatorio, y exigirlo impediría facturar a un particular—, pero
  el diálogo de emisión avisa si faltan y explica cuándo importan.

- **Corregir una factura ya emitida dejaba circulando dos documentos con el
  mismo número.** Al cambiar el IVA o la retención de una factura enviada, la
  aplicación pedía un motivo y anotaba la rectificación en su libro interno,
  pero el PDF seguía saliendo con el número y la fecha originales y los
  importes nuevos: el cliente acababa con dos papeles distintos que decían ser
  la factura 2026-001. El código QR, que sí leía el asiento correcto, además
  contradecía a la cabecera impresa justo encima. Ahora el documento se emite
  como lo que es — «RECTIFICATIVE INVOICE #R-2026-001», con su propia fecha, la
  factura que corrige, el motivo y el importe rectificado — y el QR concuerda
  con la cabecera. La ficha del proyecto y el archivo adjunto al correo usan
  también ese número.

- **La factura decía dos cosas distintas sobre cuándo hay que pagarla, y
  ninguna era la tuya.** Arriba a la derecha ponía «Payment due: 30 days end of
  month» y a media página «Payment due upon receipt»: las dos frases estaban
  escritas a fuego y se contradecían, mientras que la fecha de vencimiento que
  tú habías elegido al emitir no se imprimía en ninguna parte. Ahora la factura
  muestra esa fecha real, junto a la de emisión. Si la dejas en blanco no se
  imprime nada, en vez de inventar un plazo.
- **Las «Notas en factura» no salían en la factura.** El diálogo de emisión pide
  ese texto con esa misma etiqueta y sugiere usarlo para el número de cuenta o
  las condiciones de pago; luego se guardaba y no aparecía nunca en el
  documento. Ahora se imprime bajo las condiciones de pago, con su propia página
  si hace falta y sin recortarlo — es el sitio donde se escribe una mención
  legal, como la inversión del sujeto pasivo de una factura intracomunitaria.
- **Cambiar tus datos reescribía las facturas ya enviadas.** El nombre, el
  identificador fiscal, la dirección y los datos bancarios del emisor se leían
  de Configuración cada vez que se descargaba un PDF, no de lo que había al
  emitir. Mudarte, corregir una errata o pasar de autónomo a sociedad cambiaba
  quién figuraba como emisor en **todas** las facturas anteriores, incluidas las
  que el cliente ya tenía. Ahora esa identidad queda congelada en la factura, y
  el QR también deja de atribuir una factura antigua a un identificador nuevo.
  Las facturas emitidas antes de este cambio siguen comportándose como hasta
  ahora, porque no tienen nada congelado que mostrar.

- **El nombre de un cliente extranjero se destruía en el PDF.** Los dos
  documentos se generaban con las fuentes estándar del formato PDF, que solo
  cubren el alfabeto latino occidental. Cualquier otro carácter salía como
  basura, sin ningún aviso: una agencia polaca llamada «Biuro Tłumaczeń
  Sp. z o.o.» aparecía impresa como «Biuro T'VÖ7eB7.». Lo mismo
  con el checo, el turco, el rumano, el griego, el cirílico, el japonés, el
  chino y el coreano — y el nombre del destinatario es un dato obligatorio de
  la factura. Solo se libraban los acentos españoles y el símbolo del euro, por
  lo que facturando dentro de España no se veía nunca. Ahora los dos documentos
  incrustan una fuente completa, con respaldo automático para los alfabetos que
  esa fuente no cubra, y lo que ninguna fuente instalada sepa representar queda
  anotado en el registro de la aplicación en vez de desaparecer sin más.

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

- **Un plan recurrente podía saltarse su primer mes, y nadie lo reclamaba.** La
  fecha de alta del plan se guarda en horario universal, pero se leía como si
  fuera la hora local del traductor. Para quien trabaja al oeste de Greenwich,
  un plan creado a primera hora del día 1 quedaba registrado como del mes
  siguiente: esa mensualidad no salía nunca en los periodos pendientes, el plan
  se daba por al día y el retainer se quedaba sin facturar sin ningún aviso. En
  España el fallo no se veía, porque allí las dos lecturas coinciden.

- **El aviso de facturación electrónica cambiaba de texto un día antes o
  después de tiempo.** La fecha en que empieza a obligar el mandato de cada país
  se comparaba contra el día universal en vez de contra el del calendario local,
  así que el aviso podía adelantarse o retrasarse una jornada según el huso.

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

- **La pestaña tumbaba la aplicación entera.** Al entrar en Métricas, la
  ventana se sustituía por la pantalla de «Error inesperado», con el mensaje al
  pie: "Cannot access 'expenseForm' before initialization" —en la copia
  instalada, minificado, "Cannot access 'M' before initialization", que no dice
  nada a nadie—. Recargar devolvía la aplicación, pero volver a entrar en
  Métricas la tumbaba otra vez. Lo causó el mismo cambio que acortó
  el desplegable de divisa a 28 monedas, de esta misma versión: para que un
  gasto guardado en una divisa poco corriente conserve la suya, la lista pasó a
  mirar la divisa del gasto en edición, y aquí la miraba antes de que existiera.
  De los cuatro desplegables de divisa que se tocaron, este era el único con el
  fallo. La pestaña vuelve a abrirse, y editar un gasto en una divisa de fuera
  de la lista —un bat tailandés, por ejemplo— sigue conservando su opción.

- La cabecera se derramaba al haber varias divisas: el importe se salía de su
  celda y pisaba la etiqueta de al lado.
- La tarjeta "Beneficio neto" se estiraba a todo el ancho al bajar de fila, y
  dejaba de parecer una tarjeta más.
- La tabla de tarifa media enseñaba filas que parecían repetidas —dos
  "Técnico", dos "EN-ES"—. No lo eran: se agrupa por etiqueta, divisa y unidad,
  porque promediar 0,15 € con 0,18 $ no significaría nada. Ahora cada fila dice
  qué la distingue de sus hermanas.

**Prospección**

- **Los espacios sobrantes solo se limpiaban del correo.** Un nombre o una
  empresa pegados desde LinkedIn o desde una hoja de cálculo se guardaban con
  los espacios de delante y de detrás, y de ahí salían a dos sitios que ve el
  cliente: la primera línea del email en frío («Hi␣␣␣␣Marie Dupont␣␣␣,») y el
  bloque de cliente de la factura. Ahora se limpian todos los campos, y lo que
  queda en blanco se guarda vacío de verdad.
- **Cambiar el correo de un contacto borraba su historial sin preguntar.**
  Corregir una errata del dominio se llevaba por delante los envíos
  registrados, las fechas de contacto y el contador de seguimientos, y devolvía
  el contacto a «Pendiente»; el aviso aparecía después, ya hecho. Ahora se
  pregunta antes, diciendo cuántos envíos se van a perder, y solo cuando hay
  algo que perder. Cancelar no guarda nada y deja el formulario como estaba.
- **Un nombre de solo espacios** pasaba el formulario y volvía del servidor
  como «error al guardar el contacto», como si hubiera fallado la aplicación en
  vez de faltar un dato.
- **Guardar un contacto podía dejarlo sin nombre o con un correo imposible.**
  La comprobación existía al crearlo pero no al editarlo, y editar un contacto
  ya borrado decía que se había guardado.
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
- **Pulsar Enter al final de una plantilla no hacía nada, y lo siguiente que
  escribías aparecía pegado a la firma.** Añadir una posdata o un enlace
  debajo de «Un saludo, [Tu nombre]» era imposible: la línea nueva no llegaba
  a dibujarse, así que el cursor volvía a la anterior. Además dejaba un salto
  de línea invisible al final del texto guardado, que se iba con el correo.
- **El Asunto no avisaba de las llaves que no son variables reales.** Escribir
  algo como `{{tarifa}}` ahí no daba ningún aviso —el cuerpo de la plantilla
  sí lo daba— y aun así paraba el envío al pulsar enviar, marcando el contacto
  en rojo. El aviso sale ahora junto al campo que lo provoca, sea el asunto o
  el cuerpo.
- **Un envío en lote con una de esas llaves marcaba en error a todos los
  contactos de la tanda**, uno por uno, por un problema que es de la plantilla
  y no de ninguno de ellos. Ahora se avisa antes de empezar y los contactos se
  quedan como estaban, igual que ya pasaba al faltar el asunto, la cuenta de
  correo o el contenido de un adjunto.
- **Un contacto sin empresa se marcaba en error si la plantilla usaba esa
  etiqueta**, con un aviso que mandaba a revisar la plantilla — cuando la
  plantilla estaba bien y lo que faltaba era un dato suyo. La empresa es
  opcional, pero era el único de los cuatro campos del contacto que se trataba
  como obligatorio al enviar. Y como los contactos en error vuelven a entrar
  en la tanda siguiente, volvía a fallar cada vez. Ahora sale en blanco, como
  ya hacían especialidad e idiomas, y antes de empezar un lote se dice a
  cuántos contactos les falta algún dato que la plantilla usa, para poder
  cancelar y rellenarlo. Lo mismo pasaba en los correos de Proyectos
  —recordatorio de cobro, presupuesto y entrega—, que además ahora aceptan las
  cinco etiquetas de contacto y no solo dos.
- **Deshacer después de insertar una etiqueta borraba otra cosa.** La etiqueta
  se metía por una vía que el navegador no apunta en su historial, así que
  Ctrl+Z se la saltaba y deshacía la edición anterior: desaparecía una palabra
  de otra línea y la etiqueta se quedaba donde estaba. Igual al pegar.
- **Insertar una etiqueta entre dos palabras dejaba dos espacios.**
- **Una etiqueta escrita a mano seguía viéndose como `{{nombre}}`.** Ahora, al
  salir del editor, se convierte en etiqueta como las demás.
- **Arrastrar texto con formato al editor colaba su HTML.** Pegar ya lo
  limpiaba; soltar, no.
- **El Asunto enseña debajo lo que va a salir**, con las mismas etiquetas y los
  datos del contacto elegido. Antes solo se veían las llaves en crudo.
- **Vaciar una plantilla y guardarla hacía reaparecer la de fábrica**, sin
  decir nada, y era la de fábrica la que se enviaba. Ahora se avisa de que no
  puede quedarse vacía.

**Envío de correo**

- **El aviso de "sin cuenta de correo" podía mentir en los dos sentidos.** La
  cabecera decidía si había cuenta mirando una copia guardada dentro de la base
  de datos, mientras que el envío usa las credenciales reales, que viven
  cifradas fuera de ella. Las dos se separaban: borrada la base, el aviso se
  quedaba puesto para siempre con el correo funcionando; y al revés —restaurando
  una copia de seguridad, que lleva el usuario pero nunca la contraseña— la
  aplicación daba por configurada una cuenta con la que cada envío iba a fallar.
  Y no era solo el aviso: **el envío en tanda de Prospección se gobernaba con
  esa misma copia**, así que borrada la base se negaba a mandar nada —«no hay
  cuenta de correo configurada»— con el correo funcionando perfectamente, y
  restaurada una copia arrancaba la tanda para fallar contacto a contacto.
  Ahora todo eso lo pregunta al servidor, que es quien tiene las credenciales,
  y además distingue un tercer caso que antes no existía: cuenta guardada que
  el proveedor rechaza, con su propio aviso en la cabecera y, en Configuración,
  el punto en rojo con «Guardada, pero el proveedor la rechaza» en vez del
  verde que tranquilizaba sobre una contraseña que no funciona. El asistente de
  bienvenida seguía el mismo camino equivocado: daba por conectada una cuenta
  con la dirección guardada pero sin contraseña, y ahora solo lo hace cuando el
  servidor confirma que puede enviar.

- **Los dos correos que piden dinero eran los únicos que no saludaban por tu
  nombre.** El presupuesto y la entrega decían «Hi Anke,»; la factura y los
  tres recordatorios de cobro, «Hi,» a secas. Y el asunto de la factura era el
  único de los siete sin ninguna referencia —«Invoice for Translation
  Services»—, así que tres facturas al mismo cliente le llegaban con asunto
  idéntico y su gestor de correo las apilaba en un solo hilo; para reclamar un
  impago, justo lo contrario de lo que hace falta. Ahora los cuatro saludan por
  el nombre del cliente y el asunto de la factura lleva su número y el proyecto.
  Si ya habías reescrito alguna plantilla, la tuya se respeta: esto solo cambia
  las de fábrica.

- **Enviar una factura decía «Entregables enviados».** El diálogo ya se
  adaptaba entero —título, icono, botón y cuerpo del correo—, pero el aviso de
  confirmación se había quedado fuera.

- **La entrega y la factura podían salir prometiendo un adjunto que no iba
  dentro.** El correo que entrega la traducción dice «Please find attached the
  completed work», y el de la factura, «Please find attached the invoice». Si
  no se añadía ningún archivo, o si se borraba el PDF de la lista de adjuntos
  antes de darle a enviar, el correo salía igual: sin aviso, sin forma de
  deshacerlo, y con el cliente leyendo la promesa de un archivo que no estaba.
  Ahora, sin ningún adjunto, el envío se detiene y dice cuál falta.

- **El recordatorio de cobro daba el vencimiento en un formato que el cliente
  lee al revés.** Estos correos van siempre en inglés, y el importe ya salía en
  formato de cliente, pero la fecha seguía el idioma de la interfaz: en el
  mismo renglón convivían «€676.00» y «10/8/2026». Esa fecha es el 10 de agosto
  para quien escribe la aplicación en español y el 8 de octubre para quien lee
  el correo en inglés, así que el aviso final de impago llegaba a contradecirse
  solo: una fecha de vencimiento que el cliente lee como futura, en un correo
  que le está reclamando 39 días de retraso. Ahora el mes va escrito —«August
  10, 2026»—, que no admite lectura doble en ningún mercado. Afecta al
  recordatorio en sus tres etapas y al correo de la factura.

- **Una contraseña ya guardada se veía igual que un campo que nunca tuvo
  nada.** El servidor no devuelve nunca la contraseña de la cuenta de correo,
  ni siquiera cifrada, así que el campo de Configuración aparecía vacío tanto
  si había una cuenta conectada como si no. Quien volvía meses después no tenía
  forma de saber si su correo seguía configurado. Ahora, cuando la hay, junto a
  la etiqueta aparece un punto verde con «Ya hay una guardada», y el propio
  campo dice «Déjalo en blanco para no cambiarla».

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

- **El corrector del navegador subrayaba el español como si fueran faltas.**
  La aplicación se declaraba en inglés ante el navegador —el idioma del
  documento estaba fijado y no lo cambiaba nadie—, aunque la interfaz
  estuviera en español. Como el diccionario del corrector se elige por ahí, al
  escribir el asunto y el cuerpo de un correo, o las notas de un contacto o de
  un proyecto, salían subrayadas en rojo palabras bien escritas. El idioma
  declarado sigue ahora al que esté elegido en la cabecera. De paso, un lector
  de pantalla deja de leer el español con pronunciación inglesa.

- **El cronómetro dejaba entradas de "0min".** Arrancarlo y pararlo por error
  —o un clic doble— creaba una línea de cero minutos en la ficha, con su fecha
  y su aspa, que solo servía para borrarla a mano y que además viajaba en la
  copia de seguridad. Por debajo de medio minuto ya no se guarda nada.

- **Un archivo de menos de medio kilobyte se veía como "0 KB"**, que parece un
  archivo vacío justo antes de mandárselo al cliente. Ahora se dan los bytes.

- **La tarifa por hora sugería "Ej.: 0.12"**, que es un ejemplo de tarifa por
  palabra: bajo la etiqueta "Tarifa por hora" proponía doce céntimos la hora.

- **El par de idiomas se propone solo** al elegir cliente, tomándolo del que ya
  tiene guardado ese contacto. Solo se propone, y solo cuando el contacto tiene
  un par reconocible: lo que ya esté escrito no se toca.

- **El periodo de prueba se ancla también en los datos ya guardados.** Antes
  dependía únicamente de su propio archivo de registro, de modo que una
  instalación con contactos, proyectos y facturas de semanas atrás podía volver
  a presentarse como recién estrenada. Ahora, si ese registro falta, el inicio
  se reconstruye a partir del dato más antiguo que haya en la base. No se guarda
  nada nuevo: solo se leen fechas que ya estaban.

- **El desplegable de moneda principal salía entero en blanco.** Las 159
  divisas estaban ahí, pero cada opción se pintaba sin texto y sin valor: el
  campo leía dos propiedades que la lista no tiene. Además, sin divisa
  guardada el navegador enseñaba la primera de la lista —el dírham de los
  Emiratos— como si estuviera elegida; ahora la lista abre con una opción que
  dice lo que la aplicación hace mientras no elijas: resumir por la divisa en
  la que más factures.

- **«Cancelar» en Configuración no revertía tres campos.** La contraseña de
  aplicación, la clave de Stripe y la clave de licencia se escriben fuera del
  borrador de ajustes —son texto para activar o verificar algo, no un ajuste
  que se guarde—, así que cerrar con Cancelar las dejaba escritas y seguían
  ahí al volver a abrir, como si no se hubiera cancelado nada. Ahora el modal
  las limpia al abrirse.

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
- **A los 14 días la aplicación se cierra de verdad.** El fin de la prueba lo
  hacía cumplir solo la pantalla: por detrás el servidor local seguía
  respondiendo a todo, así que seguía habiendo por dónde seguir usando la
  aplicación sin licencia. Ahora se cierra también por dentro, y lo único que
  queda abierto es lo necesario para activar. Tus datos no se tocan: siguen
  ahí enteros, y vuelven en cuanto introduces la clave.
- **Estrenar carpeta de datos ya no regala otra prueba.** El inicio de la
  prueba se apoya en la marca más antigua de tu propio trabajo, pero eso solo
  se miraba cuando faltaba el registro: bastaba con empezar de cero y traerse
  los datos DESPUÉS para tener catorce días nuevos sin perder nada. Ahora se
  mira siempre y manda la fecha más antigua de las dos. De paso arregla el
  caso honrado: restaurar una copia en un portátil nuevo continúa la misma
  prueba en vez de estrenar otra.

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
