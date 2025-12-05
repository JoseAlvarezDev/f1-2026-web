# F1-2026 Web

Breve guía del proyecto y comandos útiles.

## Requisitos

- Node.js 18+ (o versión LTS reciente)
- npm

## Comandos principales

- `npm run dev` — Inicia Vite en modo desarrollo.
- `npm run build` — Genera el build de producción.
- `npm run preview` — Sirve el build localmente.

## Optimización de imágenes

Se añadió un script para optimizar/convertir imágenes a WebP usando `imagemin-cli`.

- Ejecutar optimización:

```bash
npm run optimize-images
```

---

NOTA: Este README fue actualizado automáticamente para reflejar el estado actual del proyecto.

Resumen de cambios recientes

- El proyecto fue revertido a CSS clásico (`style.css`) tras una migración a Tailwind.
- Se añadieron mejoras de accesibilidad y optimización de imágenes (script `optimize-images`).

Instrucciones rápidas para crear y publicar el repositorio en GitHub (usar `gh`):

```bash
# Inicializar repo local si no está hecho
git init
git branch -M main
git add .
git commit -m "Initial commit: F1 2026 web"

# Crear repo en GitHub y hacer push (reemplaza el nombre si prefieres otro)
gh repo create JoseAlvarezDev/f1-2026-web --public --source=. --remote=origin --push

# Publicar build en GitHub Pages
npm run build
mkdir -p /tmp/f1-pages-deploy
cp -r dist/* /tmp/f1-pages-deploy/
cd /tmp/f1-pages-deploy
git init
git checkout -b gh-pages
git add .
git commit -m "Deploy site: GitHub Pages"
git remote add origin https://github.com/JoseAlvarezDev/f1-2026-web.git
git push -u origin gh-pages --force
```

Si quieres, ejecuto estos pasos desde aquí (veo que `gh` está autenticado con tu cuenta). Dime si lo hago ahora.

Este comando ejecuta `npx imagemin "public/*.{png,jpg,jpeg}" --plugin=webp --out-dir=public --ext .webp` y generará archivos `.webp` en la carpeta `public` (no elimina los originales). Es ideal para convertir imágenes grandes como `background.png` y mejorar tiempos de carga.

Si quieres cambiar la estrategia (por ejemplo, sobreescribir archivos PNG o optimizar en lote con otros plugins), dímelo y lo ajusto.

## Siguientes pasos recomendados

- Ejecutar auditoría de accesibilidad (axe) y resolver problemas reportados.
- Comprimir/optimizar otros assets (logos, imágenes de circuitos).
- Añadir un script CI para ejecutar `npm run optimize-images` previo al deploy.
