import { useState } from "react";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import type { WorkoutExerciseInstance } from "../types";
import { EXERCISE_MAP } from "../lib/strengthProgram";
import { RpeSelector } from "./RpeSelector";

interface ExerciseCardProps {
  exercise: WorkoutExerciseInstance;
  logIndex: number;
  logEntry?: Partial<{ weight: number; reps: number; setsCompleted: number; rpe: number }>;
  onLog: (data: Partial<{ weight: number; reps: number; setsCompleted: number; rpe: number }>) => void;
  isBodyweight?: boolean;
}

function formatReps(reps: number | [number, number]): string {
  return Array.isArray(reps) ? `${reps[0]}–${reps[1]}` : String(reps);
}

export function ExerciseCard({ exercise, logEntry, onLog, isBodyweight }: ExerciseCardProps) {
  const [expanded, setExpanded] = useState(false);
  const ex = EXERCISE_MAP.get(exercise.exerciseId);
  const isTimeBased = ["plank", "side_plank", "farmer_carry"].includes(exercise.exerciseId);
  const showWeight = !isBodyweight && !["plank", "side_plank"].includes(exercise.exerciseId);

  return (
    <div className="bg-surface-1 rounded-2xl overflow-hidden border border-surface-2">
      {/* Header */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              {exercise.isMainLift && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-brand-900 text-brand-300 border border-brand-700">
                  MAIN
                </span>
              )}
              <h3 className="text-base font-semibold text-white truncate">
                {exercise.exerciseName}
              </h3>
            </div>
            <p className="text-sm text-slate-400 mt-0.5">
              {exercise.scheme.sets} × {formatReps(exercise.scheme.reps)} reps
              {exercise.scheme.rpeTarget && (
                <span className="ml-2 text-brand-400">RPE {exercise.scheme.rpeTarget}</span>
              )}
            </p>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-surface-2 transition-colors flex-shrink-0"
          >
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>

        {/* Target weight badge */}
        {exercise.targetWeight !== undefined && exercise.targetWeight > 0 && (
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-2 border border-surface-3">
            <span className="text-xs text-slate-400">Target</span>
            <span className="text-sm font-bold text-brand-300">{exercise.targetWeight} lb</span>
          </div>
        )}
      </div>

      {/* Expanded log section */}
      {expanded && (
        <div className="border-t border-surface-2 p-4 space-y-4">
          {ex?.notes && (
            <div className="flex gap-2 bg-surface-2 rounded-xl p-3">
              <Info size={15} className="text-brand-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-slate-300 leading-relaxed">{ex.notes}</p>
            </div>
          )}

          <div className="grid grid-cols-3 gap-3">
            {/* Sets */}
            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-medium uppercase tracking-wider block">Sets</label>
              <input
                type="number"
                inputMode="numeric"
                min={1}
                max={10}
                value={logEntry?.setsCompleted ?? exercise.scheme.sets}
                onChange={(e) => onLog({ setsCompleted: Number(e.target.value) })}
                className="w-full bg-surface-2 border border-surface-3 rounded-xl px-3 py-2.5 text-white text-center text-lg font-semibold focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
              />
            </div>

            {/* Reps */}
            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-medium uppercase tracking-wider block">
                {isTimeBased ? "Secs" : "Reps"}
              </label>
              <input
                type="number"
                inputMode="numeric"
                min={1}
                value={
                  logEntry?.reps ??
                  (Array.isArray(exercise.scheme.reps)
                    ? exercise.scheme.reps[0]
                    : exercise.scheme.reps)
                }
                onChange={(e) => onLog({ reps: Number(e.target.value) })}
                className="w-full bg-surface-2 border border-surface-3 rounded-xl px-3 py-2.5 text-white text-center text-lg font-semibold focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
              />
            </div>

            {/* Weight */}
            {showWeight ? (
              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-medium uppercase tracking-wider block">lbs</label>
                <input
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step={2.5}
                  placeholder={exercise.targetWeight ? String(exercise.targetWeight) : "0"}
                  value={logEntry?.weight ?? exercise.targetWeight ?? ""}
                  onChange={(e) => onLog({ weight: Number(e.target.value) })}
                  className="w-full bg-surface-2 border border-surface-3 rounded-xl px-3 py-2.5 text-white text-center text-lg font-semibold focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 placeholder:text-slate-600"
                />
              </div>
            ) : (
              <div />
            )}
          </div>

          {exercise.scheme.rpeTarget && (
            <RpeSelector
              value={logEntry?.rpe}
              onChange={(rpe) => onLog({ rpe })}
            />
          )}
        </div>
      )}
    </div>
  );
}
