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
    { data: trendingProducts },
    { data: handmadeProducts },
  ] = await Promise.all([
    supabase.from("categories").select("id, name, slug, image_url, display_order").order("display_order", { ascending: true }).limit(8),
    supabase
      .from("products")
      .select("*, category:categories(name), platform:platforms(name)")
      .eq("featured", true)
      .order("display_order", { ascending: true })
      .limit(3),
    supabase
      .from("products")
      .select("*, category:categories(name), platform:platforms(name)")
      .eq("featured", false)
      .eq("handmade", false)
      .order("created_at", { ascending: false })
      .limit(4),
    supabase
      .from("products")
      .select("*, category:categories(name), platform:platforms(name)")
      .eq("featured", false)
      .eq("handmade", false)
      .order("display_order", { ascending: true })
      .limit(4),
    supabase
      .from("products")
      .select("*, category:categories(name), platform:platforms(name)")
      .eq("handmade", true)
      .order("display_order", { ascending: true })
      .limit(4),
  ]);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(184,149,106,0.14),transparent_70%)]"
        />
        <div className="mx-auto w-full max-w-6xl px-5 pb-24 pt-20 sm:px-8 md:pb-32 md:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-10 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-[var(--accent)]/20 bg-white p-0.5 shadow-[0_8px_32px_-8px_rgba(184,149,106,0.35)] ring-4 ring-[var(--accent)]/5 sm:h-24 sm:w-24">
              <div className="relative h-full w-full overflow-hidden rounded-full">
                <Image
                  src="/Smart_Finds_by_Renu.png"
                  alt="Smart Finds by Renu"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
              Curated for you
            </p>

            <h1 className="font-heading mb-7 text-[2.75rem] leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              Smart recommendations for everyday life.
            </h1>

            <p className="mx-auto mb-12 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl md:leading-relaxed">
              Curated Amazon &amp; Flipkart finds, handmade creations, and
              useful products I genuinely recommend.
            </p>

            <div className="flex flex-col items-stretch justify-center gap-3.5 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href="/categories"
                className={buttonVariants({
                  size: "lg",
                  className:
                    "h-13 rounded-full px-10 text-base shadow-[0_4px_20px_-4px_rgba(184,149,106,0.45)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_28px_-4px_rgba(184,149,106,0.5)]",
                })}
              >
                Explore Finds
              </Link>
              <Link
                href="/handmade"
                className={buttonVariants({
                  size: "lg",
                  variant: "outline",
                  className:
                    "h-13 rounded-full border-border/80 bg-white/60 px-10 text-base backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-[var(--accent)]/40 hover:bg-white hover:shadow-soft",
                })}
              >
                Handmade Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About preview */}
      <section className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8 md:pb-32">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
          <div className="overflow-hidden rounded-[2rem] border border-border/50 bg-white p-5 shadow-[0_4px_24px_-8px_rgb(0_0_0_0.07)] md:p-7">
            <div className="relative min-h-[360px] w-full sm:min-h-[400px] md:min-h-[440px]">
              <Image
                src="/About.png"
                alt="Renu"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
          </div>

          <div className="md:py-2">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
              Meet Renu
            </p>
            <h2 className="font-heading mb-6 text-3xl tracking-tight md:text-4xl">
              Hi, I&apos;m Renu 👋
            </h2>
            <p className="mb-5 text-base leading-[1.75] text-muted-foreground md:text-lg">
              I love discovering products that actually make everyday life
              better.
            </p>
            <p className="mb-8 text-base leading-[1.75] text-muted-foreground md:text-lg">
              From skincare to home essentials, gadgets and handmade creations, I
              only share products I&apos;d genuinely recommend.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white px-5 py-2.5 text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-[var(--accent)]/40 hover:text-[var(--accent)] hover:shadow-soft"
            >
              Read More
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured finds */}
      {featuredProducts && featuredProducts.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8 md:pb-32">
          <div className="mb-12 md:mb-14">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
              Renu Recommends
            </p>
            <h2 className="font-heading text-3xl tracking-tight md:text-4xl">
              Featured Finds
            </h2>
          </div>

          <div className="space-y-10 md:space-y-12">
            {featuredProducts.map((product) => (
              <FeaturedFindCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Latest finds */}
      {latestProducts && latestProducts.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8 md:pb-32">
          <div className="mb-12 md:mb-14">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
              Just Added
            </p>
            <h2 className="font-heading text-3xl tracking-tight md:text-4xl">
              Latest Finds
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {latestProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Trending finds */}
      {trendingProducts && trendingProducts.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8 md:pb-32">
          <div className="mb-12 md:mb-14">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
              Popular
            </p>
            <h2 className="font-heading text-3xl tracking-tight md:text-4xl">
              Trending Finds
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      {categories && categories.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8 md:pb-32">
          <div className="mb-12 flex items-end justify-between md:mb-14">
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
                Browse
              </p>
              <h2 className="font-heading text-3xl tracking-tight md:text-4xl">
                Categories
              </h2>
            </div>
            <Link
              href="/categories"
              className="hidden items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-[var(--accent)] sm:inline-flex"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>
      )}

      {/* Handmade */}
      <section className="bg-[var(--beige)] py-24 md:py-32">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <div className="mb-12 flex items-end justify-between md:mb-14">
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
                Crafted with care
              </p>
              <h2 className="font-heading text-3xl tracking-tight md:text-4xl">
                Handmade by Renu
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Unique resin art and jewelry pieces, made slowly and with
                intention.
              </p>
            </div>
            <Link
              href="/handmade"
              className="hidden items-center gap-1.5 rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur-sm transition-all hover:bg-white hover:text-[var(--accent)] hover:shadow-soft sm:inline-flex"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {handmadeProducts && handmadeProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
              {handmadeProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-[1.75rem] border border-dashed border-border/80 bg-white/50 px-6 py-12 text-center">
              <p className="text-sm text-muted-foreground">
                New handmade pieces coming soon.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
