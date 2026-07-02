import { createClient } from "@/lib/supabase/server";
import ProductCard from "@/components/blocks/ProductCard";
import { Search as SearchIcon } from "lucide-react";

export const metadata = {
  title: "Search - Smart Finds by Renu",
  description: "Search curated finds recommended by Renu.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; platform?: string }>;
}) {
  const params = await searchParams;
  const q = params.q?.trim() || "";
  const categoryParam = params.category;
  const platformParam = params.platform;

  const supabase = await createClient();

  const { data: categories } = await supabase
    .from("categories")
    .select("id, name, slug")
    .order("name");

  let query = supabase
    .from("products")
    .select("*, category:categories(name, slug)");

  if (q) {
    query = query.or(
      `title.ilike.%${q}%,short_description.ilike.%${q}%,why_i_recommend.ilike.%${q}%`
    );
  }

  if (categoryParam) {
    query = query.eq("categories.slug", categoryParam);
  }

  if (platformParam) {
    query = query.ilike("platform", platformParam);
  }

  const { data: resultsData } = await query;

  let results = resultsData || [];
  if (categoryParam) {
    results = results.filter((p) => p.category?.slug === categoryParam);
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Explore
        </p>
        <h1 className="font-heading mb-8 text-4xl md:text-5xl">
          Search Finds
        </h1>

        <form className="rounded-[2rem] border border-border/60 bg-white p-4 shadow-soft md:p-5">
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder="Search by name or recommendation..."
                className="h-12 w-full rounded-full border border-border/60 bg-background pl-11 pr-4 text-sm outline-none transition-shadow focus:ring-2 focus:ring-[var(--accent)]/20"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <select
                name="category"
                defaultValue={categoryParam || ""}
                className="h-12 rounded-full border border-border/60 bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
              >
                <option value="">All categories</option>
                {(categories || []).map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>

              <select
                name="platform"
                defaultValue={platformParam || ""}
                className="h-12 rounded-full border border-border/60 bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
              >
                <option value="">All platforms</option>
                <option value="Amazon">Amazon</option>
                <option value="Flipkart">Flipkart</option>
                <option value="Other">Other</option>
              </select>

              <button
                type="submit"
                className="h-12 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>

      <div>
        <h2 className="font-heading mb-8 text-2xl">
          {results.length} {results.length === 1 ? "find" : "finds"}
          {q && (
            <span className="text-muted-foreground"> for &ldquo;{q}&rdquo;</span>
          )}
        </h2>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-border/80 bg-secondary/30 px-6 py-16 text-center">
            <h3 className="font-heading mb-2 text-xl">No finds yet</h3>
            <p className="text-muted-foreground">
              Try a different search or browse by category instead.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
