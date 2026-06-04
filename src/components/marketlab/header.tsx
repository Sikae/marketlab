import Link from "next/link";

import { HeaderNavLink } from "@/components/marketlab/header-nav-link";
import { ThemeToggle } from "@/components/marketlab/theme-toggle";

export function Header() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <div className="flex items-center gap-6">
          <Link
            href="/markets"
            className="text-lg font-semibold tracking-tight text-foreground"
          >
            MarketLab
          </Link>
          <nav className="flex items-center gap-1">
            <HeaderNavLink href="/markets">Markets</HeaderNavLink>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2" data-slot="header-auth" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
