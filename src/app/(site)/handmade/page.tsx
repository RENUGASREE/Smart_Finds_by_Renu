import ProductCard from "@/components/blocks/ProductCard";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const metadata = {
  title: "Handmade Collection - Smart Finds by Renu",
  description:
    "Explore handcrafted jewelry and resin art curated by Renu.",
};

export default async function HandmadePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const paramsAwaited = await searchParams;
  const page = parseInt(paramsAwaited.page || "1");
  const limit = 12;
  const offset = (page - 1) * limit;
  const supabase = await createClient();
  const { data: products, count } = await supabase
    .from("products")
    .select("*, category:categories(name)", { count: "exact" })
    .eq("handmade", true)
    .order("display_order", { ascending: true })
    .range(offset, offset + limit - 1);

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
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {(products || []).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {count && offset + limit < count && (
              <div className="mt-12 flex justify-center">
                <Link
                  href={`?page=${page + 1}`}
                  className={buttonVariants({ variant: "outline", className: "h-12 rounded-full px-8 text-sm font-medium" })}
                >
                  Load More
                </Link>
              </div>
            )}
          </>
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
