# Eumedical — Frontend & UX Trainee Challenge (Parte A)

Reinterpretación de la presencia digital de Eumedical: sitio público completo,
responsive, bilingüe (ES/IN) y con animaciones sutiles.

Entregable de diseño: **`Eumedical Rebrand.dc.html`** (abre directamente en el navegador).

---

## 1. Decisiones principales

**Marca.** Se respeta el Brand Book al 100%: azul corporativo `#1e4865` como color
de superficie y de texto, ámbar `#efbc0b` / `#e79f1a` como único acento de acción,
verdes salvia `#79b19c` / `#bfd7cd` / `#d9e4de` para estados y datos, y los grises
`#f2f2f2` / `#f7f7f4` como fondo. La **cruz** del manual se usa como recurso gráfico
recurrente (logo, viñetas de servicios, marcas de agua en el bloque CTA), nunca
como icono decorativo suelto.

**Tipografía.** Dinosaur Book y Didact Gothic son las tipografías del manual.
Didact Gothic está en Google Fonts y se usa tal cual para subtítulos y cuerpos
cortos. Dinosaur Book es comercial y no se puede servir en un prototipo público,
así que se sustituye por **Outfit** (geométrica humanista, proporciones y "g" de
caja única muy próximas) para titulares. En producción se cambiaría el
`font-family` de titulares por Dinosaur Book y nada más.

**Jerarquía.** Un solo H1, una sola acción primaria por pantalla (`Solicitar demo`
en ámbar). Todo lo demás es secundario o texto. El bloque de métricas en azul
sólido funciona como bisagra visual entre la promesa (hero) y la explicación
(cómo funciona), y evita el "muro de tarjetas" de la web actual.

**Contenido.** Se conserva la propuesta de valor esencial de eumedical.es —red
médica propia, atención 24/7, tecnología sin desarrollo de IT, médicos a
domicilio, cobertura en +80 países y +10 idiomas, 4.9/5 de valoración— pero
reordenada en una narrativa: promesa → prueba → proceso → alcance → catálogo →
testimonio → llamada a la acción.

**Bilingüe.** Un único DOM. Cada nodo traducible lleva `data-en`; al montar se
guarda el original en `data-es` y el conmutador intercambia `innerHTML` y
`document.documentElement.lang`. Sin duplicar markup ni recargar la página.

---

## 2. Animaciones

Todas en CSS/SVG nativo, con `IntersectionObserver` para disparo:

| Animación | Implementación |
|---|---|
| Entrada del hero | stagger por `setTimeout` sobre `[data-stagger]` |
| Reveals de sección | `IntersectionObserver` + `opacity/transform`, `data-delay` por tarjeta |
| Contadores | `requestAnimationFrame` con easing cúbico, una sola vez por nodo |
| Pasos 01–04 | reveal lateral encadenado |
| Chips de servicios | reveal en cascada de 55 ms |
| Header | morph de padding + `backdrop-filter` al pasar 24 px |
| Nodos de cobertura | `stroke-dashoffset` animado en las líneas SVG |
| Tarjetas flotantes | `@keyframes` de flotación desfasados |
| Estado de carga | spinner + confirmación en el botón de demo |

`@media (prefers-reduced-motion: reduce)` desactiva todo.

**Sobre Lottie.** El challenge pedía animaciones tipo `lottie-web`. No se incluyó
porque un Lottie requiere un `.json` producido en After Effects; generar uno
sintético habría añadido ~250 KB de runtime para reproducir efectos que aquí se
consiguen con CSS. Si el equipo aporta los `.json` de marca, el punto de
integración es directo: `lottie.loadAnimation({ container, path, renderer: 'svg' })`
dentro de `componentDidMount`, sustituyendo el diagrama de nodos y el mapa.

---

## 3. Accesibilidad

- Contraste: texto sobre azul `#1e4865` en `#ffffff` o `#b9cbd8` (≥ 4.6:1);
  el ámbar solo lleva texto azul oscuro encima, nunca blanco.
- `:focus-visible` con anillo ámbar de 3 px en todo elemento interactivo.
- Semántica: `header`/`nav`/`main`/`section`/`footer`, `ol` real para los pasos,
  `blockquote` para el testimonio, un único `h1`.
- `aria-pressed` en el conmutador de idioma, `aria-expanded` en el menú móvil,
  `role="status"` en la confirmación del formulario, `aria-label` descriptivo en
  el diagrama SVG, `aria-hidden` en decoración.
- Los placeholders de foto llevan la indicación de contenido en texto; en
  producción pasa a `alt`.

---

## 4. Responsive

