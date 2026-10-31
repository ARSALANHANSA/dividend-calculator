import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo";
import JsonLd from "./JsonLd";

/** Renders visible breadcrumbs plus matching BreadcrumbList structured data. */
export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-1">
          {crumbs.map((crumb, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <li key={crumb.path} className="flex items-center gap-1">
                {isLast ? (
                  <span aria-current="page" className="text-ink">
                    {crumb.name}
                  </span>
                ) : (
                  <>
                    <Link href={crumb.path} className="hover:text-ink hover:underline">
                      {crumb.name}
                    </Link>
                    <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
