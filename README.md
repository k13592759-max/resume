# Krishna Katekhaye — 3D Cinematic Developer Portfolio

An immersive, dark, procedural 3D developer universe built for **Krishna Katekhaye** — BCA student exploring Generative AI, procedural web graphics, modern web systems, and cloud architectures.

Inspired by the dark luxury aesthetics and scroll-driven spatial storytelling of [sebastien-lempens.com](https://sebastien-lempens.com/), engineered with 100% original procedural Three.js geometry, volumetric exponential fog, emerald and cyan cinematic lighting, and responsive UI overlays.

---

## 🌌 Live Architecture & Highlights

- **Live URL**: [https://krishnakatekhaye10.github.io/](https://krishnakatekhaye10.github.io/)
- **Repository**: `krishnakatekhaye10/krishnakatekhaye10.github.io`
- **Design Language**: Dark obsidian void (`#030708`), emerald (`#10B981`) and cyan (`#06B6D4`) volumetric lighting, procedural cyber grid horizon, translucent glassmorphism panels, and telemetry HUD overlays.
- **Procedural 3D World**: Zero large external 3D model files (`.gltf` / `.obj`). All crystalline cores, neural monoliths, portal nexus rings, data prisms, and beacon spires are generated at runtime via Three.js primitives and materials.
- **Scroll-Synchronized Camera**: A continuous 7-waypoint spline camera track interpolates with exponential damping as the user traverses the document.
- **Synthesized Ambient Audio**: Web Audio API dual-oscillator drone (55Hz / 82.4Hz) with lowpass resonant filtering and mute/unmute control.
- **Performance & Graceful Degradation**:
  - Lazy-loaded 3D Canvas via `React.lazy` and `Suspense`
  - Device pixel ratio capped at 1.5 (1.0 on mobile devices)
  - Particle count scales dynamically (850 desktop / 300 mobile)
  - Full WebGL context fallback: If WebGL is unavailable, a fluid CSS/SVG cybernetic field displays while keeping 100% of DOM content, navigation, and accessibility functioning.
  - Respects `prefers-reduced-motion`.

---

## 🚀 Tech Stack

| Technology | Role |
| :--- | :--- |
| **React 19 & TypeScript** | Component hierarchy, state reactivity, strict type safety |
| **Vite 8** | Next-generation frontend tooling, code-splitting, fast HMR |
| **Three.js & @react-three/fiber** | Declarative WebGL rendering pipeline |
| **@react-three/drei** | Three.js shader and math helpers |
| **Framer Motion & GSAP** | Cinematic UI overlays and modal transitions |
| **Tailwind CSS** | Custom emerald/cyan utility design system |
| **Lucide React** | Minimalist modern icons |
| **Web Audio API** | Procedural spatial soundscape |

---

## 📑 Portfolio Structure & Sections

1. **Intro**: Short, skippable cinematic calibration sequence (ESC/Enter to skip, audio toggle, progress meter).
2. **Hero (Sector 01)**: 3D Singularity Core with counter-rotating rings, introduction, live status indicator, and project CTA.
3. **About (Sector 02)**: BCA academic focus, computational philosophy, and core pillars.
4. **Selected Work (Sector 03)**:
   - **EcoMind**: AI environmental intelligence & geospatial mapping
   - **VotePath India**: Civic literacy & multilingual voter assistance
   - **Local Language Voice AI**: Speech-to-speech vernacular Indian language assistant
   - **StadiumGPT360**: Immersive 360° sports fan companion & spatial QA
   - **Climatora**: Climate anomaly tracking & live meteorological telemetry
5. **Skills (Sector 04)**: Strict separation between **Technologies Used** (Hands-on / Core) and **Technologies Learning** (Next-Gen AI & Cloud Frontier).
6. **Achievements (Sector 05)**: Configurable showcase featuring the verified Google Skills credential (Badge #25567268) and hackathon records.
7. **Journey (Sector 06)**: Interactive chronological voyage from academic foundations to AI exploration.
8. **Contact (Sector 07)**: Direct transmission portal, one-click email copy, GitHub & LinkedIn connections, and availability status.
9. **Interactive Resume**: ATS-compliant printable curriculum vitae modal.

---

## 🛠️ Project Configuration & Customization

All personal details, projects, skills, badges, and social channels are centrally managed in:
```
src/data/portfolioData.ts
```

### To update your contact email or LinkedIn:
Open `src/data/portfolioData.ts` and edit lines 55–65:
```typescript
email: "your.real.email@gmail.com",
github: "https://github.com/krishnakatekhaye10",
linkedin: "https://linkedin.com/in/your-verified-handle",
```

### To add or update projects:
Add an entry to `PORTFOLIO_DATA.projects` with:
- `title`, `tagline`, `description`, `status` (`Active` | `In Progress` | `Concept`)
- `category`, `accentColor`, `tags`, `githubUrl`, `highlights`, `architecture`

---

## 💻 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Build for production (TypeScript check + Vite bundling)
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 🚀 Publishing to GitHub Pages (`krishnakatekhaye10.github.io`)

This project is configured with `base: '/'` in `vite.config.ts` and includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.

### Step 1: Create the GitHub Repository
1. Log in to GitHub as `krishnakatekhaye10`.
2. Create a new public repository named exactly:
   ```
   krishnakatekhaye10.github.io
   ```
   *(Do not initialize with a README, .gitignore, or license since we already have them).*

### Step 2: Push Your Code to GitHub
Run the following commands in the project root directory:

```bash
cd C:\Users\krish\.gemini\antigravity\scratch\krishna-portfolio

# Initialize Git (if not already initialized)
git init

# Add all files
git add .

# Create initial commit
git commit -m "feat: complete immersive 3D developer portfolio"

# Set main branch
git branch -M main

# Add your GitHub repository remote
git remote add origin https://github.com/krishnakatekhaye10/krishnakatekhaye10.github.io.git

# Push to GitHub
git push -u origin main
```

*(If you already have a remote configured, use `git push origin main` or force update if replacing an older version).*

### Step 3: Enable GitHub Actions for Pages
1. Go to your repository on GitHub: `https://github.com/krishnakatekhaye10/krishnakatekhaye10.github.io`
2. Click **Settings** (top tab) &rarr; **Pages** (in the left sidebar under "Code and automation").
3. Under **Build and deployment** &rarr; **Source**, select:
   ```
   GitHub Actions
   ```
4. Push to `main` will automatically trigger the workflow at `.github/workflows/deploy.yml`.
5. Once the workflow completes (usually ~45 seconds), your website will be live at:
   ```
   https://krishnakatekhaye10.github.io/
   ```

---

## 📄 License

MIT &copy; Krishna Katekhaye