Sin media queries de layout salvo una: todas las rejillas son
`repeat(auto-fit, minmax(min(100%, Npx), 1fr))`, de modo que reflúyen solas de 4
a 2 a 1 columna. La única media query real oculta la navegación de escritorio y
muestra el botón hamburguesa por debajo de 900 px. Tipografía en `clamp()`.

---

## 5. Problemas encontrados en el `package.json`

Ver `package.fixed.json` para el archivo corregido. Resumen:

**Bloqueantes**

1. **React 19 con React DOM 18.** `react: ^19.2.4` junto a `react-dom: ^18.3.1`.
   Combinación inválida: `react-dom` 18 no implementa el renderer de React 19 y
   rompe en runtime. Corregido a `react-dom: ^19.2.0`.
2. **`terser` no instalado.** El script `build` usa `vite build --minify terser`,
   pero desde Vite 3 terser es una dependencia opcional que hay que declarar.
   El build de producción falla. Añadido a `devDependencies`.
3. **`@vitejs/plugin-react` ^4 con Vite 7.** El plugin 4.x declara peer
   `vite: ^4 || ^5 || ^6`. Subido a `^5.0.0`.
4. **`jspdf: ^4.1.0` no existe.** La última mayor publicada es 3.x. `npm install`
   falla con `ETARGET`. Corregido a `^3.0.1`.

**Inconsistencias de configuración**

5. **Tailwind v4 mezclando integraciones.** Están `@tailwindcss/postcss` +
   `postcss` mientras el bundler es Vite; lo canónico en v4 es
   `@tailwindcss/vite`. Se cambia y se elimina la cadena PostCSS, que no aporta
   nada más en este proyecto.
6. **`engines.node: >=24.0.0`.** Innecesariamente restrictivo: excluye Node 22
   LTS sin motivo técnico (Vite 7 pide `^20.19 || >=22.12`). Relajado a
   `^20.19.0 || >=22.12.0`, y `@types/node` alineado a `^22`.
7. **Falta `overrides`.** `react-google-recaptcha` y `react-avatar-editor`
   declaran peer `react: ^16–18`; con React 19 la instalación aborta. Añadido
   bloque `overrides` en lugar de instalar con `--legacy-peer-deps`, que
   enmascara el problema para todo el equipo.

**Limpieza**

8. **`@supabase/storage-js` redundante.** `@supabase/supabase-js` ya reexporta el
   cliente de storage; tenerlo suelto duplica versiones. Eliminado.
9. **`react-is` como dependencia directa.** Es dependencia transitiva; declararla
   solo invita a desincronizarla de React. Eliminada.
10. **Cuatro SDKs de Twilio.** `twilio-video` (legacy) convive con
    `@twilio/video-processors` 3.x, `@twilio/conversations` y `@twilio/voice-sdk`.
    No los he tocado porque no conozco los flujos que dependen de cada uno, pero
    es el mayor foco de peso del bundle: dejo la nota y la recomendación de
    cargarlos con `import()` dinámico dentro de la ruta de teleconsulta.
11. **`@eumedical/shared` en registro privado.** Requiere `.npmrc` con el token
    del registro; documentado abajo porque sin él `npm ci` falla en CI.

---

## 6. Ejecutar el proyecto

El entregable de diseño es un único archivo HTML:

```
# abrir directamente
open "Eumedical Rebrand.dc.html"
```

Para el proyecto React del challenge:

```
echo "@eumedical:registry=https://<registro-privado>/" >> .npmrc
echo "//<registro-privado>/:_authToken=\${NPM_TOKEN}" >> .npmrc
npm ci
npm run dev          # vite
npm run quality-check
npm test
```

---

## 7. Con más tiempo

1. **Parte B — área privada de paciente.** Dashboard, próximas consultas con
   entrada a teleconsulta, historial, documentos, recetas, perfil y soporte, con
   estados vacío/error/carga cuidados. Es la mitad del challenge que queda fuera
   de este entregable por acuerdo de alcance.
2. Sustituir los placeholders rayados por fotografía real según el criterio del
   manual (luz natural, espacios neutros, sin agujas ni poses forzadas).
3. Licenciar Dinosaur Book y servirla con `@font-face` + `font-display: swap`.
4. Extraer los tokens a variables CSS reales y generar de ahí el tema de
   Tailwind v4, para una sola fuente de verdad.
5. Formulario de contacto real con validación `zod` y honeypot + reCAPTCHA.
6. Mapa de cobertura con datos geográficos reales (GeoJSON) en lugar de la
   aproximación por rejilla de puntos actual.
7. Tests: Vitest para el conmutador de idioma y los contadores; Playwright para
   el recorrido hero → demo.
8. SEO: metadatos `hreflang` por idioma, `JSON-LD` de `MedicalOrganization`,
   `sitemap.xml`.
