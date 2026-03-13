// ─── Equipment ──────────────────────────────────────────────────────────────

export type Equipment =
  | "barbell"
  | "squat_rack"
  | "pullup_bar"
  | "dumbbells"
  | "bodyweight";

// ─── Exercise ────────────────────────────────────────────────────────────────

export type ExerciseId = string;

export type MovementPattern =
  | "squat"
  | "hinge"
  | "horizontal_push"
  | "vertical_push"
  | "horizontal_pull"
  | "vertical_pull"
  | "core"
  | "accessory";

export interface Exercise {
  id: ExerciseId;
  name: string;
  primaryMuscles: string[];
  movementPattern: MovementPattern;
  equipment: Equipment[];
  defaultSets: number;
  defaultReps: number;
  defaultRepRange?: [number, number];
  defaultRpe?: number;
  notes?: string;
}

// ─── Workout Structure ───────────────────────────────────────────────────────

export type DayId = "day1" | "day2";

export interface WorkoutSetScheme {
  sets: number;
  reps: number | [number, number];
  rpeTarget?: number;
}

export interface WorkoutExercise {
  exerciseId: ExerciseId;
  order: number;
  scheme: WorkoutSetScheme;
  isMainLift: boolean;
}

export interface WorkoutDay {
  id: DayId;
  name: string;
  description?: string;
  exercises: WorkoutExercise[];
}

export interface ProgramTemplate {
  id: string;
  name: string;
  days: WorkoutDay[];
  defaultWeeklySchedule: DayId[];
}

// ─── User Settings ───────────────────────────────────────────────────────────

export type MainLiftRepStyle = "strength" | "hybrid" | "hypertrophy";

export interface UserSettings {
  availableEquipment: Equipment[];
  mainLiftRepStyle: MainLiftRepStyle;
  maxRpe: number;
  backFriendlyMode: boolean;
  weeklySchedule: { [key in DayId]: string };
  sportDay?: string;
}

export const DEFAULT_SETTINGS: UserSettings = {
  availableEquipment: ["barbell", "squat_rack", "pullup_bar", "dumbbells", "bodyweight"],
  mainLiftRepStyle: "hybrid",
  maxRpe: 8,
  backFriendlyMode: false,
  weeklySchedule: { day1: "Monday", day2: "Thursday" },
  sportDay: undefined,
};

// ─── Logging & Progression ───────────────────────────────────────────────────

export interface ExerciseLogEntry {
  id: string;
  date: string;          // ISO date string
  exerciseId: ExerciseId;
  weight: number;        // lbs
  reps: number;
  setsCompleted: number;
  rpe?: number;
}

export interface UserExerciseState {
  exerciseId: ExerciseId;
  lastWorkingWeight?: number;
  lastRpe?: number;
  progressionStep?: number;
}

// ─── Session ─────────────────────────────────────────────────────────────────

export interface WorkoutExerciseInstance extends WorkoutExercise {
  targetWeight?: number;
  exerciseName: string;
  isAlternative?: boolean;
}

export interface WorkoutDayInstance extends Omit<WorkoutDay, "exercises"> {
  exercises: WorkoutExerciseInstance[];
  scheduledDate?: string;
}

// ─── App State ───────────────────────────────────────────────────────────────

export type ActiveView = "today" | "history" | "program" | "settings";

export interface ActiveSession {
  dayId: DayId;
  date: string;
  logs: Partial<ExerciseLogEntry>[];
  completed: boolean;
}
