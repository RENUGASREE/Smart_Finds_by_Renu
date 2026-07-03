"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Discover" },
  { href: "/handmade", label: "Handmade" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="glass-nav sticky top-0 z-50 w-full">
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3 transition-opacity hover:opacity-90"
        >
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-[var(--accent)]/15 bg-white p-0.5 shadow-[0_2px_12px_-2px_rgba(184,149,106,0.25)] ring-2 ring-transparent transition-all group-hover:ring-[var(--accent)]/10">
            <div className="relative h-full w-full overflow-hidden rounded-full">
              <Image
                src="/Smart_Finds_by_Renu.png"
                alt="Smart Finds by Renu"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          <span className="hidden truncate font-heading text-lg tracking-tight sm:inline">
            Smart Finds by Renu
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm transition-all duration-200",
                pathname === link.href
                  ? "font-medium text-foreground"
                  : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
              )}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-[var(--accent)]" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-0.5">
          <Link
            href="/search"
            className="rounded-full p-2.5 text-muted-foreground transition-all duration-200 hover:bg-secondary hover:text-foreground hover:shadow-sm"
            aria-label="Search finds"
          >
            <Search className="h-5 w-5" />
          </Link>

          <button
            onClick={() => setMenuOpen(true)}
            className="rounded-full p-2.5 text-muted-foreground transition-all duration-200 hover:bg-secondary hover:text-foreground md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setMenuOpen(false)}
        aria-hidden={!menuOpen}
      />

      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-[min(88vw,20rem)] border-l border-border/60 bg-background p-6 shadow-[0_8px_40px_-8px_rgb(0_0_0_0.15)] transition-transform duration-300 ease-out md:hidden",
          menuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 overflow-hidden rounded-full border border-border/80">
              <Image
                src="/Smart_Finds_by_Renu.png"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <span className="font-heading text-lg">Menu</span>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-1.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "rounded-2xl px-4 py-3.5 text-base transition-all duration-200",
                pathname === link.href
                  ? "bg-secondary font-medium text-foreground"
                  : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/search"
            onClick={() => setMenuOpen(false)}
            className="rounded-2xl px-4 py-3.5 text-base text-muted-foreground transition-all duration-200 hover:bg-secondary/70 hover:text-foreground"
          >
            Search Finds
          </Link>
        </nav>
      </div>
    </header>
  );
}
