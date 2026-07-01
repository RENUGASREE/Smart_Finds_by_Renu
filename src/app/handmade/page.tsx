import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Handmade Collection - Smart Finds by Renu",
  description: "Explore handcrafted jewelry and resin art curated by Renu."
};

export default async function HandmadePage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*", { count: "exact" })
    .eq("category", "handmade")
    .order("display_order", { ascending: true });

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-3xl mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Handmade Collection
        </h1>
        <p className="text-xl text-muted-foreground">
          Unique handcrafted jewelry and resin art pieces made with love.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {(products || []).map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="group relative aspect-square overflow-hidden rounded-2xl bg-muted border border-transparent hover:border-[var(--accent)] hover:shadow-xl transition-all duration-300"
          >
            {product.image_url && (
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-white font-bold text-2xl leading-tight">
                {product.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
