# KRISHNA: DIGITAL UNIVERSE 🎮🌌
### A Cinematic 3D Video-Game Personal Portfolio for Krishna Katekhaye

> *"Explore my world. Discover what I build."*

An award-winning interactive 3D video-game portfolio for **Krishna Katekhaye** — BCA student exploring Generative AI, procedural web graphics, modern web systems, and cloud architectures.

Rather than a conventional portfolio website with a background canvas, visitors become **the player** pilot exploring a futuristic cyber island at dusk. Move freely, explore 5 thematic zones, interact with holographic terminals, inspect project architectures, discover verified badges, and transmit communications.

---

## 🌟 Key Experience Features

- **🎮 Playable 3D Exploration**: Third-person hover drone surveyor with real velocity physics, levitation bobbing, banking turns, jump boosts, and boundary collision.
- **🖥️ Desktop & 📱 Mobile Controls**:
  - **Desktop**: `WASD` / `Arrow Keys` to move, `Space` to jump, `E` to interact, `Mouse` to look/orbit, `ESC` to pause.
  - **Mobile**: Touch virtual analog joystick for 360° navigation, on-screen `[E]` interact and `[JUMP]` buttons, touch camera swipe.
- **📍 Tactical Minimap Radar**: Real-time top-down 2D radar with scanning sweep, player location pointer, and one-tap fast-travel warp beacons.
- **⚡ Non-Game Recruiter Escape Hatch**: At any moment, visitors or recruiters can click **`CLASSIC PORTFOLIO`** in the top bar to immediately switch to a traditional, structured portfolio reading view without gameplay barriers.
- **🔊 Procedural Synthesized Soundscape**: Web Audio API ambient sci-fi drone (55Hz / 82.4Hz) with custom sound effects for terminal interactions, jumping, zone discoveries, and warp teleportation (100% procedurally generated, no external MP3 dependencies).
- **🌿 100% Procedural Three.js World**: No heavy downloaded 3D models or expensive asset packs. Built entirely from procedural geometry, volumetric exponential fog, and cybernetic materials.

---

## 🗺️ The 5 World Sectors

### 1. Zone 1 — The Origin (Spawn Plaza at `[0, 0, 0]`)
- Central spawn pad with concentric energy rings and floating singularity diamond.
- Developer overview: Krishna Katekhaye, BCA First Year student in India, building intelligent experiences with AI, code, and creativity.
- Holographic terminal with core philosophy, education, and quick portfolio jumper.

### 2. Zone 2 — Project City (`[-26, 0, -18]`)
- Cyber skyscrapers with holographic billboards and 5 interactive terminals:
  1. **EcoMind**: AI environmental intelligence & geospatial mapping.
  2. **VotePath India**: Multilingual civic literacy and democratic journey guide.
  3. **Local Language Voice AI**: Speech-to-speech vernacular Indian language assistant.
  4. **StadiumGPT360**: Immersive 360° sports fan companion and spatial QA.
  5. **Climatora**: Climate anomaly tracking & live meteorological telemetry.
- Each terminal opens a detailed specification modal with architecture layers, highlights, and verified GitHub repository links.

### 3. Zone 3 — Skill Lab (`[26, 0, -18]`)
- High-tech research pavilion with floating crystalline data matrices.
- Dual interactive consoles:
  - **Proven Stack (Used)**: React, TypeScript, JavaScript (ES6+), Python, C Programming, Three.js, Tailwind CSS, HTML5/CSS3, Git/GitHub, Google Cloud.
  - **AI Frontier (Currently Learning)**: Generative AI Agents & RAG (LangChain / LlamaIndex), Docker & Containerization, Vector Databases (Pinecone, ChromaDB), Kubernetes, Next.js, and WebXR.

### 4. Zone 4 — Achievement Vault (`[-20, 0, 24]`)
- Glowing digital sanctuary with crystalline arches.
- Central holographic artifact: **Verified Google Skills Badge #25567268** with a one-click button to view the official Google public profile verification.
- Hackathon participation and FOSS open-source community records.

### 5. Zone 5 — Connection Hub (`[20, 0, 24]`)
- Futuristic transmission station overlooking the digital horizon.
- *"Have an interesting idea? Let's build it."*
- One-click copy email button with instant feedback, contact form, GitHub ([@krishnakatekhaye10](https://github.com/krishnakatekhaye10)), and LinkedIn profile links.

---

## 🚀 Tech Stack

| Technology | Role |
| :--- | :--- |
| **React 19 & TypeScript** | Game state management, component tree, and type safety |
| **Three.js & @react-three/fiber** | Declarative 3D WebGL rendering pipeline |
| **@react-three/drei** | In-world 3D HTML markers, shader and math helpers |
| **Vite 8** | Modern build engine with automatic code-splitting |
| **Framer Motion & GSAP** | HUD interface animations and modal transitions |
| **Tailwind CSS** | Custom dark cyber design system with emerald/cyan glows |
| **Web Audio API** | 100% procedural sound effects and ambient drone |

---

## 🛠️ Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Production build verification
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 🚀 Publishing to GitHub Pages (`krishnakatekhaye10.github.io`)

The application is configured with `base: '/'` in `vite.config.ts` and automated through `.github/workflows/deploy.yml`.

### Step 1: Create Repository on GitHub
1. Log in to [GitHub](https://github.com/) with username **`krishnakatekhaye10`**.
2. Create a public repository named exactly:
   ```
   krishnakatekhaye10.github.io
   ```

### Step 2: Push Local Git Code
Run in PowerShell:
```powershell
cd C:\Users\krish\.gemini\antigravity\scratch\krishna-portfolio

# Verify remote is set to your target repository
git remote -v

# Push to main
git push -u origin main
```

### Step 3: Enable GitHub Pages Actions
1. Go to: `https://github.com/krishnakatekhaye10/krishnakatekhaye10.github.io/settings/pages`
2. Under **Build and deployment** &rarr; **Source**, select:
   ```
   GitHub Actions
   ```
3. GitHub Actions will trigger, build, and deploy your site live to:
   **[https://krishnakatekhaye10.github.io/](https://krishnakatekhaye10.github.io/)**

---

## 📄 License

MIT &copy; Krishna Katekhaye
