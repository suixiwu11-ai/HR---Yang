"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { ViewModeProvider, useViewMode } from "@/contexts/ViewModeContext";

const QuarterCtx = createContext<{
  quarterId: string;
  setQuarterId: (id: string) => void;
}>({
  quarterId: "2025Q3",
  setQuarterId: () => {},
});

export function useQuarter() {
  return useContext(QuarterCtx);
}

function HeaderNav() {
  const pathname = usePathname();
  const { viewMode, setViewMode } = useViewMode();
  const { quarterId, setQuarterId } = useQuarter();
  const [quarters, setQuarters] = useState<{ id: string; label: string }[]>([]);

  useEffect(() => {
    fetch("/api/quarters")
      .then((r) => r.json())
      .then((d) => setQuarters(d.quarters ?? []))
      .catch(() => {});
  }, []);

  const links = [
    { href: "/", label: "\u5de5\u4f5c\u53f0" },
    { href: "/wizard", label: "\u5411\u5bfc" },
    { href: "/scenario", label: "\u60c5\u666f" },
    { href: "/executive", label: "\u7ecf\u8425\u6458\u8981" },
    { href: "/x10", label: "10\u00d7" },
    { href: "/settings", label: "\u6570\u636e" },
  ];

  return (
    <header className="app-header">
      <div className="app-header-inner">
        <Link href="/" className="brand" style={{ textDecoration: "none", color: "inherit" }}>
          <span className="brand-icon">
            <svg viewBox="0 0 16 16" fill="none" width={16} height={16}>
              <path d="M8 2L14 8L8 14L2 8L8 2Z" fill="white" />
            </svg>
          </span>
          STRIDE
        </Link>
        <nav className="app-tabs">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={pathname === l.href ? "active" : ""}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
          <div className="view-switch">
            {(
              [
                ["hrbp", "HRBP"],
                ["cpo", "CPO"],
                ["executive", "\u7ecf\u8425"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                className={viewMode === id ? "active" : ""}
                onClick={() => setViewMode(id)}
              >
                {label}
              </button>
            ))}
          </div>
          <select
            value={quarterId}
            onChange={(e) => setQuarterId(e.target.value)}
            style={{
              fontSize: "0.75rem",
              padding: "0.35rem 0.5rem",
              borderRadius: 8,
              border: "1px solid var(--border)",
            }}
          >
            {quarters.length === 0 ? (
              <option value={quarterId}>{quarterId}</option>
            ) : (
              quarters.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.label || q.id}
                </option>
              ))
            )}
          </select>
        </div>
      </div>
    </header>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [quarterId, setQuarterId] = useState("2025Q3");

  useEffect(() => {
    const saved = localStorage.getItem("stride-quarter");
    if (saved) setQuarterId(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("stride-quarter", quarterId);
  }, [quarterId]);

  return (
    <QuarterCtx.Provider value={{ quarterId, setQuarterId }}>
      <ViewModeProvider>
        <div className="app-shell">
          <p className="proto-banner">
            {"STRIDE \u00b7 Next.js \u00b7 SQLite \u00b7 "}
            {quarterId}
            {" \u00b7 \u63a8\u6f14\u6570\u636e"}
          </p>
          <HeaderNav />
          {children}
        </div>
      </ViewModeProvider>
    </QuarterCtx.Provider>
  );
}
