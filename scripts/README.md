# Scripts del sitio

## Capturas de la portada

Las cinco capturas por idioma que aparecen en `index.html` (`shots/es/`,
`shots/en/`) no se hacen a mano: se generan con estos dos scripts, pilotando
el Edge instalado por CDP. Node 24 trae `WebSocket` global, así que no hace
falta puppeteer ni ninguna dependencia añadida.

**Hay que regenerarlas cada vez que cambie la interfaz de la aplicación.**
Una captura desfasada en una página de venta es peor que ninguna.

### Lo que hace falta

- El repositorio de la aplicación al lado de este (`../outreach-studio`), o
  la variable `GESTRICS_APP` apuntando a él. De ahí sale `sql.js`.
- Microsoft Edge instalado en la ruta habitual de Windows.
- La aplicación arrancada en `http://localhost:5173` para el paso de captura.

### El procedimiento

El orden **no es opcional**: hay un paso que, saltado, publica los datos
personales del traductor en una captura. La cabecera de `sembrar-demo.mjs` lo
explica en detalle; el resumen es que la aplicación congela sus plantillas
heredadas en cuanto detecta que hay contactos, y esas plantillas llevan el
nombre y la biografía reales.

1. Parar el backend.
2. Borrar `%APPDATA%\gestrics\outreach-studio.db`.
3. Arrancar el backend: crea la base vacía, con las plantillas genéricas.
4. **Con la base todavía sin contactos**, marcar los centinelas:
   ```
   node ../outreach-studio/scripts/dev-skip-first-run.mjs
   curl -X PUT -H "Content-Type: application/json" -d "{\"value\":true}"  http://localhost:3001/api/settings/migration_legacyTemplatesFrozen
   curl -X PUT -H "Content-Type: application/json" -d "{\"value\":\"ES\"}" http://localhost:3001/api/settings/translator_fiscalCountry
   ```
5. Parar el backend.
6. `node scripts/sembrar-demo.mjs es`
7. Arrancar backend y front.
8. `node scripts/capturar.mjs es`
9. Repetir del 1 al 8 con `en`: la tanda inglesa necesita su propia siembra,
   porque los títulos de los proyectos van en el idioma de la captura.
10. **Borrar la base al terminar.** Son datos falsos y el contador de facturas
    tiene que quedar en `-001`.

`capturar.mjs` comprueba antes de disparar que no haya datos personales en
pantalla y aborta si los encuentra. Es una red de seguridad, no el método:
el orden de arriba es el método.

### Las versiones WebP, que son las que de verdad se sirven

`optimizar-capturas.mjs` saca de cada PNG dos WebP reducidos, y es lo que
descarga quien entra. **No hay que acordarse de ejecutarlo**: `capturar.mjs`
lo llama al terminar, para el idioma que acaba de capturar, y sale con error
si falla. Suelto también vale:

```
node scripts/optimizar-capturas.mjs        # los dos idiomas
node scripts/optimizar-capturas.mjs es     # solo uno
```

Por qué existe: los PNG a 2352px pesaban **1,2 MB por visita y por idioma**,
frente a 18 kB de HTML y hoja de estilos juntos. Desde un país lejano eso es
lo único que se nota, y no hay retoque de CSS que lo arregle — son bytes que
viajan. Con los WebP, esa misma visita baja a unos **300 kB en una pantalla de
densidad doble y 116 kB en una normal**.

**Los PNG no se borran**: son el respaldo de quien no entienda WebP y el
destino del enlace de «ver grande» que envuelve cada captura.

Y un detalle contraintuitivo que decide los anchos, medido sobre la página
servida y no supuesto: **las capturas de los pasos se ven MÁS GRANDES en
pantalla estrecha** (719px a 800 de ancho, frente a 492 a 1280), porque la
maqueta pasa a una columna. Medir solo en escritorio lleva a generarlas
pequeñas y a que se vean borrosas justo en el móvil. De ahí 740 y 1480 para
los pasos, y 980 y 1960 para la de la portada, que se enseña a 974.

