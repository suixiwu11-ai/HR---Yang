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
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,600;0,9..40,700&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/css/stride-doc-shared.css" />
        <link rel="stylesheet" href="/css/stride-app.css" />
        <link rel="stylesheet" href="/css/stride-theme-mandai.css" />
      </head>
      <body className="theme-mandai">
        <div className="page-bg" aria-hidden="true" />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
