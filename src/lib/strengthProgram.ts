import type {
  Equipment,
  Exercise,
  ExerciseId,
  ExerciseLogEntry,
  MainLiftRepStyle,
  ProgramTemplate,
  UserExerciseState,
  UserSettings,
  WorkoutDay,
  WorkoutDayInstance,
  WorkoutExercise,
  WorkoutExerciseInstance,
} from "../types";

// ─── Exercise Library ─────────────────────────────────────────────────────────

export const EXERCISES: Exercise[] = [
  {
    id: "back_squat",
    name: "Back Squat",
    primaryMuscles: ["quads", "glutes"],
    movementPattern: "squat",
    equipment: ["barbell", "squat_rack"],
    defaultSets: 3,
    defaultReps: 5,
    defaultRepRange: [4, 6],
    defaultRpe: 8,
    notes: "Brace core, chest up, knees track over toes. Break parallel.",
  },
  {
    id: "front_squat",
    name: "Front Squat",
    primaryMuscles: ["quads", "core"],
    movementPattern: "squat",
    equipment: ["barbell", "squat_rack"],
    defaultSets: 3,
    defaultReps: 6,
    defaultRepRange: [6, 8],
    defaultRpe: 7,
    notes: "Elbows high, upright torso. Lighter than back squat.",
  },
  {
    id: "goblet_squat",
    name: "Goblet Squat",
    primaryMuscles: ["quads", "glutes"],
    movementPattern: "squat",
    equipment: ["dumbbells"],
    defaultSets: 3,
    defaultReps: 10,
    defaultRepRange: [8, 12],
    defaultRpe: 7,
    notes: "Hold dumbbell at chest. Great for technique work.",
  },
  {
    id: "deadlift",
    name: "Deadlift",
    primaryMuscles: ["hamstrings", "glutes", "back"],
    movementPattern: "hinge",
    equipment: ["barbell"],
    defaultSets: 3,
    defaultReps: 4,
    defaultRepRange: [3, 5],
    defaultRpe: 8,
    notes: "Neutral spine, lat engagement, drive floor away. Bar stays close.",
  },
  {
    id: "rdl",
    name: "Romanian Deadlift",
    primaryMuscles: ["hamstrings", "glutes"],
    movementPattern: "hinge",
    equipment: ["barbell", "dumbbells"],
    defaultSets: 3,
    defaultReps: 8,
    defaultRepRange: [6, 10],
    defaultRpe: 7,
    notes: "Soft knee bend, hinge at hips, feel hamstring stretch.",
  },
  {
    id: "bench_press_barbell",
    name: "Bench Press",
    primaryMuscles: ["chest", "triceps", "front delts"],
    movementPattern: "horizontal_push",
    equipment: ["barbell"],
    defaultSets: 3,
    defaultReps: 6,
    defaultRepRange: [6, 8],
    defaultRpe: 8,
    notes: "Retract scapulae, slight arch, bar to lower chest.",
  },
  {
    id: "bench_press_db",
    name: "Dumbbell Bench Press",
    primaryMuscles: ["chest", "triceps", "front delts"],
    movementPattern: "horizontal_push",
    equipment: ["dumbbells"],
    defaultSets: 3,
    defaultReps: 8,
    defaultRepRange: [6, 10],
    defaultRpe: 7,
    notes: "Greater range of motion than barbell. Control the descent.",
  },
  {
    id: "ohp_barbell",
    name: "Overhead Press",
    primaryMuscles: ["shoulders", "triceps", "upper traps"],
    movementPattern: "vertical_push",
    equipment: ["barbell"],
    defaultSets: 3,
    defaultReps: 6,
    defaultRepRange: [6, 8],
    defaultRpe: 8,
    notes: "Tight glutes, press bar overhead and slightly back. Full lockout.",
  },
  {
    id: "ohp_db",
    name: "Dumbbell Overhead Press",
    primaryMuscles: ["shoulders", "triceps"],
    movementPattern: "vertical_push",
    equipment: ["dumbbells"],
    defaultSets: 3,
    defaultReps: 8,
    defaultRepRange: [8, 12],
    defaultRpe: 7,
    notes: "Seated or standing. Neutral grip variation optional.",
  },
  {
    id: "pullup",
    name: "Pull-up",
    primaryMuscles: ["lats", "biceps", "rear delts"],
    movementPattern: "vertical_pull",
    equipment: ["pullup_bar"],
    defaultSets: 3,
    defaultReps: 6,
    defaultRepRange: [5, 8],
    defaultRpe: 8,
    notes: "Full dead hang start. Chin clears bar. 1–2 reps in reserve.",
  },
  {
    id: "inverted_row",
    name: "Inverted Row",
    primaryMuscles: ["lats", "rear delts", "biceps"],
    movementPattern: "horizontal_pull",
    equipment: ["bodyweight"],
    defaultSets: 3,
    defaultReps: 10,
    defaultRepRange: [8, 12],
    defaultRpe: 7,
    notes: "Good pullup substitute. Elevate feet to increase difficulty.",
  },
  {
    id: "one_arm_row",
    name: "One-Arm Dumbbell Row",
    primaryMuscles: ["lats", "rhomboids", "biceps"],
    movementPattern: "horizontal_pull",
    equipment: ["dumbbells"],
    defaultSets: 3,
    defaultReps: 10,
    defaultRepRange: [8, 12],
    defaultRpe: 7,
    notes: "Brace on bench, elbow close to torso. Full range of motion.",
  },
  {
    id: "plank",
    name: "Plank",
    primaryMuscles: ["core", "glutes"],
    movementPattern: "core",
    equipment: ["bodyweight"],
    defaultSets: 3,
    defaultReps: 1,
    notes: "Hold 30–60 seconds. Squeeze glutes and abs.",
  },
  {
    id: "side_plank",
    name: "Side Plank",
    primaryMuscles: ["obliques", "core"],
    movementPattern: "core",
    equipment: ["bodyweight"],
    defaultSets: 2,
    defaultReps: 1,
    notes: "Hold 20–40 seconds per side. Hips stacked.",
  },
  {
    id: "reverse_lunge",
    name: "Reverse Lunge",
    primaryMuscles: ["quads", "glutes"],
    movementPattern: "accessory",
    equipment: ["bodyweight", "dumbbells"],
    defaultSets: 2,
    defaultReps: 10,
    defaultRepRange: [8, 12],
    defaultRpe: 7,
    notes: "Step back, front shin vertical. Can hold dumbbells for load.",
  },
  {
    id: "farmer_carry",
    name: "Farmer Carry",
    primaryMuscles: ["traps", "core", "grip", "glutes"],
    movementPattern: "accessory",
    equipment: ["dumbbells"],
    defaultSets: 3,
    defaultReps: 1,
    notes: "Walk 20–30 m per set. Shoulders packed, tall posture.",
  },
];

