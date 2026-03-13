import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import type { DayId, Equipment, MainLiftRepStyle, UserSettings } from "../types";
import { useApp } from "../context/AppContext";
import { PageHeader } from "../components/PageHeader";

const EQUIPMENT_OPTIONS: { id: Equipment; label: string; emoji: string }[] = [
  { id: "barbell",    label: "Barbell",     emoji: "🏋️" },
  { id: "squat_rack", label: "Squat Rack",  emoji: "🔩" },
  { id: "pullup_bar", label: "Pull-up Bar", emoji: "🏗️" },
  { id: "dumbbells",  label: "Dumbbells",   emoji: "💪" },
  { id: "bodyweight", label: "Bodyweight",  emoji: "🧘" },
];

const REP_STYLES: { id: MainLiftRepStyle; label: string; range: string; desc: string }[] = [
  { id: "strength",    label: "Strength",    range: "3–5 reps", desc: "Heavy, CNS-focused" },
  { id: "hybrid",      label: "Hybrid",      range: "4–6 reps", desc: "Strength + size balance" },
  { id: "hypertrophy", label: "Hypertrophy", range: "6–8 reps", desc: "Muscle building focus" },
];

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-1">
      {children}
    </p>
  );
}

interface ToggleRowProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

function ToggleRow({ label, description, checked, onChange }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3.5">
      <div className="flex-1 min-w-0 pr-4">
        <p className="text-sm font-semibold text-white">{label}</p>
        {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors flex-shrink-0 ${
          checked ? "bg-brand-500" : "bg-surface-3"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

interface DayPickerProps {
  label: string;
  value: string;
  onChange: (day: string) => void;
}

function DayPicker({ label, value, onChange }: DayPickerProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center justify-between px-4 py-3.5 relative">
      <p className="text-sm font-semibold text-white">{label}</p>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-surface-2 border border-surface-3 rounded-xl px-3 py-1.5 text-sm text-brand-300 font-medium"
      >
        {value}
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-4 top-12 z-50 bg-surface-1 border border-surface-2 rounded-2xl overflow-hidden shadow-xl min-w-[140px]">
          {DAYS_OF_WEEK.map((day) => (
            <button
              key={day}
              onClick={() => { onChange(day); setOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                day === value
                  ? "bg-brand-900/50 text-brand-300 font-semibold"
                  : "text-slate-300 hover:bg-surface-2"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function SettingsPage() {
  const { state, updateSettings } = useApp();
  const [settings, setSettings] = useState<UserSettings>(state.settings);
  const [saved, setSaved] = useState(false);

  function update(patch: Partial<UserSettings>) {
    setSettings((s) => ({ ...s, ...patch }));
    setSaved(false);
  }

  function toggleEquipment(eq: Equipment) {
    const current = settings.availableEquipment;
    const next = current.includes(eq)
      ? current.filter((e) => e !== eq)
      : [...current, eq];
    update({ availableEquipment: next });
  }

  function handleSave() {
    updateSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="flex flex-col pb-32">
      <PageHeader
        title="Settings"
        subtitle="Customize your program"
      />

      <div className="px-4 space-y-5">

        {/* Equipment */}
        <div>
          <SectionTitle>Available Equipment</SectionTitle>
          <div className="bg-surface-1 border border-surface-2 rounded-2xl p-4">
            <div className="grid grid-cols-2 gap-2">
              {EQUIPMENT_OPTIONS.map(({ id, label, emoji }) => {
                const selected = settings.availableEquipment.includes(id);
                return (
                  <button
                    key={id}
                    onClick={() => toggleEquipment(id)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all text-left ${
                      selected
                        ? "bg-brand-900/40 border-brand-600 text-white"
                        : "bg-surface-2 border-surface-3 text-slate-400"
                    }`}
                  >
                    <span className="text-lg">{emoji}</span>
                    <span className="text-sm font-medium">{label}</span>
                    {selected && (
                      <Check size={14} className="text-brand-400 ml-auto flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Rep style */}
        <div>
          <SectionTitle>Main Lift Rep Style</SectionTitle>
          <div className="bg-surface-1 border border-surface-2 rounded-2xl overflow-hidden">
            {REP_STYLES.map(({ id, label, range, desc }, i) => {
              const selected = settings.mainLiftRepStyle === id;
              return (
                <button
                  key={id}
                  onClick={() => update({ mainLiftRepStyle: id })}
                  className={`w-full flex items-center justify-between px-4 py-3.5 text-left transition-colors ${
                    i !== REP_STYLES.length - 1 ? "border-b border-surface-2" : ""
                  } ${selected ? "bg-brand-900/30" : "hover:bg-surface-2"}`}
                >
                  <div>
                    <p className={`text-sm font-semibold ${selected ? "text-brand-300" : "text-white"}`}>
                      {label}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">{range} · {desc}</p>
                  </div>
                  {selected && <Check size={18} className="text-brand-400 flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Intensity */}
        <div>
          <SectionTitle>Intensity Cap (Max RPE)</SectionTitle>
          <div className="bg-surface-1 border border-surface-2 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-slate-400">Max RPE</span>
              <span className="text-xl font-bold text-white">{settings.maxRpe}</span>
            </div>
            <input
              type="range"
              min={6}
              max={10}
              step={1}
              value={settings.maxRpe}
              onChange={(e) => update({ maxRpe: Number(e.target.value) })}
              className="w-full accent-brand-500 h-2 rounded-full"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>6 – Easy</span>
              <span>10 – Max</span>
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div>
          <SectionTitle>Weekly Schedule</SectionTitle>
          <div className="bg-surface-1 border border-surface-2 rounded-2xl overflow-hidden">
            <DayPicker
              label="Day 1 – Squat Emphasis"
              value={settings.weeklySchedule.day1}
              onChange={(day) => update({ weeklySchedule: { ...settings.weeklySchedule, day1: day as DayId } })}
            />
            <div className="border-t border-surface-2" />
            <DayPicker
              label="Day 2 – Deadlift Emphasis"
              value={settings.weeklySchedule.day2}
              onChange={(day) => update({ weeklySchedule: { ...settings.weeklySchedule, day2: day as DayId } })}
            />
          </div>
        </div>

        {/* Sport day */}
        <div>
          <SectionTitle>Sport Day</SectionTitle>
          <div className="bg-surface-1 border border-surface-2 rounded-2xl overflow-hidden">
            <div className="px-4 py-3">
              <p className="text-xs text-slate-400 mb-2">Mark a day as sport/recovery to avoid scheduling heavy lower-body sessions adjacent to it.</p>
            </div>
            <div className="border-t border-surface-2 grid grid-cols-4">
              {["None", ...DAYS_OF_WEEK.slice(0, 6)].map((day, i) => {
                const val = day === "None" ? undefined : day;
                const selected = (settings.sportDay ?? undefined) === val;
                return (
                  <button
                    key={day}
                    onClick={() => update({ sportDay: val })}
                    className={`py-3 text-xs font-medium transition-colors ${
                      i !== 6 ? "border-r border-surface-2" : ""
                    } ${selected ? "bg-brand-900/40 text-brand-300" : "text-slate-400 hover:bg-surface-2"}`}
                  >
                    {day === "None" ? "None" : day.slice(0, 3)}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Back friendly */}
        <div>
          <SectionTitle>Modifiers</SectionTitle>
          <div className="bg-surface-1 border border-surface-2 rounded-2xl overflow-hidden">
            <ToggleRow
              label="Back-Friendly Mode"
              description="Caps main lift sets at 3, limits barbell progression to +5 lb."
              checked={settings.backFriendlyMode}
              onChange={(v) => update({ backFriendlyMode: v })}
            />
          </div>
        </div>
      </div>

      {/* Save button */}
      <div className="fixed bottom-[72px] left-0 right-0 px-4 py-3 bg-gradient-to-t from-surface-0 via-surface-0/90 to-transparent">
        <button
          onClick={handleSave}
          className={`w-full font-bold py-4 rounded-2xl text-base transition-all shadow-lg ${
            saved
              ? "bg-green-600 text-white"
              : "bg-brand-600 hover:bg-brand-500 text-white"
          }`}
        >
          {saved ? "✓ Saved!" : "Save Settings"}
        </button>
      </div>
    </div>
  );
}
