import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProductCard from "@/components/blocks/ProductCard";
import { createClient } from "@/lib/supabase/server";
import { buttonVariants } from "@/components/ui/button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: category } = await supabase
    .from("categories")
    .select("name")
    .eq("slug", slug)
    .single();

  if (!category) return { title: "Not Found" };

  return {
    title: `${category.name} - Smart Finds by Renu`,
    description: `Browse ${category.name} finds curated by Renu.`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const paramsAwaited = await searchParams;
  const page = parseInt(paramsAwaited.page || "1");
  const limit = 12;
  const offset = (page - 1) * limit;
  const supabase = await createClient();

  const { data: category } = await supabase
    .from("categories")
    .select("id, name, slug")
    .eq("slug", slug)
    .single();

  if (!category) {
    notFound();
  }

  const { data: products, count } = await supabase
    .from("products")
    .select("*, category:categories(name), platform:platforms!platform_id(id,name)", { count: "exact" })
    .eq("category_id", category.id)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
      <Link
        href="/categories"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-[var(--accent)]"
      >
        <ArrowLeft className="h-4 w-4" />
        All categories
      </Link>

      <div className="mb-12 max-w-2xl">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Category
        </p>
        <h1 className="font-heading mb-4 text-4xl md:text-5xl">{category.name}</h1>
        <p className="text-lg text-muted-foreground">
          Finds I&apos;ve curated in {category.name.toLowerCase()}.
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
        <div className="rounded-[2rem] border border-dashed border-border/80 bg-secondary/30 px-6 py-16 text-center">
          <p className="text-muted-foreground">
            No finds in this category yet. Check back soon.
          </p>
        </div>
      )}
    </div>
  );
}