export const EXERCISE_MAP: Map<ExerciseId, Exercise> = new Map(
  EXERCISES.map((e) => [e.id, e])
);

// ─── Base Program ─────────────────────────────────────────────────────────────

const DAY1_EXERCISES: WorkoutExercise[] = [
  { exerciseId: "back_squat",       order: 1, scheme: { sets: 4, reps: [4, 6],  rpeTarget: 8 }, isMainLift: true  },
  { exerciseId: "bench_press_barbell", order: 2, scheme: { sets: 3, reps: [6, 8],  rpeTarget: 8 }, isMainLift: true  },
  { exerciseId: "rdl",              order: 3, scheme: { sets: 3, reps: [6, 10], rpeTarget: 7 }, isMainLift: false },
  { exerciseId: "pullup",           order: 4, scheme: { sets: 3, reps: [5, 8],  rpeTarget: 8 }, isMainLift: false },
  { exerciseId: "plank",            order: 5, scheme: { sets: 3, reps: 1                      }, isMainLift: false },
  { exerciseId: "reverse_lunge",    order: 6, scheme: { sets: 2, reps: [8, 12], rpeTarget: 7 }, isMainLift: false },
];

const DAY2_EXERCISES: WorkoutExercise[] = [
  { exerciseId: "deadlift",         order: 1, scheme: { sets: 4, reps: [3, 5],  rpeTarget: 8 }, isMainLift: true  },
  { exerciseId: "front_squat",      order: 2, scheme: { sets: 3, reps: [6, 8],  rpeTarget: 7 }, isMainLift: false },
  { exerciseId: "ohp_barbell",      order: 3, scheme: { sets: 3, reps: [6, 8],  rpeTarget: 8 }, isMainLift: true  },
  { exerciseId: "one_arm_row",      order: 4, scheme: { sets: 3, reps: [8, 12], rpeTarget: 7 }, isMainLift: false },
  { exerciseId: "farmer_carry",     order: 5, scheme: { sets: 3, reps: 1                      }, isMainLift: false },
];

export const BASE_PROGRAM: ProgramTemplate = {
  id: "default_2day",
  name: "2-Day Heavy Full Body",
  defaultWeeklySchedule: ["day1", "day2"],
  days: [
    {
      id: "day1",
      name: "Squat Emphasis",
      description: "Heavy squat focus with upper body push/pull and accessories.",
      exercises: DAY1_EXERCISES,
    },
    {
      id: "day2",
      name: "Deadlift Emphasis",
      description: "Heavy pull focus with secondary squat, press, and row.",
      exercises: DAY2_EXERCISES,
    },
  ],
};

// ─── Equipment substitution map ───────────────────────────────────────────────
// Maps an exercise id to a fallback when required equipment is missing.

const SUBSTITUTIONS: Record<ExerciseId, ExerciseId> = {
  back_squat:           "goblet_squat",
  front_squat:          "goblet_squat",
  bench_press_barbell:  "bench_press_db",
  ohp_barbell:          "ohp_db",
  rdl:                  "rdl",           // rdl works with dumbbells too
  deadlift:             "rdl",           // fallback if no barbell
  pullup:               "inverted_row",  // fallback if no bar
};

function hasEquipment(required: Equipment[], available: Equipment[]): boolean {
  return required.every((e) => available.includes(e));
}

