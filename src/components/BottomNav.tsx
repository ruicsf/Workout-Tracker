import { Activity, Calendar, Dumbbell, Settings } from "lucide-react";
import type { ActiveView } from "../types";
import { useApp } from "../context/AppContext";

const NAV_ITEMS: { view: ActiveView; label: string; Icon: React.ElementType }[] = [
  { view: "today",   label: "Today",   Icon: Dumbbell  },
  { view: "history", label: "History", Icon: Activity  },
  { view: "program", label: "Program", Icon: Calendar  },
  { view: "settings",label: "Settings",Icon: Settings  },
];

export function BottomNav() {
  const { state, dispatch } = useApp();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface-1 border-t border-surface-2 safe-bottom">
      <div className="flex items-center">
        {NAV_ITEMS.map(({ view, label, Icon }) => {
          const isActive = state.activeView === view;
          return (
            <button
              key={view}
              onClick={() => dispatch({ type: "SET_VIEW", view })}
              className={`flex-1 flex flex-col items-center py-3 gap-1 transition-colors ${
                isActive
                  ? "text-brand-400"
                  : "text-surface-3 hover:text-slate-300"
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
              <span className="text-[10px] font-medium tracking-wide">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
