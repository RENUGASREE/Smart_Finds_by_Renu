import Link from "next/link";
import { getCategoryIcon } from "@/lib/category-icons";
import { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const Icon = getCategoryIcon(category.slug);

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group flex flex-col items-center rounded-3xl border border-border/60 bg-card px-6 py-8 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/30 hover:shadow-card"
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-foreground transition-colors group-hover:bg-[var(--accent)]/10 group-hover:text-[var(--accent)]">
        <Icon className="h-6 w-6" strokeWidth={1.5} />
      </div>
      <h3 className="font-heading text-lg">{category.name}</h3>
    </Link>
  );
}