### Detalles que costaron descubrirse

- **La ventana va a 1176px de ancho**, que es exactamente lo que mide el
  armazón de la aplicación. Así no asoma el fondo de la página a los lados y
  la captura no hay que recortarla.
- **Densidad 2×**: las capturas salen a 2352×1500 y la página las muestra a
  unos 500px, así que se ven nítidas y se pueden abrir a tamaño real. Pero
  **eso NO es lo que se sirve**: ver el apartado de abajo.
- **La caché del navegador se desactiva** por CDP. Sin eso, una segunda pasada
  fotografía la versión anterior de la página.
- **El perfil temporal de Edge va al temporal del sistema.** Apuntarlo cerca
  de la carpeta de destino dejó una vez un perfil de navegador entero dentro
  del repositorio.

## La página del historial de cambios

`changelog.html` **no se edita a mano**: la genera `generar-changelog.mjs` a
partir de `CHANGELOG.md` y `CHANGELOG.en.md`, que vienen del repositorio de la
aplicación.

El ciclo completo, cada vez que la aplicación publica una versión:

```
node scripts/copiar-changelogs.mjs
node scripts/generar-changelog.mjs
```

Y abrir la página para comprobar que la versión nueva está arriba.

Saltarse el segundo deja la página con el texto de la versión anterior
mientras los `.md` ya están al día, y nada avisa.

**Los `.md` de aquí NO son copias literales de los de la aplicación**, y antes
este README decía que sí. Hay dos diferencias, y las dos las aplica
`copiar-changelogs.mjs` para que nadie tenga que acordarse:

- **Se pasa de CRLF a LF.** Aquel repositorio es CRLF y éste LF; sin convertir,
  el siguiente `git diff` sale entero como cambiado y esconde lo que de verdad
  cambió.
- **Se quita la sección `[Sin publicar]`.** Describe trabajo que todavía no
  está dentro del instalador que cuelga de la página, y enseñárselo a quien
  entra a comprar es prometerle lo que no puede descargarse. Esto se venía
  haciendo a mano, sin que estuviera escrito en ninguna parte: la siguiente
  copia "literal" lo habría publicado.

Que lo quite el script no basta por sí solo, así que hay dos cerrojos:

- `generar-changelog.mjs` descarta ese bloque aunque aparezca en el `.md`, por
  si alguien copia a mano. Comprobado en los dos sentidos: con el generador
  anterior y el `.md` crudo, «Sin publicar», «Unreleased» y sus entradas
  salían publicadas en la página.
- Y el script lo quita del **archivo**, no solo de la página, porque GitHub
  Pages sirve estos `.md` tal cual: `https://outreachstudio.app/CHANGELOG.md`
  responde 200 aunque no haya ningún enlace que lleve ahí.

### Por qué existe esta página

Antes la portada enlazaba al archivo renderizado en GitHub. Se dejó de hacer a
propósito: ese enlace lleva al repositorio, y de ahí a la página de releases,
que tiene el instalador al final y es pública. El historial se sirve ahora
desde el propio sitio y no manda a nadie fuera. El botón de descarga sí sigue
apuntando a GitHub Releases, que es donde está alojado el instalador.

### Detalles del conversor

- Entiende **solo** la sintaxis que usan esos dos archivos: encabezados de dos
  y tres almohadillas, viñetas con líneas continuadas, una negrita sola en su
  línea como subtítulo, y negrita, código y enlaces dentro del texto. Si el
  changelog empieza a usar tablas o listas anidadas, hay que ampliarlo — mejor
  eso que arrastrar una dependencia de markdown para diez páginas.
- **Escapa antes de convertir.** Al revés, un `<` del texto se comería el HTML
  recién generado; el changelog tiene órdenes de terminal dentro.
- **El marco (cabecera, navegación y pie) está copiado a mano** en el script,
  porque el sitio no tiene plantilla compartida. Un cambio en la navegación de
  las otras páginas hay que darlo también aquí.
