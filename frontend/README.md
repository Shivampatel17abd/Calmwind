<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
=======
# CalmWind Frontend

CalmWind is a student mental wellbeing web application designed to help students track and understand the relationships between their mood, sleep, and stress, while connecting them to resources and real support when they need it.

## Overview (Phase 1)

This package contains the static landing page for CalmWind built with React and Tailwind CSS.

### Components

- `src/components/Navbar.jsx` - Header navigation with CalmWind branding, quick section links, and a support action button.
- `src/components/Hero.jsx` - Welcoming hero banner introducing CalmWind with a primary call to action.
- `src/components/Features.jsx` - Responsive grid showcasing the 8 core application features:
  1. Connected tracking
  2. Daily check-in
  3. Pattern dashboard
  4. Private journal
  5. Mood-based picks
  6. Helpline directory
  7. Habit nudges
  8. Peer support forum
- `src/components/Footer.jsx` - Footer containing the student project disclaimer.

## Tech Stack

- **React 19**
- **Vite 8**
- **Tailwind CSS v4**
- **Oxlint**

## Getting Started

### Prerequisites

Ensure [Node.js](https://nodejs.org/) (v18+) is installed.

### Installation

```bash
cd frontend
npm install
```

### Running Locally

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

### Linting

```bash
npm run lint
```
>>>>>>> 704d70a30c6a3b278b3c3bdd0c390974410d4c9d
