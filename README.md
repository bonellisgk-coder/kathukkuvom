# kathukkuvom ⚗️

**kathukkuvom** is an interactive Inorganic Qualitative Analysis Virtual Lab — a React-based web app that lets students practice identifying acid radicals and basic radicals from unknown inorganic salt mixtures through realistic virtual experiments.

## Features

- 🔬 **Interactive Workbench** — Test tube animations, Bunsen burner, precipitate/gas/fume visual effects
- 📋 **Auto-Logging Lab Record** — Observations, inferences auto-logged in real time
- 🗺️ **Group Separation Flowchart** — Visual guide through analytical groups
- 🧪 **40+ Tests** — Preliminary, SCE Confirmatory, and Cation Group Analysis stages
- 🎯 **Guided & Exam Modes** — Learn with hints or test yourself blind
- 📝 **Final Report** — Submit, score, and print your lab record (Page 39 format)
- 📱 **Fully Responsive** — Mobile bottom tabs + desktop 3-column layout
- 🌤️ **Light Theme** — Clean white glassmorphism UI

## Tech Stack

- **React 19** + **Vite 8**
- **Framer Motion** — animations
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **Plus Jakarta Sans** font (Google Fonts)

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── NavBar.jsx          # Responsive top navigation
│   ├── ReagentSidebar.jsx  # Tests & reagents panel
│   ├── Workbench.jsx       # Interactive lab bench
│   ├── ObservationLog.jsx  # Auto-logged record table
│   ├── FlowChart.jsx       # Group separation guide
│   ├── FinalReportModal.jsx# Submit & score report
│   ├── TestTube.jsx        # Animated test tube
│   └── BunsenBurner.jsx    # Animated burner
├── engine/
│   └── chemistryEngine.js  # All chemistry logic & reactions
├── App.jsx                 # Responsive layout (mobile + desktop)
└── index.css               # Design system + media queries
```

## Chemistry Coverage

| Stage | Tests |
|---|---|
| Preliminary & Anions | Physical colour, dil. HCl, conc. HCl, dil. H₂SO₄, conc. H₂SO₄, flame test, AgNO₃, BaCl₂ |
| SCE Confirmatory | CO₃, S, Cl, SO₄, NO₃, Br, F, BO₃, C₂O₄, PO₄ |
| Cation Groups | Groups 0, I, IIA, IIB, III, IV, V, VI with confirmatory tests |

---

Built for inorganic chemistry lab practice. 🧪
