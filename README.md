# Eumedical — Frontend & UX Trainee Challenge

[![CI](https://github.com/Cufita/eumedical-trainee-challenge/actions/workflows/ci.yml/badge.svg)](https://github.com/Cufita/eumedical-trainee-challenge/actions/workflows/ci.yml)
[![Coverage Status](https://coveralls.io/repos/github/Cufita/eumedical-trainee-challenge/badge.svg?branch=master)](https://coveralls.io/github/Cufita/eumedical-trainee-challenge?branch=master)
[![Demo](https://img.shields.io/badge/demo-vercel-black)](https://eumedical-trainee-challenge.vercel.app)

**Demo en vivo:** https://eumedical-trainee-challenge.vercel.app — desplegado en Vercel, sin necesidad de clonar el repo.

> Nota: el repo es privado, así que los badges de CI/Coveralls de arriba solo se ven completos para quien tenga acceso al repo en GitHub.

Entrega para el reto de rebranding web + UX de paciente. Incluye:

- `design-reference.html` — sitio público rediseñado (Parte A) + prototipo funcional del área de paciente (Parte B), en un único archivo autocontenido (sin build step, se abre directo en el navegador). Este es el archivo original de la entrega (antes se llamaba `index.html`); se renombró porque el `index.html` de la raíz ahora es el entry point real de Vite para la app React (ver "Estructura del proyecto" más abajo). El contenido, diseño y copy de este archivo no cambiaron: sigue siendo la referencia visual que la app React reproduce fielmente.
- `package.json` — versión corregida del `package.json` de partida, con los bugs documentados abajo.
- `src/` — la misma Parte A + Parte B, ahora componentizadas en React + TypeScript sobre el scaffold de Vite (ver "Estructura del proyecto").
- Este `README.md`.

Para revisar el prototipo estático original: abrir `design-reference.html` directamente en cualquier navegador (sin instalar nada). El botón **"Área paciente"** (header o footer) cambia a la vista de Parte B; **"← Volver al sitio"** regresa a la web pública.

Para revisar la app React: ver "Cómo ejecutar" más abajo.

---

## 1. Enfoque de diseño

Partí del **Brand Book de Eumedical** (paleta, tipografías, cruz como símbolo ilustrativo, degradados a 45º, estilo fotográfico) y del contenido real de `eumedical.es`, pero evité copiar su layout (Wix, cards de icono repetidas, mismo bloque de servicios duplicado 3 veces). Usé **[Impeccable](https://github.com/pbakaus/impeccable)** — instalado vía `npx impeccable install` — como guía de dirección visual y como herramienta de auditoría real:

- Sus reglas anti-patrón (no Inter/fuentes genéricas, no cards idénticas con la misma sombra, no fondo crema por defecto, no numeración decorativa sin secuencia real) definieron decisiones concretas: la sección de "Capacidades" usa filas con líneas finas en vez de cards; los "servicios" usan una grilla asimétrica (una tile grande + tiles pequeñas) en vez de 8 cards iguales; el color de fondo por defecto es blanco/navy del propio manual de marca, no un crema genérico.
- Corrí `npx impeccable detect index.html` de verdad contra el archivo final (no es una referencia decorativa, el detector es un binario real que se descarga por npm y analiza el DOM renderizado). Primera pasada: **25 hallazgos**. Después de corregir, quedan **5**, documentados en la sección 3.

**Tokens de marca aplicados:**
- Color: `#1e4865` (navy, primario), `#79b19c`/`#3f7d68`→`#2f6653` (sage, ajustado para contraste AA), `#e79f1a`/`#efbc0b` (dorado, CTAs), `#f2f2f2`/`#e8eeec` (neutros), degradado a 45º navy→sage en el hero (regla explícita del manual de marca).
- Tipografía: **Fredoka** para titulares (sustituye a "Dinosaur Book", que no es una fuente web pública; elegí una geométrica redondeada con el mismo carácter humanista y amigable de la marca), **Didact Gothic** para subtítulos/etiquetas (es la fuente secundaria real del manual, disponible en Google Fonts), y **Arial** para cuerpo de texto (tal como especifica el manual de marca para "cuerpos largos de texto").
- El signo "+"/cruz del logo se reutiliza como marcador decorativo recurrente en vez de bullets genéricos, siguiendo la indicación del manual ("se utilizará individualmente como recurso gráfico que acompañe a piezas").
- No usé fotografía de stock: al no tener el banco de imágenes real de Eumedical y para evitar imágenes genéricas que contradigan el "Dont's" del manual (fotos posadas, luz artificial), preferí una dirección 100% gráfica (formas, cruz, degradados) más un "chip" de UI simulando una teleconsulta en vivo.

## 2. Parte A — Sitio público

Secciones implementadas: header/nav responsive, hero, capacidades (propuesta de valor), servicios, bloque de confianza/métricas (90k pacientes, 250 médicos, 70k recetas, 10 especialidades, 4.9/5 — cifras reales del sitio actual), sección corporativa/cobertura, contacto (formulario mock, sin backend) y footer. Accesibilidad: skip-link, foco visible, `prefers-reduced-motion`, jerarquía de encabezados corregida (ver auditoría), contraste AA, navegación completa por teclado.

## 3. Parte B — Área de paciente (UX)

Prototipo navegable (no solo mockup estático) con: **Inicio/Dashboard** (próxima consulta con CTA principal para unirse a la videoconsulta, accesos rápidos), **Consultas** (pestañas Próximas/Historial, botón de unión directo en teleconsultas), **Estudios** (informes y resultados descargables, con filtros), **Recetas** (activas/caducadas + estado vacío con guía para generar QR de farmacia), **Perfil** y **Soporte**.

El brief del reto (`docs/brand/Eumedical_Trainee_Challenge.docx.pdf`, Parte B) pide explícitamente: *"deben presentarse las pantallas principales, navegación propuesta y una breve explicación de las decisiones UX"*. Esta sección responde directamente a eso.

Decisiones UX clave:
- La acción más frecuente y urgente (**unirse a la videoconsulta**) es siempre el primer elemento visible del dashboard, no un ítem más de una lista — prioriza claridad y rapidez en un contexto sanitario.
- Barra lateral con las 6 secciones pedidas por el reto, siempre visible, para que el paciente nunca pierda referencia de dónde está (importante para un usuario que puede estar ansioso o no ser experto en tecnología).
- Estados vacíos con texto orientado a la acción (no solo "no hay datos"), siguiendo el criterio de trato humano del propio manual de marca.
- Reutiliza los mismos tokens de marca que el sitio público para que la transición del marketing al producto se sienta como la misma compañía.
- Loading skeleton real (~500ms simulados) en vez de un spinner genérico al entrar a `/paciente`, para comunicar progreso concreto en vez de una espera indefinida (detalle en sección 11).
- Errores explícitos (`toast.error`) en vez de botones muertos para "Unirse" y "Descargar" cuando no hay backend real detrás — falla de forma visible y explicada, no en silencio (detalle en sección 11).
- Página 404 dedicada dentro del shell de paciente (conserva el sidebar) en vez de una pantalla en blanco, para que el usuario nunca pierda el contexto de navegación (detalle en sección 11).
- Decisiones heredadas de `design-reference.html` **conscientemente no resueltas** en esta entrega, documentadas como recomendación y no como descuido: el callejón sin salida del QR de recetas, la falta de ruta de renovación para recetas caducadas, y "Volver al sitio" oculto en mobile sin salida alternativa — justificación completa en la sección 7.2.

## 4. Diagnóstico del `package.json` (obligatorio del reto)

Verifiqué cada paquete contra el registro real de npm (`registry.npmjs.org`) en vez de asumir. Hallazgos:

### Bugs corregidos
1. **`react` ^19.2.4 vs `react-dom` ^18.3.1` — incompatibilidad de versión mayor.** React y ReactDOM deben ir en la misma mayor; mezclar 19 con 18 rompe el render (hooks inválidos, "two copies of React"). `@types/react` y `@types/react-dom` ya apuntaban a 19, confirmando que 18 en `react-dom` era el error. **Fix:** `react-dom` → `^19.2.4`. También alineé `react-is` a `^19.2.4` (antes `^19.0.0`, funcional pero innecesariamente desalineado).
2. **`terser` ausente.** El script `build` usa `vite build --minify terser`, pero desde Vite 3 el minificador Terser no viene incluido por defecto: hay que instalarlo aparte o el build falla. **Fix:** añadido `terser` a `devDependencies`.
3. **`@types/node` ^25.2.3 vs `engines.node` >=24.0.0.** Los tipos de Node deben ir alineados a la versión de runtime objetivo; usar tipos de Node 25 sobre un runtime garantizado de Node 24 puede exponer APIs/tipos que no existen en producción. **Fix:** `@types/node` → `^24.9.2` (última de la línea 24, que sí existe en el registro).
4. **`build:dev` no es multiplataforma.** `NODE_OPTIONS=--max-old-space-size=4096 vite build ...` es sintaxis de shell POSIX; falla en `cmd.exe` de Windows. **Fix:** añadido `cross-env` como devDependency y antepuesto al script.

### Riesgos documentados (no corregidos con un simple bump de versión — requieren decisión de producto)
5. **Twilio Programmable Video llega a su fin de vida el 5 de diciembre de 2026.** El stack usa `twilio-video`, `@twilio/video-processors` y `@twilio/voice-sdk` para la teleconsulta — el corazón del producto ("TELECONSULTA 24/7"). Twilio anunció el EOL de Programmable Video y lo extendió una vez (de dic-2024 a dic-2026); a la fecha de este reto quedan ~2,5 meses. Esto **no se arregla en el `package.json`**: es una migración de proveedor (Twilio recomienda Zoom Video SDK) que debería priorizarse antes que cualquier feature nueva de UI.
6. **`@eumedical/shared` (^0.24.0)** es un paquete con scope privado; no está en el registro público. El `package.json` por sí solo no garantiza que el pipeline de CI tenga acceso (requiere `.npmrc`/token al registro interno) — lo señalo porque un `npm install` en limpio fallará sin esa configuración, y no es visible solo mirando este archivo.
7. `@tanstack/react-query` (^5.90.21) y `@tanstack/react-query-devtools` (^5.91.3) van en versiones menores desalineadas entre sí; no rompe nada hoy, pero conviene fijarlas juntas para evitar incompatibilidades futuras entre el core y las devtools.

### Con más tiempo
- Añadiría `resolutions`/`overrides` (o migraría a un lockfile con `npm-check-updates --target minor` en CI) para detectar automáticamente este tipo de desalineaciones de versión mayor en cada PR.
- Sustituiría la dependencia de Twilio Video por una prueba de concepto con Zoom Video SDK antes de que expire el soporte.
- Escribiría un test de humo que monte un componente con `ReactDOM.createRoot` en CI, que habría hecho fallar el build inmediatamente con el mismatch de versión de React en vez de descubrirlo en runtime.

## 5. Auditoría Impeccable — antes / después

**Antes de corregir (25 hallazgos):** múltiples contrastes de texto por debajo de AA (`sage-deep` sobre fondos claros, blanco sobre `sage`), padding insuficiente en los bordes de algunas secciones, y **8 saltos de nivel de encabezado** (`h2` → `h4` sin `h3` intermedio) en el área de paciente.

**Corregido:**
- Oscurecí `--sage-deep` de `#3f7d68` a `#2f6653` (pasa AA en todos los fondos claros usados) y cambié el avatar del paciente de `--sage` a `--sage-deep` para el texto blanco.
- Reordené la jerarquía de encabezados: los títulos de tarjetas/filas en el área de paciente pasaron de `h4` a `h3`, y los títulos de columna del footer de `h4` a `h3`, eliminando todos los saltos de nivel.
- Añadí padding lateral explícito a filas con borde y cero padding horizontal (contacto, cobertura, cita, footer).

**Quedan 5, documentados como decisión consciente y no como descuido:**
- `overused-font: arial` — Impeccable marca Arial como fuente genérica por defecto. La mantengo **a propósito**: el Brand Book de Eumedical especifica explícitamente Arial Regular como tipografía de sistema para cuerpos largos de texto (página 14). Priorizo la coherencia de marca sobre la heurística general del detector.
- 3 × `cramped-padding` en secciones con fondo de color, que persisten pese a aumentar el padding lateral global — probablemente una limitación de cómo el detector resuelve `clamp()`/variables CSS en un archivo local sin build. Lo dejo anotado para revisar con el motor en su modo "live" dentro de un proyecto con dev server real.
- `flat-type-hierarchy` (paso más fuerte entre encabezados de panel del área de paciente y el cuerpo) — es un matiz de esa vista secundaria; lo resolvería subiendo un escalón más los `h2` de panel si tuviera una ronda extra de pulido.

## 6. Cómo se usó IA / herramientas

Usé Claude para generar el HTML/CSS/JS del prototipo, `npx impeccable` (descargado desde el registro público de npm) como linter/detector real de patrones de diseño, y `registry.npmjs.org` para verificar cada versión de paquete citada arriba contra datos reales en vez de asumir. Puedo explicar cualquier decisión de código o de diseño tomada en este documento.

## 7. Componentización a React (post-entrega)

Después de la entrega original en `design-reference.html`, porté ese mismo diseño a una app React + TypeScript real sobre el scaffold de Vite que venía con el reto, en vez de dejarlo como un archivo estático aislado. El objetivo fue tratar `design-reference.html` como especificación de diseño a reproducir fielmente (mismo copy, misma paleta, misma tipografía, mismas correcciones de accesibilidad), no como algo a rediseñar.

### 7.1 Auditoría Impeccable sobre la app React — antes / después

Corrí `impeccable detect` contra la app real corriendo en el dev server (no contra HTML estático, porque ahora el DOM lo genera React) para `/` (sitio público) y `/paciente` (área de paciente).

**Primera pasada — bug real encontrado y corregido:**
- `[low-contrast] 2.2:1 — texto #ffffff sobre #e79f1a` en el botón "← Volver al sitio" de la barra lateral del área de paciente. Causa: usé la clase de Tailwind `bg-none!` para quitar el fondo dorado del botón base, pero `bg-none` solo limpia `background-image`, no `background-color` — el dorado del botón seguía debajo del texto blanco. **Fix:** cambié a `bg-transparent!` (`src/components/patient/Sidebar.tsx`). Verificado con una captura de pantalla y una segunda pasada del detector: el hallazgo desapareció.
- `[line-length] ~85 chars/línea` — dos párrafos sin ancho máximo (la descripción de cada fila en "Capacidades" y la nota de privacidad del formulario de contacto) podían crecer más de lo legible en pantallas anchas. **Fix:** añadí `max-w-[65ch]` a ambos (`Capabilities.tsx`, `Contact.tsx`), el rango que el propio detector recomienda.

**Quedan 5, documentados como decisión consciente (no como descuido), verificados manualmente antes de descartarlos:**
- `overused-font: arial` — igual que en la entrega original: es una decisión de marca explícita del Brand Book (página 14), no un descuido del detector.
- 4 × `[low-contrast] via analytic-gradient+alpha` en las filas pares de "Capacidades" (p. ej. "Atención médica digital 24/7", contraste reportado 2.2:1–2.4:1). Verifiqué con un script que lee `getComputedStyle` en esos nodos exactos: el texto es navy (`#1e4865`) y el fondo real en la posición del texto es el gradiente `linear-gradient(to right, #f2f2f2 0%, transparent 70%)` casi sin diluir (el texto está al ~5% del ancho de la fila, así que el fondo efectivo ahí es prácticamente `#f2f2f2`, no transparente). El contraste real navy-sobre-`#f2f2f2` es >8:1; el propio screenshot lo confirma visualmente. El detector interpreta mal el stop `transparent` de un `background-image` con degradado (probablemente lo trata como negro puro en vez de heredar el fondo real de la página), el mismo tipo de limitación de tooling que la entrega original documentó para `cramped-padding` con `clamp()`. No lo "arreglé" quitando el degradado porque es una decisión de marca explícita del manual original (zebra-striping con degradado a transparente en las filas de capacidades) — cambiarlo solo para complacer al detector habría sido optimizar para la herramienta, no para el usuario real.

### 7.2 `/impeccable critique` sobre dos pantallas clave

Corrí `/impeccable critique` sobre el home público (`/`) y el dashboard/Recetas del área de paciente (`/paciente`). Nota de método: para esta ronda usé un solo agente de revisión de diseño independiente (sin ver los hallazgos del detector de la sección 7.1) en vez del flujo completo de dos agentes aislados que pide el comando, porque el detector ya se había corrido dentro de esta misma sesión — degradación declarada, no silenciosa.

**Hallazgos reales, pero heredados de `design-reference.html` (no regresiones de la componentización) — no los implementé porque el encargo era reproducir el diseño fielmente, no rediseñarlo:**
- **El bloque QR de Recetas es un callejón sin salida.** El copy promete "Genera un código QR válido para tu farmacia", pero ni el HTML original ni mi puerto a React tienen un botón real: es solo texto informativo (`Prescriptions.tsx`, y antes `<div class="empty-state">` en `design-reference.html`). Un lector de pantalla no anuncia ninguna acción disponible ahí. Arreglarlo de verdad significa diseñar un flujo de generación de QR (y decidir qué pasa al pulsarlo) — una funcionalidad nueva, no una corrección de bug. Lo dejo como recomendación, no como fix silencioso.
- **Sin ruta de renovación para recetas caducadas** (p. ej. "Loratadina 10mg · Caducada" no ofrece ningún siguiente paso). Mismo motivo: es una decisión de producto (¿enlaza a reservar cita? ¿a soporte?), no algo que deba inventar sin confirmar.
- **"Volver al sitio" desaparece en mobile** (`max-md:hidden` en `Sidebar.tsx`) sin una salida alternativa. Esto reproduce exactamente `design-reference.html` (`@media (max-width:920px){ .app-exit{display:none;} }` en el original) — no es una regresión del port, pero sigue siendo un hueco de "user control and freedom" real en el diseño original.
- **Deriva de terminología** entre "Documentos" (nav), "Informes disponibles" (stat del dashboard) y "Ver informes" (acceso rápido) para el mismo concepto — los tres textos vienen literales de `design-reference.html`; los preservé porque el encargo pedía preservar todo el copy.
- **Sin estilos de error inline en el formulario de contacto** (solo validación nativa `required`/`type=email`) — igual que el original, que tampoco define un estado `:invalid`.

**Sí corregí, porque eran fallos genuinos de accesibilidad/legibilidad de mi propio código de componentización** (ver sección 7.1): el contraste blanco-sobre-dorado del botón "Volver al sitio" y el ancho de línea sin límite en dos párrafos.

**Otros hallazgos de la revisión** (heurísticas Nielsen anotadas 1-10, verdicto de especificidad de diseño, carga cognitiva, journey emocional, fortalezas y personas) quedan como contexto para una futura ronda de `/impeccable polish` si se decide ampliar el área de paciente más allá de esta entrega — no bloquean esta build.

## 8. Estructura del proyecto

Arquitectura **atomic design** (una sola jerarquía para sitio público + área de paciente; lo específico de pacientes vive namespaceado en un subfolder `patient/` dentro de cada nivel):

```
src/
  App.tsx                  # rutas: "/" (sitio público), "/paciente/*" (área de paciente) y 404 para el resto
  main.tsx                 # entry point, monta <BrowserRouter>
  index.css                # @import "tailwindcss" + tokens.css + estilos globales (cross, pulse, skip-link)
  setupTests.ts            # jest-dom para Vitest
  hooks/
    useDocumentTitle.ts    # <title> por ruta dentro de la SPA
  utils/
    teleconsulta.ts        # error compartido para el CTA "Unirse" (stub sin backend real)
  styles/
    tokens.css             # tokens de marca como @theme de Tailwind v4 (colores, fuentes, radios)
  store/
    patientStore.ts        # store de zustand con los datos del área de paciente + selectores derivados
  mocks/
    types.ts, appointments.ts, prescriptions.ts, studies.ts, profile.ts   # fixtures tipadas (sin backend real)
  components/
    atoms/                 # Button, Cross, Container, Tag, DotStatus, Globe, iconos — sin lógica de dominio
    molecules/              # ListRow, SectionHead, ServiceTile, PrimaryNav, RouteLoadingFallback... + molecules/patient/ (PatientLoadingSkeleton, AppointmentCard, StudyRow, PageHeader)
    organisms/               # PublicHeader, PublicFooter, HeroOrganism... + organisms/patient/ (PatientSidebar, PatientTopBar)
    templates/                # PublicLandingTemplate + templates/patient/ (PatientShellTemplate)
    pages/                     # SitePage, NotFoundPage + pages/patient/ (DashboardPage, AppointmentsPage —con pestañas Próximas/Historial—, StudiesPage, PrescriptionsPage, ProfilePage, SupportPage)
e2e/
  patient-area.spec.ts     # smoke test de Playwright: sitio público + navegación del área de paciente
```

Cada componente de `atoms/`, `molecules/` y `organisms/` que tiene una historia de Storybook la guarda junto al componente (`Componente.stories.tsx`); ver "Storybook" más abajo.

Decisiones de arquitectura:
- **Tailwind CSS** para estilos de componentes (ya estaba en `package.json`; CSS Modules habría sido igual de válido — lo consulté explícitamente antes de implementar). Los tokens de marca se declaran una vez en `src/styles/tokens.css` como bloque `@theme` de Tailwind v4, así generan utilidades reales (`bg-navy`, `text-sage-deep`, `font-display`, `rounded-lg`, etc.) en vez de vivir solo como variables CSS sueltas.
- **react-router-dom** reemplaza el toggle de `classList`/`display:none` del prototipo original: `/paciente` es un layout (`PatientShellTemplate`) con rutas anidadas por sección (`consultas` —con pestañas Próximas/Historial—, `estudios`, `recetas`, `perfil`, `soporte`), más un catch-all `*` que muestra una página 404 tanto a nivel raíz como dentro de `/paciente`. Las rutas `historial` y `documentos` quedan como redirects a `consultas` y `estudios` respectivamente, por compatibilidad con enlaces antiguos.
- **zustand** guarda las citas, estudios, recetas y el perfil mockeados; el dashboard deriva sus contadores ("2 consultas próximas", "1 receta activa"...) de ese store en vez de tenerlos escritos a mano, así un backend real solo tendría que reemplazar las fixtures por llamadas a la API sin tocar los componentes.
- El componente `Cross` reproduce el signo "+" del manual de marca como recurso gráfico reutilizable (icono decorativo, `aria-hidden`), igual que en `design-reference.html`.
- **Atomic design aplanado** (`components/{atoms,molecules,organisms,templates,pages}`, sin wrapper intermedio) en vez de una carpeta por feature: el sitio público y el área de paciente comparten átomos y moléculas reales (`Button`, `Cross`, `Container`), así que separar por feature hubiera duplicado o forzado imports cruzados; lo específico de cada dominio se namespacea en un subfolder (`patient/`) dentro de cada nivel en vez de vivir en un árbol paralelo.

## 9. Storybook

`npx storybook@latest init` configuró Storybook 10 (framework `@storybook/react-vite`) con los addons `a11y`, `docs` y `vitest`. `.storybook/preview.tsx` importa `src/index.css` (Tailwind + tokens de marca) y envuelve cada historia en `MemoryRouter`, porque varios componentes de pacientes (`PatientSidebar`, `PatientShellTemplate`, `DashboardPage`) usan `NavLink`/`useNavigate`/`Outlet`/`Link` de `react-router-dom` directamente. Las historias reutilizan los mocks tipados de `src/mocks/*` (vía `usePatientStore`, ya inicializado con esos datos) en vez de inventar fixtures nuevas.

```bash
npm run storybook         # http://localhost:6006
npm run build-storybook   # build estático en storybook-static/ (gitignored)
```

## 10. Cómo ejecutar

```bash
npm install      # ver nota abajo sobre @eumedical/shared
npm run dev      # http://localhost:5173 — sitio público en "/", área paciente en "/paciente"
npm run build    # tsc --noEmit + vite build
npm run test     # vitest run — ver sección 11 para qué cubre
npm run test:e2e # playwright — smoke test end-to-end (ver sección 11)
npm run storybook # http://localhost:6006 — catálogo de componentes (ver sección 9)
npm run lint     # eslint
npm run type-check
node scripts/generate-og-image.mjs  # opcional — regenera public/og-image.png (ver sección 11)
```

CI (`.github/workflows/ci.yml`) corre `type-check` + `lint` + `test` + `build` y, en un job aparte, `test:e2e` — en cada push/PR a `main`/`master`.

**Nota sobre `npm install`:** el `package.json` original incluye `@eumedical/shared` (paquete con scope privado, no publicado en el registro público de npm — documentado como riesgo en la sección 4, punto 6). Un `npm install` limpio en cualquier máquina sin acceso a ese registro privado falla con `404 Not Found`. Para poder instalar, compilar y testear en este entorno lo quité de `dependencies` — verifiqué primero que no se importa en ningún archivo de `src/` (`grep -r "@eumedical/shared" src/` no devuelve nada), así que quitarlo no rompe ninguna funcionalidad actual. Si el registro privado real está disponible (con el `.npmrc`/token correspondiente), hay que volver a añadirlo antes de integrar el backend real de la compañía.

**Nota sobre Node:** `engines.node` pide `>=24.0.0`; el entorno donde desarrollé esta parte corre Node 22, así que `npm install` imprime un warning `EBADENGINE` (no bloqueante). No cambié `engines` porque es una decisión de la sección 4 basada en el runtime objetivo real de producción, no un error a corregir.

**Nota sobre deploy (Vercel):** `vercel.json` en la raíz define un rewrite (`/(.*) → /index.html`), necesario porque `react-router-dom` maneja rutas client-side (`/paciente/*`); sin eso, entrar directo o refrescar en una URL profunda da 404 en Vercel. El deploy inicial se hizo por CLI (`npx vercel --prod`) y quedó conectado al repositorio de GitHub, así que un push a `main`/`master` dispara un nuevo deploy automáticamente. URL: https://eumedical-trainee-challenge.vercel.app.

**Nota sobre `eslint.config.js`:** el archivo original llamaba a `reactHooks.configs.flat.recommended`, que no existe en la versión de `eslint-plugin-react-hooks` fijada en `package.json` (`^5.2.0`) — esa versión expone `configs.recommended` (formato eslintrc, no flat-config real) y `configs['recommended-latest']` (flat-config real). Sin este fix, `npm run lint` fallaba con un `TypeError` antes de analizar un solo archivo. Cambié la referencia a `reactHooks.configs['recommended-latest']`.

## 11. Tests y cierre de huecos de calidad (post-componentización)

Después de portar el diseño a React (sección 7), quedaban pendientes: tests reales, un par de estados de error/loading a medias, y una ruta 404. Esto es lo que se agregó, y por qué:

**Tests (antes: 1 solo test de smoke; ahora: 26 archivos / 62 tests con `npm run test`, más 2 tests end-to-end con `npm run test:e2e`; ~94% de cobertura de líneas).**
- Durante la componentización a `atoms/molecules/organisms/pages/templates` se habían borrado (sin reemplazo) dos tests que sí probaban lógica real: `Contact.test.tsx` y `Header.test.tsx`. Los reescribí contra los componentes nuevos (`ContactOrganism.test.tsx`, `PublicHeader.test.tsx`) antes de dar por cerrado el refactor, para no perder esa cobertura.
- Agregué tests de la única lógica de negocio pura del proyecto: los selectores y la acción `cancelAppointment` de `src/store/patientStore.ts` (`patientStore.test.ts`).
- Agregué tests de todas las páginas del área de paciente: `AppointmentsPage` (tabs Próximas/Historial, estados vacíos, "Unirse" solo en teleconsultas), `DashboardPage` (tarjeta de próxima consulta condicionada por tipo de cita), `StudiesPage` (descarga con error simulado), `PrescriptionsPage` (renovación, estado vencida/activa), `ProfilePage` (alergias, acciones stub) y `SupportPage` (formulario de contacto, validación).
- `npm run test:e2e` apuntaba a `playwright.e2e.config.ts`, que **no existía en el repo** — el script estaba roto desde el `package.json` de partida y nadie lo había corrido. Lo creé (Chromium headless contra el dev server) junto con `e2e/patient-area.spec.ts`, un flujo mínimo: home pública → `/paciente` → Consultas → pestaña Historial.
- De paso, `vite.config.ts` no excluía `e2e/**` del runner de Vitest, así que `npm run test` intentaba ejecutar los specs de Playwright como si fueran tests de Vitest y fallaba con un error de "test() called here" — lo agregué a `test.exclude`.
- Los tests que renderizan `<App />` con rutas lazy (`PatientSidebar.test.tsx`, `App.test.tsx`, `PatientShellTemplate.test.tsx`) esperan un chunk async + el ~500ms simulado del shell; bajo carga (toda la suite en paralelo) el timeout por defecto de Vitest (5000ms) competía con el propio `findBy`, así que les di timeout explícito (15000ms de test, 10000ms de `findBy`) en vez de dejarlos flaky.
- Al agregar cobertura (ver más abajo), el reporte de `v8` señaló componentes chicos con interacciones nunca ejercitadas: `LanguageSwitcher` (toggle ES/EN, persistencia en `localStorage`, estado `disabled` mientras se recarga), `FilterDropdown` y `Pagination` (usados en `StudiesPage`) y `PatientTopBar` (menú de cuenta: ir a perfil, cerrar sesión). Les sumé tests unitarios propios en vez de forzarlos a través de una página completa. `FilterDropdown` y `PatientTopBar` usan `Menu`/`Popover` de `@headlessui/react` con la prop `anchor`, que posiciona vía `floating-ui` y depende de `ResizeObserver` — jsdom no lo implementa, así que agregué un stub mínimo en `setupTests.ts` (mismo patrón que el de `IntersectionObserver` que ya existía).

**Estados de error, loading y una ruta 404 que no existían:**
- `PatientLoadingSkeleton.tsx` estaba construido (con su propia historia de Storybook) pero no se usaba en ningún lado — el comentario en el código decía "ver AppShell", un componente que ya no existe. Ahora `PatientShellTemplate` simula una carga inicial de ~500ms al entrar a `/paciente` y muestra ese skeleton mientras tanto.
- El botón "Unirse" a teleconsulta (en el dashboard y en la lista de consultas) y el botón de descarga de estudios apuntaban a `'#'` — un link muerto que no hacía nada al hacer click, porque no hay backend real de videollamada ni archivos reales. Ahora ambos muestran un error explícito (`toast.error`) explicando que es una demo sin backend, en vez de fallar en silencio. De paso noté que el botón "Unirse" del dashboard aparecía incluso para consultas presenciales (no solo teleconsultas); lo condicioné al tipo de cita, igual que ya hacía el resto de la UI.
- No había ruta 404: cualquier URL inválida bajo `/` o `/paciente` no mostraba nada. Agregué `NotFoundPage` (con el header/footer del sitio) y `PatientNotFoundPage` (dentro del shell de paciente, conserva el sidebar) como catch-all (`path="*"`) en `App.tsx`.
- Cada página del área de paciente ahora actualiza `document.title` al navegar (`src/hooks/useDocumentTitle.ts`) — antes el `<title>` de la pestaña quedaba fijo en el de `index.html` sin importar qué pantalla estuviera abierta.

**Documentación:** `PRODUCT.md` describía la app como "boilerplate de Vite sin usar" y la componentización como "en progreso" — desactualizado desde la sección 7. Lo corregí para reflejar que Partes A y B ya están implementadas en `src/`.

**Performance — code splitting por ruta, y el verdadero culpable del chunk grande.** `npm run build` avisaba que todo el JS salía en un solo chunk de ~1.1MB minificado. Primer paso: convertí las rutas de `App.tsx` a `React.lazy()` (sitio público, shell de paciente y cada una de sus 6 pantallas) envueltas en un `<Suspense>` con un fallback liviano (`RouteLoadingFallback.tsx`, reutiliza la misma animación de puntos del skeleton) — el área de paciente quedó en piezas de 2-22kB por pantalla, pero el chunk del sitio público seguía en ~617kB, todavía arriba del umbral de 500kB de Vite.

Para no quedarme con "es contenido, ya está" como excusa, diagnostiqué qué pesaba tanto ahí: agregué temporalmente un `manualChunks` que separaba cada dependencia de `node_modules` en su propio archivo para poder ver los números reales, y encontré que el código propio de `SitePage` pesa solo ~46kB — el resto (~560kB) es **`three`** (Three.js), la librería 3D detrás del globo interactivo del hero (`Globe.tsx`), más grande que el resto del sitio público combinado. Revertí el `manualChunks` diagnóstico (no lo necesito, era solo para medir) y en su lugar hice lazy sólo `Globe` dentro de `HeroOrganism.tsx`, con un placeholder estático (un círculo con el degradado de océano que ya usan los tokens del propio globo) que ocupa el mismo espacio mientras carga, así no hay salto de layout. Resultado: `SitePage` bajó a ~51kB, y `Globe` (con Three.js) quedó en su propio chunk de ~567kB que se pide en paralelo sin bloquear el resto del sitio — sigue arriba del umbral de Vite, pero ahora aislado a la única pieza que realmente lo justifica (un globo 3D interactivo), no mezclado con todo el contenido del sitio.

**SEO.** Usé `https://www.eumedical.es/` (el dominio real de la compañía, dado en el propio enunciado del reto) como canonical, URL de Open Graph y única entrada de `sitemap.xml` — no es un dominio inventado. Agregué también `og:image`/`twitter:image`: en vez de usar una foto real (no hay ninguna de Eumedical entregada para esto — mismo criterio que ya regía el resto de las imágenes, ver `PRODUCT.md`) o fabricar una que no representa a la marca, generé una tarjeta de marca real a partir de los tokens de `tokens.css` y la forma exacta del logo (`public/favicon.svg`) — sin inventar nada, solo tipografía y color ya confirmados por el Brand Book. El script (`scripts/generate-og-image.mjs`) renderiza `scripts/og-image/template.html` con Playwright a 1200×630 y escribe `public/og-image.png`; no corre en el build (nada que regenerar salvo que cambien los tokens de marca). Además: `robots.txt` (permite `/`, bloquea `/paciente` por ser área privada de paciente), y sincronicé `document.documentElement.lang` con el idioma activo del switch ES/EN (antes quedaba fijo en `"es"` del `index.html` aunque el contenido pasara a inglés). No agregué meta description dinámica por ruta dentro de `/paciente`: es un área privada que `robots.txt` ya excluye de indexación, así que no tiene beneficio real de SEO, a diferencia del `<title>` por ruta (sección anterior), que sí ayuda a quien navega con varias pestañas abiertas.

**CI.** No había ningún pipeline automatizado — solo el hook de pre-commit local con Husky. Agregué `.github/workflows/ci.yml` con dos jobs sobre Node 24 (la versión que pide `engines.node`): `checks` (`type-check` + `lint` + `test:coverage` + `build`) y `e2e` (instala Chromium de Playwright y corre `test:e2e`), en push/PR a `main`/`master`.

**Cobertura.** `npm run test:coverage` corre Vitest con el provider `v8` y genera reporte `text`/`html`/`lcov` en `coverage/` (gitignored). El job `checks` de CI sube `coverage/lcov.info` a Coveralls (`coverallsapp/github-action`) en cada push/PR — ver badge de cobertura al inicio de este documento.

**Con más tiempo, seguiría por acá** (además de lo ya listado en la sección 4): si el chunk de `Globe`/Three.js se vuelve un problema real medido (no solo el warning de build), evaluar una librería de globo más liviana o un fallback 2D para conexiones lentas; y sumar tests de integración más end-to-end (hoy el e2e cubre un flujo, no cada pantalla).

## 12. Metodología: Spec-Driven Development (SDD)

El proceso de esta entrega siguió, en la práctica, una estrategia de **Spec-Driven Development**: la spec se escribió antes que el código y cada iteración se validó contra esa spec en vez de contra el criterio subjetivo del momento.

- **La spec del producto se escribió primero.** `PRODUCT.md` (generado con el flujo `impeccable:product-schema`) define plataforma, stack, usuarios, propósito, posicionamiento, capacidades y restricciones, compromisos de marca y principios del producto — antes de tocar el código de la Parte B. Los 5 "Product Principles" ahí definidos (fidelidad al Brand Book, diferenciación del template genérico de `eumedical.es`, prioridad a la acción de unirse a videoconsulta, validación por auditoría real en vez de gusto personal, no fabricar contenido) funcionaron como criterio de aceptación en cada decisión posterior, no como documentación retroactiva.
- **`design-reference.html` como spec de diseño ejecutable.** No fue un mockup descartable: se trató como el contrato de diseño a reproducir fielmente al portar la Parte A/B a React (mismo copy, misma paleta, misma tipografía, mismas correcciones de accesibilidad) — ver sección 7. Las decisiones de UX heredadas y conscientemente no resueltas (sección 7.2) son justamente casos donde la spec original tenía un hueco real, y se documentó la brecha en vez de improvisar una solución fuera de alcance.
- **Las auditorías Impeccable como validación de conformidad, no revisión libre.** Cada corrida de `impeccable detect`/`critique` (secciones 1, 5, 7.1 y 7.2) se hizo contra reglas concretas derivadas del Brand Book y de `PRODUCT.md`, y cada hallazgo se resolvió o se documentó explícitamente como decisión consciente (p. ej. Arial por especificación de marca) — el criterio de "listo" en cada iteración fue "conforme a la spec", no "se ve bien".
- **`docs/brand/rules.md`** funciona como la versión resumida y consultable de la spec de marca (extraída del Brand Book en PDF), citada en cada decisión de color/tipografía/iconografía del README.
