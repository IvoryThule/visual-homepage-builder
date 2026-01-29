# HomePageExample — Portfolio Generator & Templates

**Overview**

HomePageExample contains multiple static portfolio templates and a visual "Portfol.io Generator" built with React + Vite. The generator enables users to create, preview and export a static personal homepage directly in the browser — no backend required.

---

## Demo / Screenshot (placeholder)

Insert a demo GIF or screenshot here:

![Demo GIF or Screenshot](./assets/demo.gif)

(Place your actual image in `assets/` or `docs/` and replace the path above.)

---

## Key Highlights

- WYSIWYG visual editor (edit — live preview — export)
- Bento Grid layout + Glassmorphism styling
- Client-side export: produces a deployable static HTML/CSS/JS ZIP
- Modular components: tags, project cards, social links, avatar/background upload

---

## Quick Start (portfolio-generator)

Requirements:

- Node.js 16+
- npm or yarn

Run locally:

```powershell
cd .\portfolio-generator
npm install
npm run dev
```

Open:

```
http://localhost:5173
```

Build & preview production:

```powershell
npm run build
npm run preview
```

Production artifacts (when built) are in `portfolio-generator/dist/` and can be deployed to GitHub Pages / Vercel / Netlify.

---

## Detailed Structure

```
HomePageExample/
├─ LICENSE
├─ README.md            # Chinese README
├─ README.en.md         # This English README
├─ neo-portfolio.html
├─ personal-portfolio.html
├─ images/
├─ js/
└─ portfolio-generator/
   ├─ index.html
   ├─ package.json
   ├─ postcss.config.js
   ├─ tailwind.config.js
   ├─ vite.config.mts
   ├─ src/
   │  ├─ App.jsx
   │  ├─ main.jsx
   │  ├─ index.css
   │  ├─ components/
   │  │  ├─ Editor.jsx
   │  │  ├─ Preview.jsx
   │  │  └─ ui/
   │  │     ├─ Badge.jsx
   │  │     ├─ Button.jsx
   │  │     ├─ CategoryCard.jsx
   │  │     ├─ Input.jsx
   │  │     └─ Textarea.jsx
   │  └─ utils/
   │     └─ generateZip.js
   └─ dist/
```

---

## Customization Tips

- Theme color: set from the editor's `Primary Color` control.
- Avatar & background: upload in the editor (preview uses `URL.createObjectURL` for local preview; exported ZIP includes resources).
- Tags / Tech Stack: manage in the sidebar — they render as pills in the preview and in exported HTML.

---

## Export & Deploy

Click the `Export` button in the editor — the app will generate a ZIP with a ready-to-serve static site. Unzip and deploy the content to your preferred static host.

---

## Contributing

1. Fork the repo and create a branch:

```bash
git checkout -b feature/your-feature
```

2. Make changes, commit, and push:

```bash
git add .
git commit -m "feat: description"
git push origin feature/your-feature
```

3. Open a Pull Request.

---

## License

MIT — see `LICENSE` file for details.
