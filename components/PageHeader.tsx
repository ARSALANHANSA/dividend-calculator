import type { ReactNode } from "react";
import type { Crumb } from "@/lib/seo";
import Breadcrumbs from "./Breadcrumbs";

export default function PageHeader({
  title,
  intro,
  crumbs,
  meta,
}: {
  title: string;
  intro?: ReactNode;
  crumbs?: Crumb[];
  meta?: ReactNode;
}) {
  return (
    <div className="border-b border-line bg-surface">
      <div className="container-page py-10 sm:py-14">
        {crumbs && <Breadcrumbs crumbs={crumbs} />}
        <h1 className="mt-4 max-w-3xl font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
          {title}
        </h1>
        {intro && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>}
        {meta && <div className="mt-4 text-sm text-muted">{meta}</div>}
      </div>
    </div>
  );
}
