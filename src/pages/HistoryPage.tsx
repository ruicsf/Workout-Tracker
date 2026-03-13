import { useMemo } from "react";
import { Trash2 } from "lucide-react";
import { useApp } from "../context/AppContext";
import { EXERCISE_MAP } from "../lib/strengthProgram";
import { PageHeader } from "../components/PageHeader";

function groupByDate(entries: ReturnType<typeof useApp>["state"]["logs"]) {
  const map = new Map<string, typeof entries>();
  for (const e of entries) {
    const existing = map.get(e.date) ?? [];
    existing.push(e);
    map.set(e.date, existing);
  }
  // Sort dates newest first
  return Array.from(map.entries()).sort(
    ([a], [b]) => new Date(b).getTime() - new Date(a).getTime()
  );
}

function formatDate(iso: string) {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export function HistoryPage() {
  const { state, dispatch } = useApp();
  const grouped = useMemo(() => groupByDate(state.logs), [state.logs]);

  if (grouped.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-surface-2 flex items-center justify-center mb-4">
          <span className="text-3xl">📋</span>
        </div>
        <h2 className="text-xl font-bold text-white">No workouts yet</h2>
        <p className="text-slate-400 mt-1 text-sm">Complete your first session to see history here.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-24">
      <PageHeader
        title="History"
        subtitle={`${state.logs.length} sets logged`}
      />

      <div className="px-4 space-y-5">
        {grouped.map(([date, entries]) => (
          <div key={date}>
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-1">
              {formatDate(date)}
            </h2>
            <div className="bg-surface-1 border border-surface-2 rounded-2xl overflow-hidden">
              {entries.map((entry, i) => {
                const ex = EXERCISE_MAP.get(entry.exerciseId);
                return (
                  <div
                    key={entry.id}
                    className={`flex items-center gap-3 px-4 py-3 ${
                      i !== entries.length - 1 ? "border-b border-surface-2" : ""
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">
                        {ex?.name ?? entry.exerciseId}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {entry.setsCompleted} × {entry.reps} reps
                        {entry.weight > 0 && ` · ${entry.weight} lb`}
                        {entry.rpe && (
                          <span className="ml-2 text-brand-400">RPE {entry.rpe}</span>
                        )}
                      </p>
                    </div>
                    <button
                      onClick={() => dispatch({ type: "DELETE_LOG_ENTRY", id: entry.id })}
                      className="p-1.5 text-slate-600 hover:text-red-400 hover:bg-red-950/30 rounded-lg transition-colors flex-shrink-0"
                    >
                      <Trash2 size={15} />
                    </button>
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
