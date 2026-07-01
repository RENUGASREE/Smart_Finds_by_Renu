import Link from "next/link";
import Image from "next/image";
import { Search, Menu, ShoppingBag } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/Smart_Finds_by_Renu.png" alt="Smart Finds by Renu" width={32} height={32} className="h-6 w-6 object-contain" />
            <span className="text-xl font-bold tracking-tight">Smart Finds by Renu</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/categories" className="transition-colors hover:text-primary text-muted-foreground">
              Categories
            </Link>
            <Link href="/about" className="transition-colors hover:text-primary text-muted-foreground">
              About
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/search" className="p-2 text-muted-foreground hover:text-primary transition-colors">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Link>
          <button className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}
