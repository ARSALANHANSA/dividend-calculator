import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import MobileNav from "./MobileNav";

export default function Header() {
  return (
    <header className="relative border-b border-line bg-surface">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-medium text-ink">
          <span aria-hidden="true" className="inline-block h-2.5 w-2.5 rounded-full bg-accent" />
          {siteConfig.name}
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {siteConfig.mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:bg-paper hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <MobileNav links={siteConfig.mainNav} />
      </div>
    </header>
  );
}
