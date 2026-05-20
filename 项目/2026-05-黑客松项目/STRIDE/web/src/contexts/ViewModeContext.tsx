"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type ViewMode = "hrbp" | "cpo" | "executive";

const Ctx = createContext<{
  viewMode: ViewMode;
  setViewMode: (m: ViewMode) => void;
}>({ viewMode: "hrbp", setViewMode: () => {} });

function readStoredViewMode(): ViewMode {
  const s = localStorage.getItem("stride-view");
  if (s === "cpo") return "cpo";
  if (s === "hrbp") return "hrbp";
  // 旧版曾把「经营」存进 stride-view，导致工作台默认空白；统一回 HRBP
  if (s === "executive") {
    localStorage.setItem("stride-view", "hrbp");
    return "hrbp";
  }
  return "hrbp";
}

export function ViewModeProvider({ children }: { children: React.ReactNode }) {
  const [viewMode, setViewMode] = useState<ViewMode>("hrbp");
  useEffect(() => {
    setViewMode(readStoredViewMode());
  }, []);
  useEffect(() => {
    if (viewMode !== "executive") {
      localStorage.setItem("stride-view", viewMode);
    }
  }, [viewMode]);
  return <Ctx.Provider value={{ viewMode, setViewMode }}>{children}</Ctx.Provider>;
}

export function useViewMode() {
  return useContext(Ctx);
}
