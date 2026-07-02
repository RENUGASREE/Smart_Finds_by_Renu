import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-[4/5] overflow-hidden bg-muted"
      >
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
            No image
          </div>
        )}

        <div className="absolute left-4 top-4 flex flex-col gap-2">
          {product.category?.name && (
            <Badge className="border-none bg-white/90 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-foreground shadow-sm backdrop-blur-sm">
              {product.category.name}
            </Badge>
          )}
          {product.badge && (
            <Badge className="border-none bg-[var(--accent)]/90 px-2.5 py-0.5 text-[10px] font-medium text-white shadow-sm backdrop-blur-sm">
              {product.badge}
            </Badge>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <Link href={`/product/${product.slug}`} className="block">
          <h3 className="font-heading mb-2 text-xl leading-snug transition-colors group-hover:text-[var(--accent)]">
            {product.title}
          </h3>
        </Link>

        <p className="mb-6 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {product.short_description}
        </p>

        <Link
          href={`/product/${product.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-[var(--accent)]"
        >
          View Find
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
