# Project Context: Personal Portfolio Website

## 1. Project Overview
This is a single-page personal portfolio website for a Data Analyst. The goal is to showcase my skills and projects to potential employers and recruiters.

## 2. Target Audience
- Technical Recruiters
- Hiring Managers

## 3. Core Technologies
- **Framework & Build Tool:** React + Vite (migrated from Create React App to resolve Node 22 compatibility issues and simplify tooling)
- **UI Component Library:** Material-UI (MUI) v5 — used for all UI elements (buttons, cards, navigation, etc.)
- **Styling:** Emotion (`@emotion/react`, `@emotion/styled`) packaged with MUI
- **Deployment:** GitHub Pages (Vite build outputs static files in `dist/`)

## 4. Design Philosophy
- **Aesthetic:** Clean, modern, and professional. Minimalist design.
- **Responsiveness:** The website must be fully responsive and look great on desktop, tablet, and mobile devices.
- **Color Palette:** (We can decide this later, for now, we'll use MUI's default theme).

## 5. File & Component Structure
- All reusable components live in `src/components/`.
- Each component has its own folder (e.g., `src/components/Header/Header.jsx`).
- App composition in `src/App.jsx`; Vite entry is `src/main.jsx` and top-level `index.html` mounts `#root`.

## 6. Key Sections (Components to be built)
1. **Header:** Contains the main navigation bar.
2. **Projects:** A section to display project cards. This is the most important section.
3. **About:** A section with a brief bio and a list of technical skills.
4. **Contact:** Links to GitHub, LinkedIn, and email.

