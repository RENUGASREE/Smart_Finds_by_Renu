import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import ProductCard from "@/components/blocks/ProductCard";
import FeaturedFindCard from "@/components/blocks/FeaturedFindCard";
import CategoryCard from "@/components/blocks/CategoryCard";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const [
    { data: categories },
    { data: featuredProducts },
    { data: latestProducts },
    { data: handmadeProducts },
  ] = await Promise.all([
    supabase.from("categories").select("*").order("display_order", { ascending: true }),
    supabase
      .from("products")
      .select("*, category:categories(name)")
      .eq("featured", true)
      .order("display_order", { ascending: true })
      .limit(3),
    supabase
      .from("products")
      .select("*, category:categories(name)")
      .eq("featured", false)
      .eq("handmade", false)
      .order("created_at", { ascending: false })
      .limit(4),
    supabase
      .from("products")
      .select("*, category:categories(name)")
      .eq("handmade", true)
      .order("created_at", { ascending: false })
      .limit(4),
  ]);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-5 pb-20 pt-16 sm:px-8 md:pb-28 md:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-border/80 bg-white shadow-soft">
            <Image
              src="/Smart_Finds_by_Renu.png"
              alt="Smart Finds by Renu"
              width={64}
              height={64}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          <h1 className="font-heading mb-6 text-4xl leading-[1.1] sm:text-5xl md:text-6xl">
            Smart recommendations for everyday life.
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Curated Amazon finds, handmade creations, and useful products I
            genuinely recommend.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/categories"
              className={buttonVariants({
                size: "lg",
                className: "h-12 rounded-full px-8 shadow-soft",
              })}
            >
              Explore Finds
            </Link>
            <Link
              href="/handmade"
              className={buttonVariants({
                size: "lg",
                variant: "outline",
                className: "h-12 rounded-full px-8",
              })}
            >
              Handmade Collection
            </Link>
          </div>
        </div>
      </section>

      {/* About preview */}
      <section className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8 md:pb-28">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <div className="overflow-hidden rounded-[2rem] border border-border/60 bg-white p-4 shadow-card md:p-6">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="/About.png"
                alt="Renu"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          <div>
            <h2 className="font-heading mb-5 text-3xl md:text-4xl">
              Hi, I&apos;m Renu 👋
            </h2>
            <p className="mb-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              I love discovering products that actually make everyday life
              better.
            </p>
            <p className="mb-8 text-base leading-relaxed text-muted-foreground md:text-lg">
              From skincare to home essentials, gadgets and handmade creations, I
              only share products I&apos;d genuinely recommend.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-[var(--accent)]"
            >
              Read More
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured finds */}
      {featuredProducts && featuredProducts.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8 md:pb-28">
          <div className="mb-10 md:mb-12">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Renu Recommends
            </p>
            <h2 className="font-heading text-3xl md:text-4xl">Featured Finds</h2>
          </div>

          <div className="space-y-8">
            {featuredProducts.map((product) => (
              <FeaturedFindCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Latest finds */}
      {latestProducts && latestProducts.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8 md:pb-28">
          <div className="mb-10 flex items-end justify-between md:mb-12">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Just Added
              </p>
              <h2 className="font-heading text-3xl md:text-4xl">Latest Finds</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {latestProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      {categories && categories.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8 md:pb-28">
          <div className="mb-10 flex items-end justify-between md:mb-12">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Browse
              </p>
              <h2 className="font-heading text-3xl md:text-4xl">Categories</h2>
            </div>
            <Link
              href="/categories"
              className="hidden items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-[var(--accent)] sm:inline-flex"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>
      )}

      {/* Handmade */}
      <section className="bg-[var(--beige)] py-20 md:py-28">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <div className="mb-10 flex items-end justify-between md:mb-12">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Crafted with care
              </p>
              <h2 className="font-heading text-3xl md:text-4xl">
                Handmade by Renu
              </h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Unique resin art and jewelry pieces, made slowly and with
                intention.
              </p>
            </div>
            <Link
              href="/handmade"
              className="hidden items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-[var(--accent)] sm:inline-flex"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {handmadeProducts && handmadeProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {handmadeProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              New handmade pieces coming soon.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
