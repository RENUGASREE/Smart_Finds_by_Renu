import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CategoryCard from "@/components/blocks/CategoryCard";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Categories - Smart Finds by Renu",
  description: "Browse curated find categories — beauty, home, lifestyle, and more.",
};

export default async function CategoriesPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name, slug, display_order")
    .order("display_order", { ascending: true });

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
      <div className="mb-12 max-w-2xl">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Discover
        </p>
        <h1 className="font-heading mb-4 text-4xl md:text-5xl">Categories</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Explore my curated collections — each one filled with finds I&apos;d
          happily recommend to a friend.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {(categories || []).map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

      {(categories || []).length === 0 && (
        <div className="rounded-[2rem] border border-dashed border-border/80 bg-secondary/30 px-6 py-16 text-center">
          <p className="text-muted-foreground">Categories coming soon.</p>
          <Link
            href="/"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium hover:text-[var(--accent)]"
          >
            Back home
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
