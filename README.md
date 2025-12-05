# F1 2026 — Calendario Web (no oficial)

Web ligera que muestra el calendario de la temporada F1 2026, las sesiones y una cuenta atrás hacia la próxima carrera.

![Logo](public/logo.png)

---

**Estado**: Versión lista para producción. Estilos en CSS clásico (`style.css`).

**Demo (pendiente)**: https://JoseAlvarezDev.github.io/f1-2026-web

## Contenido
- `index.html` — entrada HTML
- `src/` — componentes React (`App.jsx`, `main.jsx`)
- `public/` — assets estáticos (logos, fondos, sonidos)
- `style.css` — hoja de estilos principal
- `package.json` — scripts y dependencias

## Requisitos
- Node.js 18+ (o LTS reciente)
- npm

## Inicio rápido (desarrollo)

```bash
git clone https://github.com/JoseAlvarezDev/f1-2026-web.git
cd f1-2026-web
npm install
npm run dev
```

Abrir `http://localhost:5173` en tu navegador.

## Build y preview

```bash
npm run build
npm run preview
```

El resultado de producción queda en la carpeta `dist/`.

## Scripts útiles
- `npm run dev` — servidor de desarrollo (Vite)
- `npm run build` — build producción
- `npm run preview` — servir build local
- `npm run optimize-images` — convierte `public/*.(png|jpg|jpeg)` a `.webp` usando `imagemin-cli`

## Accesibilidad y buenas prácticas
- Tarjetas navegables por teclado (`role`, `tabIndex`, `aria-*`).
- `alt` en logos e imágenes y `loading="lazy"` donde aplica.
- `style.css` define variables de color para facilitar cambios de tema.

## Optimizar imágenes
Se incluye un script para generar `.webp` con `imagemin-cli`.

```bash
npm run optimize-images
```

Esto generará versiones `.webp` en `public/` sin eliminar los originales.

## Despliegue a GitHub Pages

Si quieres que yo lo haga desde aquí, puedo ejecutar los pasos. Si prefieres hacerlo tú:

1) Asegúrate de tener `gh` (GitHub CLI) y estar autenticado.
2) Ejecuta (desde la raíz del repo):

```bash
# Inicializar repo local y push inicial si no está hecho
git init
git add .
git commit -m "Initial commit: F1 2026 web"

# Crear repo en GitHub y hacer push (reemplaza el owner/nombre si hace falta)
gh repo create JoseAlvarezDev/f1-2026-web --public --source=. --remote=origin --push

# Publicar build en gh-pages (opcional)
npm run build
mkdir -p /tmp/f1-pages-deploy
cp -r dist/* /tmp/f1-pages-deploy/
cd /tmp/f1-pages-deploy
git init
if git rev-parse --verify origin/gh-pages >/dev/null 2>&1; then git checkout -b gh-pages; else git checkout -b gh-pages; fi
git add .
git commit -m "Deploy site: GitHub Pages"
git remote add origin https://github.com/JoseAlvarezDev/f1-2026-web.git
git push -u origin gh-pages --force
```

Alternativa (si `gh` soporta Pages):

```bash
gh pages deploy --dir=dist --branch=gh-pages --message "Deploy site"
```

La URL será `https://JoseAlvarezDev.github.io/f1-2026-web`.

## Licencia
Si quieres, puedo añadir un `LICENSE` (recomiendo MIT). Dime si lo añado.

## Créditos
- Desarrollo: Jose Alvarez — https://github.com/JoseAlvarezDev
- Iconos: Material Icons (Google)

---

Si quieres que haga el push y publique la `gh-pages` ahora mismo, ejecuto los pasos (veo `gh` autenticado). También puedo añadir `LICENSE` y plantillas para issues/PRs.
