import type { ReactNode } from "react";

type PageHeroProps = {
  title: string;
  meta?: string;
  breadcrumb?: ReactNode;
  actions?: ReactNode;
};

export function PageHero({ title, meta, breadcrumb, actions }: PageHeroProps) {
  return (
    <div className="mandai-page-hero">
      {breadcrumb && <p className="breadcrumb">{breadcrumb}</p>}
      <h1>{title}</h1>
      {meta && <p className="meta">{meta}</p>}
      {actions}
    </div>
  );
}
