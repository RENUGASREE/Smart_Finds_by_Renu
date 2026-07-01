import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Heart, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/blocks/ProductCard";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  // Fetch settings
  const { data: settingsData } = await supabase.from("settings").select("value").eq("key", "site_config").single();
  const config = settingsData?.value || { tagline: "Discover Smart Finds. Shop with Confidence.", website_name: "Smart Finds by Renu" };

  // Fetch categories
  const { data: categories } = await supabase.from("categories").select("*").order("display_order", { ascending: true });

  // Fetch featured product (Today's Pick)
  const { data: featuredProducts } = await supabase.from("products").select("*, category:categories(name)").eq("featured", true).limit(1);
  const featuredProduct = featuredProducts?.[0];

  // Fetch latest products (not featured, not handmade)
  const { data: latestProducts } = await supabase.from("products").select("*, category:categories(name)").eq("featured", false).eq("handmade", false).order("created_at", { ascending: false }).limit(4);

  // Fetch trending picks
  const { data: trendingPicks } = await supabase.from("products").select("*, category:categories(name)").eq("badge", "Trending").order("display_order", { ascending: true }).limit(4);

  // Fetch handmade collection
  const { data: handmadeProducts } = await supabase.from("products").select("*, category:categories(name)").eq("handmade", true).order("created_at", { ascending: false }).limit(4);

  return (
    <div className="flex flex-col pb-20">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 pt-24 pb-32 md:pt-28 md:pb-36">
        <div className="container mx-auto px-6 text-center">
          <Badge className="mb-8 px-4 py-1 bg-[var(--accent)]/10 text-[var(--accent)] hover:bg-[var(--accent)]/20 transition-colors border-none rounded-full">
            <Sparkles className="w-4 h-4 mr-1 inline" /> Premium Affiliate Showcase
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-8 max-w-4xl mx-auto">
            Smart Finds by Renu
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
            Curated Amazon &amp; Flipkart finds, handmade jewelry, resin art, and daily smart recommendations.
          </p>
          <p className="text-sm text-gray-600 mb-8 tracking-wider uppercase">
            Amazon Finds · Flipkart Finds · Handmade Jewelry · Resin Art · Curated Recommendations
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link href="/categories" className={buttonVariants({ size: "lg", className: "rounded-full px-8 bg-[var(--accent)] text-white hover:bg-[var(--accent)]/90 transition-transform transform hover:scale-105" })}>
              <ShoppingBag className="mr-2 h-5 w-5" /> Start Browsing
            </Link>
            <Link href="/categories/handmade" className={buttonVariants({ size: "lg", variant: "outline", className: "rounded-full px-8 border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)]/10" })}>
              <Heart className="mr-2 h-5 w-5 text-red-500" /> Handmade Collection
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Featured Product (Today's Pick) */}
      {featuredProduct && (
        <section className="container mx-auto px-4 -mt-10 relative z-10 mb-24">
          <div className="bg-background rounded-3xl p-6 md:p-10 shadow-2xl border flex flex-col md:flex-row gap-8 items-center max-w-5xl mx-auto">
            <div className="w-full md:w-1/2 relative aspect-square rounded-2xl overflow-hidden bg-muted">
              {featuredProduct.image_url && (
                <Image
                  src={featuredProduct.image_url}
                  alt={featuredProduct.title}
                  fill
                sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              )}
              <div className="absolute top-4 left-4">
                <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  Today's Featured Pick
                </span>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col items-start text-left">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                {featuredProduct.category?.name}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{featuredProduct.title}</h2>
              <p className="text-muted-foreground text-lg mb-6 line-clamp-3">
                {featuredProduct.short_description}
              </p>
              {featuredProduct.why_i_recommend && (
                <div className="bg-muted/50 rounded-2xl p-5 mb-8 border-l-4 border-primary">
                  <p className="italic text-sm text-foreground/80">"{featuredProduct.why_i_recommend}"</p>
                  <p className="text-xs text-muted-foreground mt-2 font-semibold">— Renu</p>
                </div>
              )}
              <Link href={featuredProduct.affiliate_link} target="_blank" rel="noopener noreferrer" className={buttonVariants({ size: "lg", className: "rounded-xl w-full sm:w-auto" })}>
                Buy Now on {featuredProduct.platform}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 3. Browse Categories */}
      <section className="container mx-auto px-4 mb-24">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Shop by Category</h2>
            <p className="text-muted-foreground">Find exactly what you're looking for.</p>
          </div>
          <Link href="/categories" className="hidden sm:flex items-center text-sm font-medium text-primary hover:underline">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {(categories || []).map((category) => (
            <Link key={category.id} href={`/categories/${category.slug}`} className="group relative aspect-square overflow-hidden rounded-2xl bg-muted transition-transform hover:-translate-y-1 duration-300">
              {category.image_url && (
                <Image
                  src={category.image_url}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-bold text-lg md:text-xl leading-tight">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Latest Products */}
      <section className="container mx-auto px-4 mb-24">
         <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Latest Finds</h2>
            <p className="text-muted-foreground">The newest products I'm loving right now.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(latestProducts || []).map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Trending Picks */}
      {trendingPicks && trendingPicks.length > 0 && (
        <section className="container mx-auto px-4 mb-24">
          <div className="bg-primary/5 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Trending Picks</h2>
            <p className="text-muted-foreground mb-10">What everyone is buying this week.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {(trendingPicks || []).map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Handmade Collection */}
      <section className="container mx-auto px-4 mb-24">
         <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2 flex items-center">
              Handmade by Renu <Heart className="ml-3 h-6 w-6 text-red-500 fill-red-500/20" />
            </h2>
            <p className="text-muted-foreground">Unique resin art and jewelry pieces crafted with love.</p>
          </div>
          <Link href="/categories/handmade" className="hidden sm:flex items-center text-sm font-medium text-primary hover:underline">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(handmadeProducts || []).map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. About Smart Finds */}
      <section className="container mx-auto px-4 mb-24">
        <div className="bg-muted rounded-3xl p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold tracking-tight mb-6">Why I Started Smart Finds</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              I've always loved finding the best products—whether it's the perfect skincare routine, the most aesthetically pleasing home decor, or the smartest tech gadgets.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              This site is my curated collection of things I genuinely recommend, alongside my own handmade creations. I hope you find something you love!
            </p>
            <Link href="/about" className={buttonVariants({ variant: "outline", className: "rounded-full" })}>Read More About Me</Link>
          </div>
          <div className="w-full md:w-1/2 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80"
              alt="About Renu"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
