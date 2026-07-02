import ProductCard from "@/components/blocks/ProductCard";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Handmade Collection - Smart Finds by Renu",
  description:
    "Explore handcrafted jewelry and resin art curated by Renu.",
};

export default async function HandmadePage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*, category:categories(name)")
    .eq("handmade", true)
    .order("display_order", { ascending: true });

  return (
    <div className="bg-[var(--beige)]">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
        <div className="mb-12 max-w-2xl text-center md:mx-auto">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Crafted with care
          </p>
          <h1 className="font-heading mb-4 text-4xl md:text-5xl">
            Handmade Collection
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Unique handcrafted jewelry and resin art pieces, made slowly and
            with intention.
          </p>
        </div>

        {(products || []).length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {(products || []).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-border/80 bg-white/50 px-6 py-16 text-center">
            <p className="text-muted-foreground">
              New handmade pieces coming soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
