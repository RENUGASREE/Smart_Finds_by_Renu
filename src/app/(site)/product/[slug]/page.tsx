import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";
import ProductCard from "@/components/blocks/ProductCard";
import { getAffiliateCta } from "@/lib/platform-cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: product } = await supabase
    .from("products")
    .select("title, short_description")
    .eq("slug", slug)
    .single();

  if (!product) return { title: "Not Found" };
  return {
    title: `${product.title} - Smart Finds by Renu`,
    description: product.short_description,
  };
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: product } = await supabase
    .from("products")
    .select("*, category:categories(name), platform:platforms(name)")
    .eq("slug", slug)
    .single();

  if (!product) {
    notFound();
  }

  const { data: relatedProductsData } = await supabase
    .from("products")
    .select("*, category:categories(name), platform:platforms(name)")
    .eq("category_id", product.category_id)
    .neq("id", product.id)
    .limit(4);

  const relatedProducts = relatedProductsData || [];

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
      <div className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="overflow-hidden rounded-[2rem] border border-border/60 bg-white shadow-card">
          <div className="relative aspect-square bg-muted">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                No image
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {product.category?.name && (
              <Badge className="border-none bg-secondary px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                {product.category.name}
              </Badge>
            )}
            {product.handmade && (
              <Badge className="border-none bg-[var(--beige)] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em]">
                Handmade
              </Badge>
            )}
            {product.badge && (
              <Badge className="border-none bg-[var(--accent)]/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
                {product.badge}
              </Badge>
            )}
          </div>

          <h1 className="font-heading mb-5 text-4xl leading-tight md:text-5xl">
            {product.title}
          </h1>

          <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
            {product.short_description}
          </p>

          <Link
            href={product.affiliate_link}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              size: "lg",
              className: "mb-10 h-14 w-full rounded-full text-base shadow-soft sm:w-fit sm:px-10",
            })}
          >
            {getAffiliateCta(product.platform)}
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                More to explore
              </p>
              <h2 className="font-heading text-2xl md:text-3xl">
                You might also like
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((rp) => (
              <ProductCard key={rp.id} product={rp} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
