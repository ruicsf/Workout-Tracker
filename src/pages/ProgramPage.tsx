import { useMemo } from "react";
import { ChevronRight, Dumbbell } from "lucide-react";
import { useApp } from "../context/AppContext";
import { buildProgramForUser, EXERCISE_MAP } from "../lib/strengthProgram";
import { PageHeader } from "../components/PageHeader";

function formatReps(reps: number | [number, number]): string {
  return Array.isArray(reps) ? `${reps[0]}–${reps[1]}` : String(reps);
}

const MUSCLE_COLORS: Record<string, string> = {
  quads:    "bg-blue-900/40 text-blue-300 border-blue-800",
  glutes:   "bg-purple-900/40 text-purple-300 border-purple-800",
  hamstrings:"bg-orange-900/40 text-orange-300 border-orange-800",
  chest:    "bg-red-900/40 text-red-300 border-red-800",
  back:     "bg-green-900/40 text-green-300 border-green-800",
  shoulders:"bg-yellow-900/40 text-yellow-300 border-yellow-800",
  core:     "bg-teal-900/40 text-teal-300 border-teal-800",
  lats:     "bg-indigo-900/40 text-indigo-300 border-indigo-800",
};

function MuscleTag({ muscle }: { muscle: string }) {
  const cls = MUSCLE_COLORS[muscle.toLowerCase()] ?? "bg-surface-2 text-slate-300 border-surface-3";
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${cls}`}>
      {muscle}
    </span>
  );
}

export function ProgramPage() {
  const { state } = useApp();
  const program = useMemo(
    () => buildProgramForUser(state.settings),
    [state.settings]
  );

  return (
    <div className="flex flex-col pb-24">
      <PageHeader
        title={program.name}
        subtitle="Your current training split"
      />

      <div className="px-4 space-y-6">
        {program.days.map((day) => (
          <div key={day.id}>
            {/* Day header */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-xl bg-brand-900/60 border border-brand-700 flex items-center justify-center">
                <Dumbbell size={16} className="text-brand-400" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">{day.name}</h2>
                <p className="text-xs text-slate-400">
                  {state.settings.weeklySchedule[day.id]}s ·{" "}
                  {day.exercises.length} exercises
                </p>
              </div>
            </div>

            <div className="bg-surface-1 border border-surface-2 rounded-2xl overflow-hidden">
              {day.exercises.map((we, i) => {
                const ex = EXERCISE_MAP.get(we.exerciseId);
                if (!ex) return null;
                return (
                  <div
                    key={we.exerciseId + i}
                    className={`flex items-start gap-3 px-4 py-3.5 ${
                      i !== day.exercises.length - 1 ? "border-b border-surface-2" : ""
                    }`}
                  >
                    {/* Order */}
                    <div className="w-6 h-6 rounded-full bg-surface-2 border border-surface-3 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[11px] font-bold text-slate-400">{we.order}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-white">{ex.name}</p>
                        {we.isMainLift && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-brand-900 text-brand-300 border border-brand-700">MAIN</span>
                        )}
                      </div>

                      <p className="text-xs text-slate-400 mt-0.5">
                        {we.scheme.sets} sets × {formatReps(we.scheme.reps)} reps
                        {we.scheme.rpeTarget && ` · RPE ${we.scheme.rpeTarget}`}
                      </p>

                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {ex.primaryMuscles.map((m) => (
                          <MuscleTag key={m} muscle={m} />
                        ))}
                      </div>

                      {ex.notes && (
                        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{ex.notes}</p>
                      )}
                    </div>

                    <ChevronRight size={16} className="text-slate-600 flex-shrink-0 mt-1" />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
