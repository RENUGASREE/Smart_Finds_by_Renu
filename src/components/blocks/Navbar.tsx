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
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full border border-border/80 bg-white shadow-soft">
            <Image
              src="/Smart_Finds_by_Renu.png"
              alt="Smart Finds by Renu"
              fill
              className="object-cover"
              priority
            />
          </div>
          <span className="hidden font-heading text-lg sm:inline">Smart Finds by Renu</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm transition-colors hover:text-[var(--accent)]",
                pathname === link.href
                  ? "font-medium text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href="/search"
            className="rounded-full p-2.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Search finds"
          >
            <Search className="h-5 w-5" />
          </Link>

          <button
            onClick={() => setMenuOpen(true)}
            className="rounded-full p-2.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground md:hidden"
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
          "fixed inset-y-0 right-0 z-50 w-[min(88vw,20rem)] border-l border-border/60 bg-background p-6 shadow-card transition-transform duration-300 ease-out md:hidden",
          menuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="mb-8 flex items-center justify-between">
          <span className="font-heading text-lg">Menu</span>
          <button
            onClick={() => setMenuOpen(false)}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "rounded-2xl px-4 py-3 text-base transition-colors",
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
            className="rounded-2xl px-4 py-3 text-base text-muted-foreground transition-colors hover:bg-secondary/70 hover:text-foreground"
          >
            Search Finds
          </Link>
        </nav>
      </div>
    </header>
  );
}
