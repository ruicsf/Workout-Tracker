import React, { createContext, useCallback, useContext, useEffect, useReducer } from "react";
import type {
  ActiveSession,
  ActiveView,
  DayId,
  ExerciseLogEntry,
  UserSettings,
} from "../types";
import { loadLogs, loadSettings, saveLogs, saveSettings } from "../lib/storage";

// ─── State ────────────────────────────────────────────────────────────────────

interface AppState {
  settings: UserSettings;
  logs: ExerciseLogEntry[];
  activeView: ActiveView;
  activeSession: ActiveSession | null;
}

// ─── Actions ──────────────────────────────────────────────────────────────────

type Action =
  | { type: "SET_VIEW"; view: ActiveView }
  | { type: "UPDATE_SETTINGS"; settings: UserSettings }
  | { type: "START_SESSION"; dayId: DayId; date: string }
  | { type: "UPDATE_SESSION_LOG"; index: number; log: Partial<ExerciseLogEntry> }
  | { type: "COMPLETE_SESSION" }
  | { type: "CANCEL_SESSION" }
  | { type: "ADD_LOG_ENTRY"; entry: ExerciseLogEntry }
  | { type: "DELETE_LOG_ENTRY"; id: string };

// ─── Reducer ──────────────────────────────────────────────────────────────────

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SET_VIEW":
      return { ...state, activeView: action.view };

    case "UPDATE_SETTINGS":
      return { ...state, settings: action.settings };

    case "START_SESSION":
      return {
        ...state,
        activeSession: {
          dayId: action.dayId,
          date: action.date,
          logs: [],
          completed: false,
        },
        activeView: "today",
      };

    case "UPDATE_SESSION_LOG": {
      if (!state.activeSession) return state;
      const logs = [...state.activeSession.logs];
      logs[action.index] = { ...logs[action.index], ...action.log };
      return {
        ...state,
        activeSession: { ...state.activeSession, logs },
      };
    }

    case "COMPLETE_SESSION":
      return {
        ...state,
        activeSession: state.activeSession
          ? { ...state.activeSession, completed: true }
          : null,
      };

    case "CANCEL_SESSION":
      return { ...state, activeSession: null };

    case "ADD_LOG_ENTRY": {
      const logs = [...state.logs, action.entry];
      return { ...state, logs };
    }

    case "DELETE_LOG_ENTRY": {
      const logs = state.logs.filter((l) => l.id !== action.id);
      return { ...state, logs };
    }

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  saveLogEntry: (entry: ExerciseLogEntry) => void;
  updateSettings: (settings: UserSettings) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    settings: loadSettings(),
    logs: loadLogs(),
    activeView: "today",
    activeSession: null,
  });

  // Persist settings
  useEffect(() => {
    saveSettings(state.settings);
  }, [state.settings]);

  // Persist logs
  useEffect(() => {
    saveLogs(state.logs);
  }, [state.logs]);

  const saveLogEntry = useCallback((entry: ExerciseLogEntry) => {
    dispatch({ type: "ADD_LOG_ENTRY", entry });
  }, []);

  const updateSettings = useCallback((settings: UserSettings) => {
    dispatch({ type: "UPDATE_SETTINGS", settings });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch, saveLogEntry, updateSettings }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
