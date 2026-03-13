import { useApp } from "./context/AppContext";
import { BottomNav } from "./components/BottomNav";
import { TodayPage } from "./pages/TodayPage";
import { HistoryPage } from "./pages/HistoryPage";
import { ProgramPage } from "./pages/ProgramPage";
import { SettingsPage } from "./pages/SettingsPage";

export function App() {
  const { state } = useApp();

  const pages = {
    today:    <TodayPage />,
    history:  <HistoryPage />,
    program:  <ProgramPage />,
    settings: <SettingsPage />,
  };

  return (
    <div className="min-h-screen bg-surface-0 text-white">
      <div className="max-w-lg mx-auto relative">
        <main className="min-h-screen overflow-y-auto">
          {pages[state.activeView]}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