function resolveExercise(
  exerciseId: ExerciseId,
  available: Equipment[]
): ExerciseId {
  const ex = EXERCISE_MAP.get(exerciseId);
  if (!ex) return exerciseId;
  if (hasEquipment(ex.equipment, available)) return exerciseId;

  const sub = SUBSTITUTIONS[exerciseId];
  if (!sub || sub === exerciseId) return exerciseId;
  const subEx = EXERCISE_MAP.get(sub);
  if (subEx && hasEquipment(subEx.equipment, available)) return sub;

  return exerciseId; // best effort
}

// ─── Rep range by style ───────────────────────────────────────────────────────

function repRangeForStyle(style: MainLiftRepStyle): [number, number] {
  switch (style) {
    case "strength":    return [3, 5];
    case "hybrid":      return [4, 6];
    case "hypertrophy": return [6, 8];
  }
}

// ─── Build program for user ───────────────────────────────────────────────────

export function buildProgramForUser(settings: UserSettings): ProgramTemplate {
  const { availableEquipment, mainLiftRepStyle, backFriendlyMode } = settings;
  const mainRange = repRangeForStyle(mainLiftRepStyle);

  const days: WorkoutDay[] = BASE_PROGRAM.days.map((day) => {
    let exercises = day.exercises.map((we) => {
      const resolvedId = resolveExercise(we.exerciseId, availableEquipment);

      let scheme = { ...we.scheme };

      // Apply rep style to main lifts
      if (we.isMainLift && Array.isArray(scheme.reps)) {
        scheme = { ...scheme, reps: mainRange };
      }

      // Back-friendly mode: cap main lift sets at 3
      if (backFriendlyMode && we.isMainLift) {
        scheme = { ...scheme, sets: Math.min(scheme.sets, 3) };
      }

      return { ...we, exerciseId: resolvedId, scheme };
    });

    return { ...day, exercises };
  });

  return { ...BASE_PROGRAM, days };
}

// ─── Progression helpers ──────────────────────────────────────────────────────

const PROGRESSION_INCREMENT: Record<string, number> = {
  back_squat:           10,
  front_squat:          5,
  goblet_squat:         5,
  deadlift:             10,
  rdl:                  5,
  bench_press_barbell:  5,
  bench_press_db:       5,
  ohp_barbell:          5,
  ohp_db:               5,
  pullup:               0,    // bodyweight – track reps
  inverted_row:         0,
  one_arm_row:          5,
  plank:                0,
  side_plank:           0,
  reverse_lunge:        5,
  farmer_carry:         5,
};

export function updateUserExerciseState(
  logs: ExerciseLogEntry[]
): UserExerciseState[] {
  const stateMap = new Map<ExerciseId, UserExerciseState>();

  // Process logs oldest-first
  const sorted = [...logs].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  for (const entry of sorted) {
    const existing = stateMap.get(entry.exerciseId) ?? {
      exerciseId: entry.exerciseId,
      progressionStep: 0,
    };
    stateMap.set(entry.exerciseId, {
      ...existing,
      lastWorkingWeight: entry.weight,
      lastRpe: entry.rpe,
    });
  }

  return Array.from(stateMap.values());
}

export function getNextWorkingWeight(
  exerciseId: ExerciseId,
  userState: UserExerciseState,
  settings: UserSettings
): number {
  const { lastWorkingWeight = 0, lastRpe } = userState;
  const { maxRpe, backFriendlyMode } = settings;

  if (lastWorkingWeight === 0) return 0; // no history

  const baseIncrement = PROGRESSION_INCREMENT[exerciseId] ?? 5;
  const increment = backFriendlyMode && ["back_squat", "deadlift"].includes(exerciseId)
    ? Math.min(5, baseIncrement)
    : baseIncrement;

  // Success: completed sets at or below maxRpe
  const wasSuccessful = lastRpe === undefined || lastRpe <= maxRpe;

  if (wasSuccessful) {
    return lastWorkingWeight + increment;
  }

  // Failed or exceeded RPE: keep weight or slightly reduce
  if (lastRpe !== undefined && lastRpe > maxRpe + 1) {
    return Math.max(0, lastWorkingWeight - increment);
  }

  return lastWorkingWeight; // hold steady
}

// ─── Get next session ─────────────────────────────────────────────────────────

export function getNextSession(
  dayId: "day1" | "day2",
  settings: UserSettings,
  userHistory: ExerciseLogEntry[]
): WorkoutDayInstance {
  const program = buildProgramForUser(settings);
  const day = program.days.find((d) => d.id === dayId)!;

  const states = updateUserExerciseState(userHistory);
  const stateMap = new Map(states.map((s) => [s.exerciseId, s]));

  const exercises: WorkoutExerciseInstance[] = day.exercises.map((we) => {
    const ex = EXERCISE_MAP.get(we.exerciseId)!;
    const state = stateMap.get(we.exerciseId);
    const targetWeight = state
      ? getNextWorkingWeight(we.exerciseId, state, settings)
      : undefined;

    return {
      ...we,
      exerciseName: ex?.name ?? we.exerciseId,
      targetWeight,
    };
  });

  return {
    ...day,
    exercises,
    scheduledDate: new Date().toISOString().slice(0, 10),
  };
}
