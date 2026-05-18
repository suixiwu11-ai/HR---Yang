"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type ViewMode = "hrbp" | "cpo" | "executive";

const Ctx = createContext<{
  viewMode: ViewMode;
  setViewMode: (m: ViewMode) => void;
}>({ viewMode: "hrbp", setViewMode: () => {} });

export function ViewModeProvider({ children }: { children: React.ReactNode }) {
  const [viewMode, setViewMode] = useState<ViewMode>("hrbp");
  useEffect(() => {
    const s = localStorage.getItem("stride-view") as ViewMode | null;
    if (s) setViewMode(s);
  }, []);
  useEffect(() => {
    localStorage.setItem("stride-view", viewMode);
  }, [viewMode]);
  return <Ctx.Provider value={{ viewMode, setViewMode }}>{children}</Ctx.Provider>;
}

export function useViewMode() {
  return useContext(Ctx);
}
