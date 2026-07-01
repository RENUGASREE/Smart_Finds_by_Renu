import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Share2, Check, Star } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";
import ProductCard from "@/components/blocks/ProductCard";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: product } = await supabase.from("products").select("title, short_description").eq("slug", slug).single();
  
  if (!product) return { title: "Not Found" };
  return {
    title: `${product.title} - Smart Finds by Renu`,
    description: product.short_description,
  };
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: product } = await supabase.from("products").select("*, category:categories(name)").eq("slug", slug).single();

  if (!product) {
    notFound();
  }

  // Related products (same category)
  const { data: relatedProductsData } = await supabase
    .from("products")
    .select("*, category:categories(name)")
    .eq("category_id", product.category_id)
    .neq("id", product.id)
    .limit(4);
    
  const relatedProducts = relatedProductsData || [];

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-24">
        {/* Product Image */}
        <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden bg-muted shadow-sm">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              No Image
            </div>
          )}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.badge && (
              <Badge className="bg-primary/90 hover:bg-primary text-primary-foreground backdrop-blur-sm border-none shadow-sm text-sm py-1 px-3">
                {product.badge}
              </Badge>
            )}
            {product.handmade && (
              <Badge variant="secondary" className="bg-background/90 hover:bg-background text-foreground backdrop-blur-sm shadow-sm text-sm py-1 px-3">
                Handmade
              </Badge>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              {product.category?.name}
            </span>
            <span className="text-muted-foreground text-sm">•</span>
            <span className="text-muted-foreground text-sm flex items-center">
              Available on {product.platform}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{product.title}</h1>
          
          {product.price && (
            <div className="text-3xl font-bold mb-6">
              ${product.price.toFixed(2)}
            </div>
          )}

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            {product.short_description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Link href={product.affiliate_link} target="_blank" rel="noopener noreferrer" className={`${buttonVariants({ size: "lg" })} rounded-full flex-1 text-base h-14 shadow-lg`}>
              Buy Now on {product.platform} <ExternalLink className="ml-2 h-5 w-5" />
            </Link>
            <Button size="lg" variant="outline" className="rounded-full h-14 px-8 shrink-0">
              <Share2 className="mr-2 h-5 w-5" /> Share
            </Button>
          </div>

          {product.why_i_recommend && (
            <div className="bg-primary/5 rounded-3xl p-6 md:p-8 mb-10 border border-primary/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Star className="w-24 h-24" />
              </div>
              <h3 className="text-lg font-bold mb-3 flex items-center relative z-10">
                <Star className="w-5 h-5 text-yellow-500 mr-2 fill-yellow-500" />
                Why I Recommend This
              </h3>
              <p className="text-muted-foreground leading-relaxed relative z-10">
                "{product.why_i_recommend}"
              </p>
            </div>
          )}

          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <h3 className="text-xl font-bold mb-4">Product Details</h3>
            <p>{product.description}</p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-8">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(rp => (
              <ProductCard key={rp.id} product={rp} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
