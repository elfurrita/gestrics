# Capturas de la portada

Las cinco capturas por idioma que aparecen en `index.html` (`shots/es/`,
`shots/en/`) no se hacen a mano: se generan con estos dos scripts, pilotando
el Edge instalado por CDP. Node 24 trae `WebSocket` global, así que no hace
falta puppeteer ni ninguna dependencia añadida.

**Hay que regenerarlas cada vez que cambie la interfaz de la aplicación.**
Una captura desfasada en una página de venta es peor que ninguna.

## Lo que hace falta

- El repositorio de la aplicación al lado de este (`../outreach-studio`), o
  la variable `GESTRICS_APP` apuntando a él. De ahí sale `sql.js`.
- Microsoft Edge instalado en la ruta habitual de Windows.
- La aplicación arrancada en `http://localhost:5173` para el paso de captura.

## El procedimiento

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

## Detalles que costaron descubrirse

- **La ventana va a 1176px de ancho**, que es exactamente lo que mide el
  armazón de la aplicación. Así no asoma el fondo de la página a los lados y
  la captura no hay que recortarla.
- **Densidad 2×**: las capturas salen a 2352×1500 y la página las muestra a
  unos 500px, así que se ven nítidas y se pueden abrir a tamaño real.
- **La caché del navegador se desactiva** por CDP. Sin eso, una segunda pasada
  fotografía la versión anterior de la página.
- **El perfil temporal de Edge va al temporal del sistema.** Apuntarlo cerca
  de la carpeta de destino dejó una vez un perfil de navegador entero dentro
  del repositorio.
