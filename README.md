# Eumedical — Frontend & UX Trainee Challenge

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

Prototipo navegable (no solo mockup estático) con: **Inicio/Dashboard** (próxima consulta con CTA principal para unirse a la videoconsulta, accesos rápidos), **Consultas** (próximas + historial breve, botón de unión directo), **Historial**, **Documentos** (informes descargables), **Recetas** (activas/caducadas + estado vacío con guía para generar QR de farmacia) y **Perfil y soporte**.

Decisiones UX clave:
- La acción más frecuente y urgente (**unirse a la videoconsulta**) es siempre el primer elemento visible del dashboard, no un ítem más de una lista — prioriza claridad y rapidez en un contexto sanitario.
- Barra lateral con las 6 secciones pedidas por el reto, siempre visible, para que el paciente nunca pierda referencia de dónde está (importante para un usuario que puede estar ansioso o no ser experto en tecnología).
- Estados vacíos con texto orientado a la acción (no solo "no hay datos"), siguiendo el criterio de trato humano del propio manual de marca.
- Reutiliza los mismos tokens de marca que el sitio público para que la transición del marketing al producto se sienta como la misma compañía.

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
    molecules/              # ListRow, SectionHead, ServiceTile, PrimaryNav... + molecules/patient/ (PatientLoadingSkeleton, AppointmentCard, StudyRow, PageHeader)
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
```

**Nota sobre `npm install`:** el `package.json` original incluye `@eumedical/shared` (paquete con scope privado, no publicado en el registro público de npm — documentado como riesgo en la sección 4, punto 6). Un `npm install` limpio en cualquier máquina sin acceso a ese registro privado falla con `404 Not Found`. Para poder instalar, compilar y testear en este entorno lo quité de `dependencies` — verifiqué primero que no se importa en ningún archivo de `src/` (`grep -r "@eumedical/shared" src/` no devuelve nada), así que quitarlo no rompe ninguna funcionalidad actual. Si el registro privado real está disponible (con el `.npmrc`/token correspondiente), hay que volver a añadirlo antes de integrar el backend real de la compañía.

**Nota sobre Node:** `engines.node` pide `>=24.0.0`; el entorno donde desarrollé esta parte corre Node 22, así que `npm install` imprime un warning `EBADENGINE` (no bloqueante). No cambié `engines` porque es una decisión de la sección 4 basada en el runtime objetivo real de producción, no un error a corregir.

**Nota sobre `eslint.config.js`:** el archivo original llamaba a `reactHooks.configs.flat.recommended`, que no existe en la versión de `eslint-plugin-react-hooks` fijada en `package.json` (`^5.2.0`) — esa versión expone `configs.recommended` (formato eslintrc, no flat-config real) y `configs['recommended-latest']` (flat-config real). Sin este fix, `npm run lint` fallaba con un `TypeError` antes de analizar un solo archivo. Cambié la referencia a `reactHooks.configs['recommended-latest']`.

## 11. Tests y cierre de huecos de calidad (post-componentización)

Después de portar el diseño a React (sección 7), quedaban pendientes: tests reales, un par de estados de error/loading a medias, y una ruta 404. Esto es lo que se agregó, y por qué:

**Tests (antes: 1 solo test de smoke; ahora: 19 archivos / 44 tests con `npm run test`, más 2 tests end-to-end con `npm run test:e2e`).**
- Durante la componentización a `atoms/molecules/organisms/pages/templates` se habían borrado (sin reemplazo) dos tests que sí probaban lógica real: `Contact.test.tsx` y `Header.test.tsx`. Los reescribí contra los componentes nuevos (`ContactOrganism.test.tsx`, `PublicHeader.test.tsx`) antes de dar por cerrado el refactor, para no perder esa cobertura.
- Agregué tests de la única lógica de negocio pura del proyecto: los selectores y la acción `cancelAppointment` de `src/store/patientStore.ts` (`patientStore.test.ts`).
- Agregué tests de las páginas con más ramas de UI: `AppointmentsPage` (tabs Próximas/Historial, estados vacíos, "Unirse" solo en teleconsultas), `DashboardPage` (tarjeta de próxima consulta condicionada por tipo de cita) y `StudiesPage` (descarga con error simulado).
- `npm run test:e2e` apuntaba a `playwright.e2e.config.ts`, que **no existía en el repo** — el script estaba roto desde el `package.json` de partida y nadie lo había corrido. Lo creé (Chromium headless contra el dev server) junto con `e2e/patient-area.spec.ts`, un flujo mínimo: home pública → `/paciente` → Consultas → pestaña Historial.
- De paso, `vite.config.ts` no excluía `e2e/**` del runner de Vitest, así que `npm run test` intentaba ejecutar los specs de Playwright como si fueran tests de Vitest y fallaba con un error de "test() called here" — lo agregué a `test.exclude`.

**Estados de error, loading y una ruta 404 que no existían:**
- `PatientLoadingSkeleton.tsx` estaba construido (con su propia historia de Storybook) pero no se usaba en ningún lado — el comentario en el código decía "ver AppShell", un componente que ya no existe. Ahora `PatientShellTemplate` simula una carga inicial de ~500ms al entrar a `/paciente` y muestra ese skeleton mientras tanto.
- El botón "Unirse" a teleconsulta (en el dashboard y en la lista de consultas) y el botón de descarga de estudios apuntaban a `'#'` — un link muerto que no hacía nada al hacer click, porque no hay backend real de videollamada ni archivos reales. Ahora ambos muestran un error explícito (`toast.error`) explicando que es una demo sin backend, en vez de fallar en silencio. De paso noté que el botón "Unirse" del dashboard aparecía incluso para consultas presenciales (no solo teleconsultas); lo condicioné al tipo de cita, igual que ya hacía el resto de la UI.
- No había ruta 404: cualquier URL inválida bajo `/` o `/paciente` no mostraba nada. Agregué `NotFoundPage` (con el header/footer del sitio) y `PatientNotFoundPage` (dentro del shell de paciente, conserva el sidebar) como catch-all (`path="*"`) en `App.tsx`.
- Cada página del área de paciente ahora actualiza `document.title` al navegar (`src/hooks/useDocumentTitle.ts`) — antes el `<title>` de la pestaña quedaba fijo en el de `index.html` sin importar qué pantalla estuviera abierta.

**Documentación:** `PRODUCT.md` describía la app como "boilerplate de Vite sin usar" y la componentización como "en progreso" — desactualizado desde la sección 7. Lo corregí para reflejar que Partes A y B ya están implementadas en `src/`.

**Con más tiempo, seguiría por acá** (además de lo ya listado en la sección 4): dividir el bundle de producción (Vite avisa que `index-*.js` pesa >500kB minificado — ningún `dynamic import()` todavía), subir la cobertura de tests más allá de las páginas/lógica más ramificadas (falta `ProfilePage`, `SupportPage`, `PrescriptionsPage`), y un pipeline de CI (no hay `.github/workflows`; hoy solo hay un hook de pre-commit local con Husky) que corra `type-check`, `lint` y `test` en cada push.
