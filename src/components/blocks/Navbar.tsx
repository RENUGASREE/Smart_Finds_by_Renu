"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, Home, Compass, Heart, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/categories", label: "Discover", icon: Compass },
  { href: "/handmade", label: "Handmade", icon: Heart },
  { href: "/about", label: "About", icon: Info },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
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
          </div>
        </div>
      </header>

      {/* Bottom Navigation Bar - Mobile Only */}
      <nav className="fixed bottom-0 left-0 right-0 z-[1000] border-t border-border/60 bg-background/95 backdrop-blur-md md:hidden">
        <div className="flex items-center justify-around px-2 py-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex flex-col items-center gap-0.5 rounded-xl px-3 py-2 text-xs transition-all duration-200",
                  pathname === link.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:bg-secondary/50"
                )}
              >
                <Icon className={cn("h-5 w-5", pathname === link.href ? "text-[var(--accent)]" : "")} />
                <span className="font-medium">{link.label}</span>
              </Link>
            );
          })}
          <Link
            href="/search"
            className={cn(
              "flex flex-col items-center gap-0.5 rounded-xl px-3 py-2 text-xs transition-all duration-200",
              pathname === "/search"
                ? "text-foreground"
                : "text-muted-foreground hover:bg-secondary/50"
            )}
          >
            <Search className={cn("h-5 w-5", pathname === "/search" ? "text-[var(--accent)]" : "")} />
            <span className="font-medium">Search</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
