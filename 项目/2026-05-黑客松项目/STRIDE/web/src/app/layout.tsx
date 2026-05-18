import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/AppShell";

export const metadata: Metadata = {
  title: "STRIDE",
  description: "Strategic Talent ROI & Investment Decision Engine",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/css/stride-doc-shared.css" />
        <link rel="stylesheet" href="/css/stride-app.css" />
      </head>
      <body>
        <div className="page-bg" aria-hidden="true" />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
