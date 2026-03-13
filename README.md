# Strength Tracker

A mobile-first progressive web app for tracking a 2-day heavy full-body strength program. Built with React 18, TypeScript, Vite, and Tailwind CSS.

**Live app:** https://ruicsf.github.io/Workout-Tracker/

---

## Features

- **2-day training split** — Squat Emphasis (Day 1) and Deadlift Emphasis (Day 2)
- **Auto-progression** — app calculates your next target weight based on your last session's performance and RPE
- **Equipment substitution** — automatically swaps exercises when equipment isn't available (e.g. barbell bench → dumbbell bench)
- **Customizable rep style** — choose Strength (3–5), Hybrid (4–6), or Hypertrophy (6–8) for main lifts
- **RPE tracking** — log perceived effort per exercise; progression gates on your max RPE setting
- **Back-friendly mode** — caps main lift sets at 3 and limits barbell progression to +5 lb per session
- **Weekly schedule** — map Day 1 and Day 2 to any days of the week; app highlights today's session
- **Sport day** — mark a recovery/sport day to avoid scheduling heavy sessions adjacent to it
- **Session history** — every completed workout is saved locally; browse and delete past entries
- **Offline capable** — all data stored in browser localStorage, no account required
- **PWA-ready** — add to home screen on iOS/Android for a native app feel

---

## The Program

### Day 1 – Squat Emphasis

| Order | Exercise | Sets × Reps | RPE |
|-------|----------|-------------|-----|
| 1 | Back Squat | 4 × 4–6 | 8 |
| 2 | Bench Press | 3 × 6–8 | 8 |
| 3 | Romanian Deadlift | 3 × 6–10 | 7 |
| 4 | Pull-up | 3 × 5–8 | 8 |
| 5 | Plank | 3 × hold | — |
| 6 | Reverse Lunge | 2 × 8–12 | 7 |

### Day 2 – Deadlift Emphasis

| Order | Exercise | Sets × Reps | RPE |
|-------|----------|-------------|-----|
| 1 | Deadlift | 4 × 3–5 | 8 |
| 2 | Front Squat | 3 × 6–8 | 7 |
| 3 | Overhead Press | 3 × 6–8 | 8 |
| 4 | One-Arm DB Row | 3 × 8–12 | 7 |
| 5 | Farmer Carry | 3 × 20–30 m | — |

---

## Progression Rules

After each session the app determines your next working weight:

| Lift | Increase on success | Back-friendly cap |
|------|--------------------|--------------------|
| Squat / Deadlift | +10 lb | +5 lb |
| Bench / OHP | +5 lb | +5 lb |
| DB Row / RDL | +5 lb | +5 lb |

**Success** = completed all prescribed sets and reps at or below your Max RPE setting.
**Hold** = last RPE was at the cap but not over.
**Reduce** = last RPE exceeded cap by more than 1 point → weight drops by one increment.

---

## Exercise Library

| Exercise | Pattern | Equipment |
|----------|---------|-----------|
| Back Squat | Squat | Barbell, Squat Rack |
| Front Squat | Squat | Barbell, Squat Rack |
| Goblet Squat | Squat | Dumbbells |
| Deadlift | Hinge | Barbell |
| Romanian Deadlift | Hinge | Barbell or Dumbbells |
| Bench Press | Horizontal Push | Barbell |
| Dumbbell Bench Press | Horizontal Push | Dumbbells |
| Overhead Press | Vertical Push | Barbell |
| Dumbbell OHP | Vertical Push | Dumbbells |
| Pull-up | Vertical Pull | Pull-up Bar |
| Inverted Row | Horizontal Pull | Bodyweight |
| One-Arm DB Row | Horizontal Pull | Dumbbells |
| Plank | Core | Bodyweight |
| Side Plank | Core | Bodyweight |
| Reverse Lunge | Accessory | Bodyweight or Dumbbells |
| Farmer Carry | Accessory | Dumbbells |

### Equipment substitutions

| Missing equipment | Affected exercise | Substitute |
|------------------|-------------------|------------|
| Barbell / Squat Rack | Back Squat, Front Squat | Goblet Squat |
| Barbell | Bench Press | Dumbbell Bench Press |
| Barbell | Overhead Press | Dumbbell OHP |
| Barbell | Deadlift | Romanian Deadlift |
| Pull-up Bar | Pull-up | Inverted Row |

---

## Settings

| Setting | Description |
|---------|-------------|
| **Available Equipment** | Select what you have access to; program auto-adjusts |
| **Main Lift Rep Style** | Strength (3–5), Hybrid (4–6), Hypertrophy (6–8) |
| **Max RPE** | Slider 6–10; progression won't increase weight if last RPE exceeded this |
| **Weekly Schedule** | Assign Day 1 and Day 2 to specific days of the week |
| **Sport Day** | Mark a day as sport/recovery; progression logic avoids heavy lower body adjacent to it |
| **Back-Friendly Mode** | Caps work sets at 3 and limits barbell progression to +5 lb per session |

---

## Install on your phone

### iPhone (Safari)
1. Open https://ruicsf.github.io/Workout-Tracker/
2. Tap the **Share** button (box with arrow)
3. Tap **Add to Home Screen**
4. Tap **Add**

### Android (Chrome)
1. Open https://ruicsf.github.io/Workout-Tracker/
2. Tap the **three-dot menu**
3. Tap **Add to Home Screen**
4. Tap **Add**

---

## Running locally

```bash
git clone https://github.com/ruicsf/Workout-Tracker.git
cd Workout-Tracker
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

To preview on your phone over local Wi-Fi:

```bash
npm run dev -- --host
```

Then open the **Network** URL shown in the terminal on your phone (both devices must be on the same Wi-Fi network).

---

## Tech stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool |
| Tailwind CSS | Styling |
| localStorage | Data persistence |
| GitHub Actions | CI/CD |
| GitHub Pages | Hosting |

---

## Project structure

```
src/
├── types/
│   └── index.ts              # All core data models
├── lib/
│   ├── strengthProgram.ts    # Exercise library, program logic, progression
│   └── storage.ts            # localStorage read/write helpers
├── context/
│   └── AppContext.tsx         # Global state via useReducer
├── components/
│   ├── BottomNav.tsx          # 4-tab navigation bar
│   ├── ExerciseCard.tsx       # Expandable card with inline logging
│   ├── RpeSelector.tsx        # RPE button row (6–10)
│   └── PageHeader.tsx         # Reusable page header
└── pages/
    ├── TodayPage.tsx          # Session start / track / finish flow
    ├── HistoryPage.tsx        # Past workouts grouped by date
    ├── ProgramPage.tsx        # Full program viewer
    └── SettingsPage.tsx       # All customization options
```

---

## Deployment

The app deploys automatically to GitHub Pages on every push to `main` via GitHub Actions (`.github/workflows/deploy.yml`). The workflow:

1. Checks out the code
2. Installs dependencies with `npm ci`
3. Runs `npm run build` (TypeScript check + Vite bundle)
4. Uploads `dist/` to GitHub Pages

No server required — the app is entirely client-side.
