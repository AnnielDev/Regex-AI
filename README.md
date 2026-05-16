# Regex AI

Regex AI es una aplicacion web para generar expresiones regulares a partir de lenguaje natural, explicarlas de forma mixta (tecnica + clara), y validarlas al instante con ejemplos reales.

## Que hace la app

- Convierte una solicitud en texto (por ejemplo, "regex para validar UUID v4") en un patron regex utilizable.
- Entrega una explicacion detallada del patron:
  - resumen
  - desglose por tokens
  - anclas y flags
  - casos limite
  - notas de rendimiento
  - riesgo de ReDoS
- Muestra ejemplos validos e invalidos sugeridos.
- Incluye un live tester para comprobar coincidencias en tiempo real.
- Soporta i18n en ingles y espanol.
- Persiste el idioma seleccionado en `localStorage`.

## Requisitos

- Node.js `>=20.17.0`
- pnpm `>=10.14.0`

## Instalacion

```bash
pnpm install
```

## Variables de entorno

Configura tus variables de entorno locales con:

- una API key valida del proveedor de IA
- (opcional) el modelo a utilizar

Nota: la app necesita una API key para poder generar regex.

## Ejecutar en desarrollo

```bash
pnpm dev
```

## Build de produccion

```bash
pnpm build
```

## Estructura principal

```text
src/
  components/home/         # Componentes reutilizables de Home
  composables/             # Logica compartida (useRegexGenerator)
  i18n/
    locales/en/            # Traducciones EN por namespace
    locales/es/            # Traducciones ES por namespace
  layout/                  # MainLayout con nav global
  router/                  # Rutas y titulo dinamico por locale
  utils/groq.ts            # Cliente Groq con fetch
  views/                   # Home, About, NotFound
```

## Flujo funcional

1. El usuario escribe una solicitud en Home.
2. La app envia el prompt a Groq y exige una respuesta JSON estructurada.
3. Se parsea y valida el payload recibido.
4. Se renderizan regex, explicacion avanzada y ejemplos.
5. El usuario prueba entradas en Live Tester y ajusta su solicitud si es necesario.

## Scripts

- `pnpm dev`: levanta entorno local.
- `pnpm build`: chequeo de tipos + build de produccion.
- `pnpm preview`: previsualiza build local.

## Notas

- Si cambias variables de entorno, reinicia `pnpm dev`.
- El boton de idioma actualiza el locale global y lo guarda para futuras sesiones.
