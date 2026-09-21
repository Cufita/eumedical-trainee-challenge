# Eumedical — Frontend & UX Trainee Challenge

[![CI](https://github.com/Cufita/eumedical-trainee-challenge/actions/workflows/ci.yml/badge.svg)](https://github.com/Cufita/eumedical-trainee-challenge/actions/workflows/ci.yml)
[![Coverage Status](https://coveralls.io/repos/github/Cufita/eumedical-trainee-challenge/badge.svg?branch=master)](https://coveralls.io/github/Cufita/eumedical-trainee-challenge?branch=master)
[![Demo landing](https://img.shields.io/badge/demo-landing-black)](https://eumedical-trainee-challenge.vercel.app)
[![Demo pacientes](https://img.shields.io/badge/demo-pacientes-black)](https://eumedical-trainee-challenge.vercel.app/paciente)

**Demo en vivo:** [sitio público](https://eumedical-trainee-challenge.vercel.app) · [área de paciente](https://eumedical-trainee-challenge.vercel.app/paciente) — desplegado en Vercel, sin necesidad de clonar el repo.

**Cobertura de tests:** el badge de Coveralls de arriba refleja el reporte línea por línea del último commit pusheado a `master` (se regenera automáticamente desde `coverage/lcov.info` en cada push/PR de CI) — es la fuente de verdad del % actual; no lo repito como número fijo en el texto para que no quede desactualizado si hay cambios locales todavía sin pushear.

Entrega para el reto de rebranding web + UX de paciente. Incluye:

- `design-reference.html` — prototipo estático original de Parte A + Parte B, en un único archivo sin build step (entregado originalmente como `index.html`; se renombró porque el `index.html` de la raíz es ahora el entry point real de Vite).
- `package.json` — versión corregida del `package.json` de partida (ver "Cambios realizados al `package.json`").
- `src/` — Parte A + Parte B componentizadas en React + TypeScript sobre el scaffold de Vite.
- Este `README.md`.

Para revisar el prototipo estático original: abrir `design-reference.html` directamente en cualquier navegador. Para revisar la app React: ver "Cómo ejecutar" abajo.

---

## Cómo ejecutar

No hace falta correr nada para revisar la entrega: los links de demo de arriba están desplegados y cubren tanto el sitio público como el área de paciente. Esta sección es para quien quiera levantar el código localmente.

```bash
npm install       # ver nota sobre @eumedical/shared
npm run dev        # http://localhost:5173 — sitio público en "/", área paciente en "/paciente"
npm run build      # tsc --noEmit + vite build
npm run test       # vitest run — ver % de cobertura actual en el badge de Coveralls arriba
npm run test:coverage  # genera coverage/ (html + lcov), lo que sube el badge de Coveralls
npm run test:e2e   # playwright — smoke test end-to-end (home pública → /paciente → Consultas → Historial)
npm run storybook  # http://localhost:6006 — catálogo de componentes
npm run lint
npm run type-check
```

CI (`.github/workflows/ci.yml`) corre `type-check` + `lint` + `test:coverage` + `build` y, en un job aparte, `test:e2e`, en cada push/PR a `main`/`master`.

**`npm install` y `@eumedical/shared`:** el `package.json` original incluye `@eumedical/shared`, un paquete con scope privado no publicado en el registro público de npm — un `npm install` limpio sin acceso a ese registro falla con `404 Not Found`. Lo quité de `dependencies` (verifiqué antes que no se usa en ningún archivo de `src/`) para poder instalar, compilar y testear en cualquier entorno. Si el registro privado real está disponible, hay que reintegrarlo antes de conectar el backend de la compañía.

**Node:** `engines.node` pide `>=24.0.0`; en un entorno con una versión menor, `npm install` imprime un warning `EBADENGINE` no bloqueante.

**Deploy (Vercel):** https://eumedical-trainee-challenge.vercel.app. `vercel.json` define un rewrite (`/(.*) → /index.html`), necesario porque `react-router-dom` maneja rutas client-side (`/paciente/*`); sin eso, refrescar una URL profunda da 404 en Vercel. El deploy quedó conectado al repositorio de GitHub, así que un push a `main`/`master` dispara un nuevo deploy automáticamente.

---

## Decisiones principales

**Metodología.** Encaré el reto con una estrategia SDD (spec-driven): el Brand Book, el brief del challenge (entregados por Eumedical para el proceso; no incluidos en este repo por ser material confidencial de la empresa) y el `package.json` de partida funcionaron como la especificación base a partir de la cual construí toda la guía de dirección visual y de producto, antes de tocar un componente. Usé **Cloud Design** para el boceto principal y **Figma Make** para generar assets y guías visuales de apoyo.

**Marca.** Partí del Brand Book de Eumedical (paleta, tipografías, cruz como símbolo, degradados a 45º, criterio fotográfico) y del contenido real de `eumedical.es`, evitando copiar su layout (cards de icono repetidas, bloque de servicios duplicado). Usé [Impeccable](https://github.com/pbakaus/impeccable) como guía de dirección visual y como auditoría real de patrones anti-diseño-genérico contra el resultado final (ver "Problemas encontrados").

- Color: `#1e4865` (navy, primario), `#79b19c`/`#2f6653` (sage, oscurecido para pasar contraste AA), `#e79f1a`/`#efbc0b` (dorado, CTAs), degradado a 45º navy→sage en el hero (regla explícita del manual de marca).
- Tipografía: **Fredoka** para titulares (sustituye a "Dinosaur Book", que no es una fuente web pública; geométrica redondeada con el mismo carácter humanista de la marca), **Didact Gothic** para subtítulos (fuente secundaria real del manual), **Arial** para cuerpo de texto (tal como especifica el manual para "cuerpos largos de texto").
- El signo "+" del logo se reutiliza como marcador gráfico recurrente en vez de bullets genéricos.
- Sin fotografía de stock genérica: dirección mayormente gráfica (formas, cruz, degradados) más un "chip" de UI simulando una teleconsulta en vivo; única excepción, una foto de equipo médico con licencia libre en "Sobre nosotros", usada de forma genérica y no como staff real de Eumedical.

**Parte A — Sitio público.** Header/nav responsive, hero, capacidades (propuesta de valor), servicios, bloque de confianza/métricas (90k pacientes, 250 médicos, 70k recetas, 10 especialidades, 4.9/5 — cifras reales del sitio actual), sección corporativa/cobertura, contacto (formulario mock, sin backend) y footer. Accesibilidad: skip-link, foco visible, `prefers-reduced-motion`, jerarquía de encabezados corregida, contraste AA, navegación completa por teclado.

Decisiones de UX clave:
- **Globo 3D interactivo en el hero para demostrar presencia mundial** (`Globe.tsx`, Three.js), en vez de un mapa estático o solo la cifra "80+" suelta: cada país real de la red (fuente: contenido de eumedical.es) tiene su propio marcador recorrible/hoverable con tooltip de nombre. La idea es que la presencia internacional se sienta explorable y verificable —"puedo pasar el mouse y ver qué países cubren"— en vez de una promesa de marketing sin sustento, coherente con el posicionamiento real de la compañía (red médica propia en 80+ países, no un agregador ni un mapa decorativo).
- **La sección "Cómo funciona" muestra el producto real por dentro, no solo texto de proceso**: cada paso (contacto → asignación → resolución → seguimiento) está sincronizado con una captura real de la propia app de paciente, dentro de una barra de "navegador" simulada (`app.eumedical.com/paciente`), con zoom/lightbox para inspeccionarla en grande (`PatientAppShowcase.tsx`, `ShowcaseLightbox.tsx`). Para un paciente o un B2B evaluando el servicio antes de registrarse, ver el dashboard/consultas/historial/documentos reales pesa más que una ilustración genérica — y diferencia de la web actual, que no muestra nunca el producto detrás del marketing.
- **Los testimonios se leen como recomendaciones de pacientes, sin declarar más de lo que se puede sostener**: el texto de cada cita se tomó del slider de testimonios de `eumedical.es`, pero esa página solo publica el 4.9/5 agregado (ya cubierto en el bloque de confianza), no nombre, foto ni valoración por reseña individual — así que en `TestimonialCarousel.tsx` el nombre, la foto y la valoración en estrellas de cada tarjeta son ilustrativos, no datos verificados del paciente real, y quedan documentados como tales en el propio componente. Igual se marca como contenido de terceros y no como afirmación de la marca (`aria-label="Opiniones de pacientes"`, rol de carrusel anunciado para lectores de pantalla).

**Parte B — Área de paciente (UX).** El brief del reto (sección 4) pide explícitamente dashboard, próximas consultas con acceso a teleconsulta, historial, documentos/informes, recetas, y datos de perfil y soporte — con las pantallas principales, navegación propuesta y una breve explicación de las decisiones UX. Prototipo navegable (no solo mockup estático) con: **Inicio/Dashboard** (próxima consulta con CTA principal para unirse a la videoconsulta, recetas activas y últimos estudios como accesos directos), **Consultas** (pestañas Próximas/Historial, botón de unión directo en teleconsultas), **Estudios** (informes y resultados descargables, con filtros), **Recetas** (activas/caducadas + estado vacío con guía para generar QR de farmacia), **Perfil** y **Soporte**.

Decisiones UX clave:
- La acción más frecuente y urgente (**unirse a la videoconsulta**) es siempre el primer elemento visible del dashboard, no un ítem más de una lista — prioriza claridad y rapidez en un contexto sanitario. Debajo, el resto del inicio muestra directo los últimos movimientos del paciente (recetas activas, estudios nuevos disponibles, próximas consultas) en vez de un menú genérico, porque es lo que alguien que vuelve a la app necesita encontrar primero (`DashboardPage.tsx`).
- Barra lateral con las 6 secciones pedidas por el reto, siempre visible, para que el paciente nunca pierda referencia de dónde está (importante para un usuario que puede estar ansioso o no ser experto en tecnología).
- Estados vacíos con texto orientado a la acción (no solo "no hay datos"), siguiendo el criterio de trato humano del propio manual de marca.
- Reutiliza los mismos tokens de marca que el sitio público para que la transición del marketing al producto se sienta como la misma compañía.
- Loading skeleton real (~500ms simulados) en vez de un spinner genérico al entrar a `/paciente`, para comunicar progreso concreto en vez de una espera indefinida.
- Errores explícitos (`toast.error`) en vez de botones muertos para "Unirse" y "Descargar" cuando no hay backend real detrás — falla de forma visible y explicada, no en silencio.
- Página 404 dedicada dentro del shell de paciente (conserva el sidebar) en vez de una pantalla en blanco, para que el usuario nunca pierda el contexto de navegación.
- Cuenta y notificaciones siempre accesibles, no solo desde el dashboard: `PatientTopBar` (menú de cuenta + campana de notificaciones) vive en el shell de paciente y acompaña cualquier pantalla (Recetas, Soporte, etc.), así el paciente nunca tiene que volver al inicio para cerrar sesión o revisar un aviso nuevo.
- Cancelar una consulta es inmediato, con confirmación por `toast.success` en vez de un modal de confirmación (`AppointmentsPage`, `DashboardPage`): prioricé velocidad para una acción reversible en un contexto sin backend real ni penalización por cancelación tardía. Lo señalo como decisión consciente, no como un hueco — con un backend real que sí penalice cancelaciones tardías, agregaría una confirmación explícita antes de ejecutar la acción.

**Arquitectura.** Mismo proceso SDD descrito en "Metodología" (spec del challenge y Brand Book → boceto en Cloud Design → assets en Figma Make → componentes). Atomic design (`components/{atoms,molecules,organisms,templates,pages}`, con lo específico de pacientes namespaceado en un subfolder `patient/` dentro de cada nivel), Tailwind v4 con los tokens de marca declarados una vez en `src/styles/tokens.css`, `react-router-dom` para las rutas (`/paciente/*` como layout con rutas anidadas, catch-all 404), y `zustand` para el estado mockeado de paciente (citas, estudios, recetas, perfil) — así un backend real solo tendría que reemplazar las fixtures por llamadas a la API sin tocar los componentes.

```
src/
  App.tsx, main.tsx, index.css
  hooks/useDocumentTitle.ts
  utils/teleconsulta.ts
  styles/tokens.css
  store/patientStore.ts
  mocks/            # fixtures tipadas, sin backend real
  components/{atoms,molecules,organisms,templates,pages}/
e2e/patient-area.spec.ts
```

**Herramientas.** Usé Claude para generar y componentizar el código, `npx impeccable detect`/`critique` como auditoría real de patrones de diseño anti-genérico (no solo una referencia decorativa) y `registry.npmjs.org` para verificar cada versión de paquete citada abajo contra datos reales en vez de asumir. Puedo explicar cualquier decisión de código o de diseño tomada en este documento.

---

## Problemas encontrados

Además de los del `package.json` (sección siguiente):

- `eslint.config.js` llamaba a `reactHooks.configs.flat.recommended`, que no existe en la versión de `eslint-plugin-react-hooks` fijada (`^5.2.0`) — `npm run lint` fallaba con un `TypeError` antes de analizar un solo archivo. Corregido a `reactHooks.configs['recommended-latest']`.
- `npm run test:e2e` apuntaba a `playwright.e2e.config.ts`, que no existía en el repo — el script estaba roto desde el `package.json` de partida. Lo creé junto con `e2e/patient-area.spec.ts`.
- `vite.config.ts` no excluía `e2e/**` del runner de Vitest, así que `npm run test` intentaba ejecutar los specs de Playwright como si fueran tests de Vitest y fallaba. Agregado a `test.exclude`.
- `video.play().catch(...)` en la tarjeta de video de "Cómo cuidamos a tus pacientes" rompía porque `play()` puede devolver `undefined` en vez de una Promise (pasa en jsdom y en algunos navegadores). Corregido a `video.play()?.catch(...)`.
- El botón "← Volver al sitio" del sidebar de paciente tenía contraste 2.2:1 (texto blanco sobre fondo dorado): la clase `bg-none!` solo limpia `background-image`, no `background-color`, así que el dorado del botón base seguía debajo del texto. Corregido a `bg-transparent!`.
- `PatientLoadingSkeleton.tsx` estaba construido pero no se usaba en ningún lado — el comentario en el código apuntaba a un `AppShell` que ya no existe. Ahora `PatientShellTemplate` lo muestra durante una carga inicial simulada al entrar a `/paciente`.
- No había ruta 404 ni dentro ni fuera de `/paciente`: cualquier URL inválida no mostraba nada.
- `PRODUCT.md` describía la app como "boilerplate de Vite sin usar", desactualizado desde que Partes A y B ya estaban implementadas en `src/`.
- No existía ningún pipeline de CI, solo el hook de pre-commit local de Husky.
- `npm run build` avisaba de un único chunk de ~1.1MB minificado: al diagnosticarlo, la gran mayoría no era código propio del sitio (~46kB) sino Three.js, la librería 3D detrás del globo interactivo del hero.
- Auditoría con Impeccable (`detect`/`critique`) contra el sitio público y el área de paciente: encontró contrastes por debajo de AA (`sage` sobre fondos claros, blanco sobre dorado) y saltos de nivel de encabezado (`h2` → `h4` sin `h3`) — corregidos. También dos párrafos sin ancho máximo de línea — corregido con `max-w-[65ch]`. Quedan hallazgos descartados conscientemente (no por descuido): `overused-font: arial` (especificado por el Brand Book, página 14, para cuerpos de texto) y falsos positivos de contraste sobre un gradiente con stop `transparent`, verificados manualmente contra el color real de fondo en esa posición.
- Limitaciones conocidas, no resueltas en esta entrega por implicar una decisión de producto fuera de alcance: el bloque de QR de recetas no tiene una acción real detrás del copy que la promete; las recetas caducadas no ofrecen una ruta de renovación; "Volver al sitio" desaparece en mobile sin salida alternativa; el formulario de contacto no tiene estilos de error inline (solo validación nativa del navegador).
- Auditoría de `docs/brand/package-trainee-challenge.json` completa contra el `package.json` actual y el uso real en `src/`: `quality-check`, `lint:ci` y `type-coverage:ci` corren limpios hoy (type-coverage da 99.89%, por encima del mínimo de 95% pedido por el propio script). `npm run dead-code:check` (`knip`) sí encuentra deuda real: 24 `dependencies` y 12 `devDependencies` sin ningún import en `src/` — la mayoría (`axios`, `@supabase/*`, `@twilio/conversations`, `twilio-video`, `date-fns`, `jspdf`, `qrcode`, `zod`, `msw`, `supabase`, etc.) corresponde a integraciones de backend real que el challenge no pide implementar, así que las dejé como referencia de stack para cuando haya backend en vez de sacarlas — a diferencia de `@eumedical/shared`, ninguna rompe el install. También marcó un componente sin uso real, `SectionHead.tsx`, y dos exports duplicados en `src/i18n/locales/{es,en}.ts`.

---

## Cambios realizados al `package.json`

Verifiqué cada paquete contra el registro real de npm (`registry.npmjs.org`) en vez de asumir. Hallazgos:

### Bugs corregidos
1. **`react` ^19.2.4 vs `react-dom` ^18.3.1 — incompatibilidad de versión mayor.** React y ReactDOM deben ir en la misma mayor; mezclar 19 con 18 rompe el render (hooks inválidos, "two copies of React"). `@types/react` y `@types/react-dom` ya apuntaban a 19, confirmando que 18 en `react-dom` era el error. **Fix:** `react-dom` → `^19.2.4`. También alineé `react-is` a `^19.2.4` (antes `^19.0.0`, funcional pero innecesariamente desalineado).
2. **`terser` ausente.** El script `build` usa `vite build --minify terser`, pero desde Vite 3 el minificador Terser no viene incluido por defecto: hay que instalarlo aparte o el build falla. **Fix:** añadido `terser` a `devDependencies`.
3. **`@types/node` ^25.2.3 vs `engines.node` >=24.0.0.** Los tipos de Node deben ir alineados a la versión de runtime objetivo; usar tipos de Node 25 sobre un runtime garantizado de Node 24 puede exponer APIs/tipos que no existen en producción. **Fix:** `@types/node` → `^24.9.2` (última de la línea 24, que sí existe en el registro).
4. **`build:dev` no es multiplataforma.** `NODE_OPTIONS=--max-old-space-size=4096 vite build ...` es sintaxis de shell POSIX; falla en `cmd.exe` de Windows. **Fix:** añadido `cross-env` como devDependency y antepuesto al script.

### Riesgos documentados (no corregidos con un simple bump de versión — requieren decisión de producto)
5. **Twilio Programmable Video llega a su fin de vida el 5 de diciembre de 2026.** El stack usa `twilio-video`, `@twilio/video-processors` y `@twilio/voice-sdk` para la teleconsulta — el corazón del producto ("TELECONSULTA 24/7"). Twilio anunció el EOL de Programmable Video y lo extendió una vez (de dic-2024 a dic-2026); a la fecha de este reto quedan ~2,5 meses. Esto **no se arregla en el `package.json`**: es una migración de proveedor (Twilio recomienda Zoom Video SDK) que debería priorizarse antes que cualquier feature nueva de UI.
6. **`@eumedical/shared` (^0.24.0)** es un paquete con scope privado; no está en el registro público. El `package.json` por sí solo no garantiza que el pipeline de CI tenga acceso (requiere `.npmrc`/token al registro interno) — lo señalo porque un `npm install` en limpio fallará sin esa configuración, y no es visible solo mirando este archivo.
7. `@tanstack/react-query` (^5.90.21) y `@tanstack/react-query-devtools` (^5.91.3) van en versiones menores desalineadas entre sí; no rompe nada hoy, pero conviene fijarlas juntas para evitar incompatibilidades futuras entre el core y las devtools.

---

## Mejoras que haría con más tiempo

- Añadir `resolutions`/`overrides` (o migrar a un lockfile con `npm-check-updates --target minor` en CI) para detectar automáticamente desalineaciones de versión mayor como la de React/ReactDOM en cada PR.
- Sustituir `twilio-video` por una prueba de concepto con Zoom Video SDK antes de que expire el soporte de Twilio Programmable Video.
- Un test de humo que monte un componente con `ReactDOM.createRoot` en CI, que habría hecho fallar el build inmediatamente con el mismatch de versión de React en vez de descubrirlo en runtime.
- Diseñar el flujo real de generación de QR de recetas (y qué pasa al pulsarlo) y una ruta de renovación para recetas caducadas — ambas son decisiones de producto que preferí documentar como recomendación en vez de inventar sin confirmar.
- Estilos de error inline en el formulario de contacto, hoy dependiente solo de la validación nativa del navegador.
- Evaluar una librería de globo 3D más liviana o un fallback 2D para conexiones lentas, si el peso de Three.js se confirma como un problema real medido más allá del aviso de build.
- Sumar más cobertura end-to-end: hoy Playwright cubre un solo flujo (home pública → área de paciente → Consultas → Historial), no cada pantalla.
- Confirmación explícita antes de cancelar una consulta, si un backend real llega a penalizar cancelaciones tardías.
- Definir el copy final con el público objetivo confirmado: hoy se mantuvo en líneas generales el copy de la página original pero reorientado a negocio/cliente (CTAs tipo "solicitar demo"), pensando en prestadoras que Eumedical contacta para que adquieran el servicio — con más tiempo conviene cerrar ese público objetivo antes de terminar de ajustar el copy.
- Afinar el área de paciente con un flujo real de uso: qué información falta o sobra, y qué interacciones adicionales harían falta (por ejemplo, un botón de llamada urgente) una vez que haya visibilidad de cómo lo usa un paciente real.
