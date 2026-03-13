import { useCallback, useMemo, useState } from "react";
import { CheckCircle, Play, RefreshCw, X } from "lucide-react";
import type { DayId, ExerciseLogEntry } from "../types";
import { getNextSession } from "../lib/strengthProgram";
import { useApp } from "../context/AppContext";
import { ExerciseCard } from "../components/ExerciseCard";
import { PageHeader } from "../components/PageHeader";

const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function nanoid() {
  return Math.random().toString(36).slice(2, 11);
}

export function TodayPage() {
  const { state, dispatch, saveLogEntry } = useApp();
  const { settings, logs, activeSession } = state;

  // Determine which day is scheduled today
  const todayName = DAYS_OF_WEEK[new Date().getDay()];
  const scheduledDayId: DayId | null = useMemo(() => {
    const entries = Object.entries(settings.weeklySchedule) as [DayId, string][];
    const match = entries.find(([, day]) => day === todayName);
    return match ? match[0] : null;
  }, [settings.weeklySchedule, todayName]);

  // Build next session for each day
  const day1Session = useMemo(
    () => getNextSession("day1", settings, logs),
    [settings, logs]
  );
  const day2Session = useMemo(
    () => getNextSession("day2", settings, logs),
    [settings, logs]
  );

  const sessions = { day1: day1Session, day2: day2Session };

  // Local RPE/log edits per exercise index
  const [localLogs, setLocalLogs] = useState<Record<number, Partial<ExerciseLogEntry>>>({});

  const handleStartSession = (dayId: DayId) => {
    setLocalLogs({});
    dispatch({ type: "START_SESSION", dayId, date: todayStr() });
  };

  const handleLogChange = useCallback(
    (index: number, data: Partial<ExerciseLogEntry>) => {
      setLocalLogs((prev) => ({
        ...prev,
        [index]: { ...prev[index], ...data },
      }));
    },
    []
  );

  const handleFinishSession = () => {
    if (!activeSession) return;
    const session = sessions[activeSession.dayId];

    session.exercises.forEach((ex, i) => {
      const local = localLogs[i] ?? {};
      const weight =
        local.weight ?? ex.targetWeight ?? 0;
      const reps =
        local.reps ??
        (Array.isArray(ex.scheme.reps) ? ex.scheme.reps[0] : ex.scheme.reps);
      const setsCompleted = local.setsCompleted ?? ex.scheme.sets;

      const entry: ExerciseLogEntry = {
        id: nanoid(),
        date: activeSession.date,
        exerciseId: ex.exerciseId,
        weight,
        reps,
        setsCompleted,
        rpe: local.rpe,
      };
      saveLogEntry(entry);
    });

    dispatch({ type: "COMPLETE_SESSION" });
    setTimeout(() => {
      dispatch({ type: "CANCEL_SESSION" });
      setLocalLogs({});
    }, 1800);
  };

  // ── Completed state ──────────────────────────────────────────────────────────
  if (activeSession?.completed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-green-900/40 border border-green-600 flex items-center justify-center mb-4">
          <CheckCircle size={40} className="text-green-400" />
        </div>
        <h2 className="text-2xl font-bold text-white">Session Complete!</h2>
        <p className="text-slate-400 mt-1">Great work. Rest up and come back stronger.</p>
      </div>
    );
  }

  // ── Active session ───────────────────────────────────────────────────────────
  if (activeSession) {
    const session = sessions[activeSession.dayId];
    return (
      <div className="flex flex-col pb-32">
        <PageHeader
          title={session.name}
          subtitle={activeSession.date}
          action={
            <button
              onClick={() => dispatch({ type: "CANCEL_SESSION" })}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-surface-2 transition-colors"
            >
              <X size={20} />
            </button>
          }
        />

        <div className="px-4 space-y-3">
          {session.exercises.map((ex, i) => (
            <ExerciseCard
              key={ex.exerciseId + i}
              exercise={ex}
              logIndex={i}
              logEntry={localLogs[i]}
              onLog={(data) => handleLogChange(i, data as Partial<ExerciseLogEntry>)}
            />
          ))}
        </div>

        {/* Finish button */}
        <div className="fixed bottom-[72px] left-0 right-0 px-4 py-3 bg-gradient-to-t from-surface-0 via-surface-0/90 to-transparent">
          <button
            onClick={handleFinishSession}
            className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-2xl text-base transition-colors shadow-lg"
          >
            Finish Session
          </button>
        </div>
      </div>
    );
  }

  // ── No session started ───────────────────────────────────────────────────────
  return (
    <div className="flex flex-col pb-24">
      <PageHeader
        title="Today"
        subtitle={`${todayName} · ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
      />

      <div className="px-4 space-y-4">
        {/* Scheduled day highlight */}
        {scheduledDayId && (
          <div className="bg-brand-900/40 border border-brand-700 rounded-2xl p-4">
            <p className="text-xs text-brand-400 font-semibold uppercase tracking-wider mb-1">Scheduled Today</p>
            <p className="text-lg font-bold text-white">{sessions[scheduledDayId].name}</p>
            <p className="text-sm text-slate-400 mt-0.5">{sessions[scheduledDayId].description}</p>
            <button
              onClick={() => handleStartSession(scheduledDayId)}
              className="mt-3 w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              <Play size={18} className="fill-current" />
              Start Workout
            </button>
          </div>
        )}

        <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider px-1">All Sessions</p>

        {(["day1", "day2"] as DayId[]).map((dayId) => {
          const session = sessions[dayId];
          const isScheduled = scheduledDayId === dayId;
          return (
            <div
              key={dayId}
              className="bg-surface-1 border border-surface-2 rounded-2xl p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white">{session.name}</h3>
                    {isScheduled && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-brand-900 text-brand-300 border border-brand-700">TODAY</span>
                    )}
                  </div>
                  <p className="text-sm text-slate-400 mt-0.5">{session.description}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {session.exercises.length} exercises ·{" "}
                    {settings.weeklySchedule[dayId]}s
                  </p>
                </div>
              </div>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => handleStartSession(dayId)}
                  className="flex-1 flex items-center justify-center gap-2 bg-surface-2 hover:bg-surface-3 border border-surface-3 text-white font-medium py-2.5 rounded-xl transition-colors text-sm"
                >
                  <Play size={16} className="fill-current" />
                  Start
                </button>
                <button
                  onClick={() => {
                    setLocalLogs({});
                    handleStartSession(dayId);
                  }}
                  className="p-2.5 bg-surface-2 hover:bg-surface-3 border border-surface-3 text-slate-400 hover:text-white rounded-xl transition-colors"
                  title="Restart"
                >
                  <RefreshCw size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
