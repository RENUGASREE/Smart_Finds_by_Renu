import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Categories - Smart Finds by Renu",
  description: "Browse all curated product categories and handmade items.",
};

export default async function CategoriesPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase.from("categories").select("*").order("display_order", { ascending: true });

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Categories</h1>
        <p className="text-xl text-muted-foreground">
          Explore my curated collections of lifestyle, home, tech, and beauty products.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {(categories || []).map((category) => (
          <Link key={category.id} href={`/categories/${category.slug}`} className="group relative aspect-square overflow-hidden rounded-2xl bg-muted transition-transform hover:-translate-y-1 duration-300">
            {category.image_url && (
              <Image
                src={category.image_url}
                alt={category.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-white font-bold text-2xl leading-tight">{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
