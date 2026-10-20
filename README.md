# Krishna Katekhaye — AI Developer & Generative AI Portfolio

A modern, high-performance developer portfolio website designed with an AI aesthetic inspired by Linear and Vercel. Built with **React 19**, **TypeScript**, **Tailwind CSS**, and **Vite**.

![Portfolio Preview](./public/favicon.svg)

---

## ⚡ Key Highlights & Features

- **Futuristic AI Aesthetic**: Dark theme by default with deep slate/violet accents, glowing radial gradients, and a functional Light/Dark theme toggle.
- **Interactive Neural Fabric**: Custom HTML5 Canvas particle & synapse network in the Hero section responding gracefully to mouse interactions (with `prefers-reduced-motion` support).
- **Single Source of Truth**: All personal details, projects, verified achievements, and skills live in a single centralized file: [`src/data/portfolioData.ts`](./src/data/portfolioData.ts).
- **Honest Representation**: Early-career developer tone for a 1st-year BCA student. No fabricated claims, inflated percentages, or unverified awards.
- **Verified Achievements**: Direct verification link to Krishna's public Google Skills badge profile.
- **Project Concept Grid**: Showcases 5 candidate projects (EcoMind, VotePath India, StadiumGPT360, CoffeeMind, Climatora) with status tags (*In Progress*, *Concept*), architecture notes modal, and GitHub source links.
- **Direct Contact System**: Zero-backend honest mailto dispatch with automatic clipboard backup and celebratory confetti.
- **Resume Integration**: Direct download button wired to [`public/resume.pdf`](./public/resume.pdf).
- **Production Ready**: Optimized bundle size, SEO meta tags, Google Fonts (`Inter` + `JetBrains Mono`), and accessible keyboard navigation.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org/) |
| **Bundler** | [Vite](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS v3](https://tailwindcss.com/) with custom dark/light theme variables |
| **Icons** | [Lucide React](https://lucide.dev/) + Custom Brand SVGs |
| **Effects** | HTML5 Canvas Synapse Mesh + Canvas Confetti |

---

## 🚀 Running Locally

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### 2. Installation
Open your terminal in this directory:
```bash
# If using Windows PowerShell:
npm.cmd install

# Or standard bash:
npm install
```

### 3. Start Development Server
```bash
npm.cmd run dev
```
Open your browser at `http://localhost:5173`.

### 4. Build for Production
```bash
npm.cmd run build
```
This produces a static, production-optimized build in the `dist/` directory.

---

## 📝 Personalizing Your Information

To update any details on the website, simply open **[`src/data/portfolioData.ts`](./src/data/portfolioData.ts)**:

1. **Email**: Change `email: "krishnakatekhaye.dev@gmail.com"` to your primary email.
2. **LinkedIn**: Change `linkedin: "https://linkedin.com/in/krishna-katekhaye"` to your exact profile URL.
3. **Resume PDF**: Replace `public/resume.pdf` with your actual exported PDF resume. Keep the filename as `resume.pdf`.
4. **Projects**: Add, remove, or modify project titles, descriptions, and GitHub links in the `projects` array.
5. **Google Skills Badges**: Add new verified badges under the `achievements` array.

---

## 🌐 Free 1-Click Deployment

### Option A: Deploy to Vercel (Recommended)
1. Push this folder to a new GitHub repository (e.g. `krishna-portfolio`).
2. Go to [vercel.com](https://vercel.com) and log in with GitHub.
3. Click **"Add New Project"** and select `krishna-portfolio`.
4. Leave build settings as default:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Click **Deploy**. Your portfolio will be live on a fast global CDN with free SSL within 60 seconds!

### Option B: Deploy to GitHub Pages
1. Install `gh-pages`:
   ```bash
   npm.cmd install -D gh-pages
   ```
2. In `package.json`, add:
   ```json
   "homepage": "https://krishnakatekhaye10.github.io/krishna-portfolio",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Run `npm.cmd run deploy`.

---

## 📄 License
MIT License. Built for Krishna Katekhaye.
