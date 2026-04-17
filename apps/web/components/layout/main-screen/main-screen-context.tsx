"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type MainView = "route" | "setting";

type MainScreenContextValue = {
  view: MainView;
  openSettingView: () => void;
  showRouteView: () => void;
};

const MainScreenContext = createContext<MainScreenContextValue | null>(null);

export function MainScreenProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<MainView>("route");

  const openSettingView = useCallback(() => setView("setting"), []);
  const showRouteView = useCallback(() => setView("route"), []);

  const value = useMemo(
    () => ({ view, openSettingView, showRouteView }),
    [view, openSettingView, showRouteView],
  );

  return (
    <MainScreenContext.Provider value={value}>
      {children}
    </MainScreenContext.Provider>
  );
}

export function useMainScreen() {
  const ctx = useContext(MainScreenContext);
  if (!ctx) {
    throw new Error("useMainScreen must be used within MainScreenProvider");
  }
  return ctx;
}
