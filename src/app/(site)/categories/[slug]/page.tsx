import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProductCard from "@/components/blocks/ProductCard";
import { createClient } from "@/lib/supabase/server";

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
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!category) {
    notFound();
  }

  const { data: products } = await supabase
    .from("products")
    .select("*, category:categories(name)")
    .eq("category_id", category.id)
    .order("display_order", { ascending: true });

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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {(products || []).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
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
