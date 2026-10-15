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
