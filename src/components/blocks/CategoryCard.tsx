import Link from "next/link";
import { getCategoryIcon } from "@/lib/category-icons";
import { Category } from "@/types";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const Icon = getCategoryIcon(category.slug);

  return (
    <Link
      href={`/categories/${category.slug}`}
      className={cn(
        "group flex flex-col items-center rounded-[1.75rem] border border-border/50 bg-card px-5 py-9 text-center sm:px-6 sm:py-10",
        "shadow-[0_2px_16px_-4px_rgb(0_0_0_0.05)] transition-all duration-300",
        "hover:-translate-y-1.5 hover:border-[var(--accent)]/25",
        "hover:shadow-[0_8px_28px_-8px_rgba(184,149,106,0.18)]"
      )}
    >
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--cream)] text-foreground transition-all duration-300 group-hover:scale-105 group-hover:bg-[var(--accent)]/10 group-hover:text-[var(--accent)]">
        <Icon className="h-7 w-7" strokeWidth={1.5} />
      </div>
      <h3 className="font-heading text-base leading-snug sm:text-lg">
        {category.name}
      </h3>
    </Link>
  );
}
