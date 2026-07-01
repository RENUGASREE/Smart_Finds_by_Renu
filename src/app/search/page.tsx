import { createClient } from "@/lib/supabase/server";
import ProductCard from "@/components/blocks/ProductCard";
import { Search as SearchIcon } from "lucide-react";

export const metadata = {
  title: "Search - Smart Finds by Renu",
  description: "Search for curated affiliate products.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; platform?: string }>;
}) {
  const params = await searchParams;
  const q = params.q?.toLowerCase() || "";
  const categoryParam = params.category;
  const platformParam = params.platform;

  const supabase = await createClient();

  // Fetch categories for the dropdown
  const { data: categories } = await supabase.from("categories").select("id, name, slug").order("name");

  // Build the products query
  let query = supabase.from("products").select("*, category:categories(name, slug)");

  if (q) {
    query = query.or(`title.ilike.%${q}%,short_description.ilike.%${q}%`);
  }

  if (categoryParam) {
    // We need the category id, but we only have the slug from the URL.
    // So we use the related table filter syntax:
    query = query.eq("categories.slug", categoryParam);
  }

  if (platformParam) {
    query = query.ilike("platform", platformParam);
  }

  const { data: resultsData } = await query;
  
  // Supabase inner join filtering can return products with null category if it doesn't match the inner join eq
  // So we filter them out if categoryParam was provided.
  let results = resultsData || [];
  if (categoryParam) {
    results = results.filter((p: any) => p.category?.slug === categoryParam);
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 pb-24">
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 text-center">Find Products</h1>
        
        {/* Simple Search Form */}
        <form className="flex flex-col md:flex-row gap-4 mb-8 bg-muted/50 p-4 rounded-3xl border">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Search by title..."
              className="w-full h-12 pl-12 pr-4 rounded-2xl border-none bg-background shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex gap-4">
            <select
              name="category"
              defaultValue={categoryParam || ""}
              className="h-12 px-4 rounded-2xl border-none bg-background shadow-sm focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
            >
              <option value="">All Categories</option>
              {(categories || []).map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
            <select
              name="platform"
              defaultValue={platformParam || ""}
              className="h-12 px-4 rounded-2xl border-none bg-background shadow-sm focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
            >
              <option value="">All Platforms</option>
              <option value="Amazon">Amazon</option>
              <option value="Flipkart">Flipkart</option>
              <option value="Other">Other</option>
            </select>
            <button
              type="submit"
              className="h-12 px-8 bg-primary text-primary-foreground font-medium rounded-2xl hover:bg-primary/90 transition-colors shadow-sm"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-8">
          {results.length} {results.length === 1 ? "Result" : "Results"}
          {q && <span> for "{q}"</span>}
        </h2>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed">
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
}
