# Portafolio — Carlos Coloma

Portafolio profesional de **Carlos Coloma**, Design System Manager & UI Lead en Yanbal Internacional.
Sitio estático bilingüe (español / inglés) con casos de estudio sobre arquitectura de tokens,
pipelines design-to-code y gobernanza de sistemas de diseño.

🔗 **[portfolio.coloma.design](https://portfolio.coloma.design)**

## Stack

| Capa | Tecnología |
|---|---|
| Framework | [Astro](https://astro.build) — salida estática |
| Estilos | [Tailwind CSS v4](https://tailwindcss.com) (vía `@tailwindcss/vite`) + plugin typography |
| Contenido | Content Collections con schemas validados por Zod |
| Formulario | [Supabase](https://supabase.com) (insert desde el cliente) |
| Analíticas | Vercel Analytics + Speed Insights |
| Hosting | [Vercel](https://vercel.com) |

## Estructura

```text
src/
├── assets/          Fuentes variables (Figtree, Montserrat) e imágenes optimizadas por <Image>
├── components/      Button, Nav, Footer
├── content/casos/   Casos de estudio en Markdown, una carpeta por idioma (es/, en/)
├── data/            Experiencia y educación en JSON, un archivo por idioma
├── layouts/         Layout.astro — <head>, SEO, Open Graph
├── pages/           Rutas (ver i18n abajo)
├── styles/          global.css — @font-face y tokens de @theme
└── content.config.ts  Colecciones y sus schemas
public/              Favicons, manifest, sprite SVG de iconos, PDFs del CV
```

## Idiomas

Configurado con el i18n nativo de Astro (`astro.config.mjs`): español como idioma por defecto sin
prefijo, inglés bajo `/en`.

| Página | Español | Inglés |
|---|---|---|
| Home | `/` | `/en` |
| Sobre mí | `/sobre-mi` | `/en/about` |
| Contacto | `/contacto` | `/en/contact` |
| Caso de estudio | `/casos/[id]` | `/en/casos/[id]` |

Los casos de estudio viven en `src/content/casos/es/` y `src/content/casos/en/`; cada ruta filtra su
colección por el prefijo de idioma del `id`.

## Desarrollo local

```sh
npm install
cp .env.example .env    # completá las dos variables de Supabase
npm run dev             # http://localhost:4321
```

Las variables de entorno están documentadas en [`.env.example`](.env.example). El formulario de
contacto es lo único que las necesita: sin ellas el resto del sitio funciona igual.

| Comando | Acción |
|---|---|
| `npm run dev` | Servidor de desarrollo en `localhost:4321` |
| `npm run build` | Build de producción a `./dist/` |
| `npm run preview` | Previsualiza el build antes de deployar |

## Licencia

El código es de referencia. El contenido, los casos de estudio, las imágenes y el CV son
propiedad de Carlos Coloma Martínez — no los reutilices.