## 7. Development Commands (Vite)
- Start dev server: `npm run dev` (defaults to http://localhost:5173)
- Build for production: `npm run build` (outputs to `dist/`)
- Preview production build: `npm run preview`

## 8. Deployment (GitHub Pages)
- Build with `npm run build` and deploy the `dist/` folder.
- If using a repo subpath (username.github.io/repo), set `base: "/<repo>/"` in `vite.config.js`.
- Consider a GitHub Actions workflow to automatically build and deploy on push to `main`.

## 9. Development Workflow & Responsiveness
- Mobile-First Mandate: All components must be built using a mobile-first approach. Start development and styling with the browser window narrowed to a mobile viewport (approx. 375px).

- Breakpoint Scaling: Once a component is complete and looks perfect on mobile, use MUI's grid breakpoints (sm, md, lg) and the sx prop to adapt the layout for larger screens. Do not write desktop-specific styles first.

- Continuous Testing: Every component must be tested for responsiveness using browser developer tools before it is considered complete. Verify the layout on a small mobile, tablet, and desktop preset.

## 10. Key Changes Since Last Update
- Theme/Branding
- Global Styles
- Header
- Hero Layout
- Projects Grid/Cards/Data
- About Section Details
- Contact Section
- Footer
- Smooth Scrolling
- Full-Bleed Layout Pattern
- Commands

## 10a. Recent Changes (2025-09-13)
- Global Background Motion
  - Added `AuroraBackground` (`src/components/Background/AuroraBackground.jsx`): fixed, full-viewport canvas with subtle navy/indigo/purple morphing blobs; respects `prefers-reduced-motion`.
  - Integrated in `src/App.jsx` above the root background and below content: `<AuroraBackground />` renders first; content wrapped with `zIndex: 1` to sit on top.
  - Root purple gradient in `App.jsx` retained as the base color layer.

- Hero Section
  - Hero background set to `transparent` so global aurora and root gradient show through.
  - Divider line moved to Hero (`&:after` on the section Box) so it stays at the true bottom of the Hero content.
  - Animated description container constrained (`height: 64`, `overflow: hidden`) so Slide/Fade stays within bounds.
  - Added `py: 4` on Hero to create top/bottom spacing; avatar no longer touches the top.

- Section Dividers
  - `#projects` and `#about` wrappers in `src/App.jsx` include a subtle bottom divider via `:after`.

- Stacking/Background Rules
  - Keep section backgrounds transparent to avoid gradient cutoff/staking-context issues.
  - Global color comes from App root gradient; motion comes from `AuroraBackground`.

- Known Issue / Pending
  - Aurora visibility is currently too subtle over the purple base on some displays.
  - Next: tune `AuroraBackground` (increase alpha slightly, remove dark base fill, use `screen` composite) and verify no system-level reduced-motion setting is hiding animation.

## 11. Theme & Branding (New)
- Custom MUI theme in `src/theme.jsx` with:
  - palette.mode: `dark`
  - background.default: `#0A1929` (deep navy)
  - primary.main: `#64FFDA` (vibrant teal)
  - secondary.main: `#FFB74D` (golden orange)
- Global font: Inter (linked in `index.html`), set as theme default typography.
- Global background gradient applied via `GlobalStyles` in `src/main.jsx`.

## 12. App Structure & Providers (New)
- `src/main.jsx` wraps `<App />` with `ThemeProvider` and `CssBaseline`; removes theme creation from `App.jsx`.
- Index-level CSS ensures `html, body, #root` fill the viewport and removes demo centering.

## 13. Header & Navigation (Updated)
- `Header` (`src/components/Header/Header.jsx`):
  - Translucent AppBar with blur and divider border (no solid blue bar).
  - Desktop links shown on md+; mobile menu uses MUI `Menu`.
  - Links use `react-scroll` for smooth scrolling with offset to account for sticky header.

## 14. Hero Section (New/Refactored)
- `Hero` (`src/components/Hero/Hero.jsx`): full-viewport hero with three-column split layout.
  - Left: `<Data Analyst>` heading, short description, buttons (View Projects/Contact Me) using smooth scroll.
  - Center: prominent, bordered graphic (placeholder Avatar) for future split-face image.
  - Right: `<AI Engineer>` heading and short description.
- Full-bleed layout pattern: `Container maxWidth={false} disableGutters` with inner padded `Box`.
- Split layout active from `sm` breakpoint: `xs=12 sm=4 | 2 | 4`.

### 14a. Hero Pre-Aurora Gradient (Reference)
Before making the Hero background transparent to show the global aurora, the section used this radial ellipse gradient:

```css
background: radial-gradient(
  ellipse 120% 150% at center top,
  rgba(17, 42, 111, 0.6) 0%,      /* navy */
  rgba(15, 23, 42, 0.86) 50%,     /* deep slate */
  transparent 200%
);
```

Use this value if we need to temporarily revert the Hero to a local gradient while keeping the global aurora disabled.

## 15. Projects Section (Updated)
- `Projects` uses the full-bleed pattern and a responsive Grid: `xs=12`, `sm=6`, `md=4`.
- Reusable `ProjectCard` at `src/components/Projects/ProjectCard.jsx` with `Card`, `CardMedia`, `Chip`s, and action buttons.
- Centralized project data in `src/projectData.jsx`.

## 16. About Section (New)
- `About` (`src/components/About/About.jsx`) added back into the page between Projects and Contact:
  - Heading: “About Me”.
  - Two-column Grid: bio `xs=12 md=7`, skills `xs=12 md=5`.
  - Categorized skills (Data & Analytics, Programming & Automation, Tools) mapped to MUI `Chip`s.

## 17. Contact Section (Refactored)
- `Contact` now full-bleed with heading “Get In Touch” and an inviting sentence.
- Horizontal `Stack` of large buttons with icons: Email (mailto), LinkedIn, GitHub.

## 18. Footer (New)
- `Footer` (`src/components/Footer/Footer.jsx`) with dark background, centered copyright, and social `IconButton`s.
- Rendered at the bottom of the page in `App.jsx`.

## 19. Smooth Scrolling Targets
- Sections wrapped with IDs in `src/App.jsx` to match header/hero links:
  - `#hero`, `#projects`, `#about`, `#contact`.
- Each wrapper uses `scrollMarginTop` to land below the sticky header.

## 20. Full-Bleed Layout Pattern (Guideline)
- For wide, edge-to-edge sections, use:
  - `Container maxWidth={false} disableGutters` + inner `Box` with `px: { xs: 2, sm: 4, md: 8 }`.
- Apply this to Hero, Projects, and Contact (and future sections as needed).