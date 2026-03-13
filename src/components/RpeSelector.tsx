interface RpeSelectorProps {
  value?: number;
  onChange: (rpe: number) => void;
}

const RPE_LABELS: Record<number, string> = {
  6: "Very easy",
  7: "Comfortable",
  8: "Challenging",
  9: "Very hard",
  10: "Max effort",
};

export function RpeSelector({ value, onChange }: RpeSelectorProps) {
  return (
    <div className="space-y-2">
      <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">RPE</p>
      <div className="flex gap-2">
        {[6, 7, 8, 9, 10].map((rpe) => (
          <button
            key={rpe}
            onClick={() => onChange(rpe)}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
              value === rpe
                ? "bg-brand-500 text-white"
                : "bg-surface-2 text-slate-300 hover:bg-surface-3"
            }`}
          >
            {rpe}
          </button>
        ))}
      </div>
      {value && (
        <p className="text-xs text-slate-400 text-center">{RPE_LABELS[value]}</p>
      )}
    </div>
  );
}
