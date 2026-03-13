import type { ExerciseLogEntry, UserSettings } from "../types";
import { DEFAULT_SETTINGS } from "../types";

const KEYS = {
  settings: "wt_settings",
  logs: "wt_logs",
} as const;

function safeGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function safeSet(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full or private mode
  }
}

export function loadSettings(): UserSettings {
  const stored = safeGet<Partial<UserSettings>>(KEYS.settings, {});
  return { ...DEFAULT_SETTINGS, ...stored };
}

export function saveSettings(settings: UserSettings): void {
  safeSet(KEYS.settings, settings);
}

export function loadLogs(): ExerciseLogEntry[] {
  return safeGet<ExerciseLogEntry[]>(KEYS.logs, []);
}

export function saveLogs(logs: ExerciseLogEntry[]): void {
  safeSet(KEYS.logs, logs);
}
