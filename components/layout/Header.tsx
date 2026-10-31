import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import Logo from "@/components/Logo";
import MobileNav from "./MobileNav";

export default function Header() {
  return (
    <header className="relative border-b border-line bg-surface">
      <div className="container-page flex h-16 items-center justify-between">
        <Logo />

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
