import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { getPlatformCta } from "@/lib/platform-cta";
import { Product } from "@/types";
import { cn } from "@/lib/utils";

interface FeaturedFindCardProps {
  product: Product;
  className?: string;
}

export default function FeaturedFindCard({ product, className }: FeaturedFindCardProps) {
  return (
    <article
      className={cn(
        "group overflow-hidden rounded-[2rem] border border-border/60 bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-16px_rgb(0_0_0_0.12)]",
        className
      )}
    >
      <div className="grid md:grid-cols-2">
        <Link
          href={`/product/${product.slug}`}
          className="relative block aspect-square bg-muted md:aspect-auto md:min-h-[420px]"
        >
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              No image
            </div>
          )}
        </Link>

        <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14">
          {product.category?.name && (
            <Badge className="mb-4 w-fit border-none bg-secondary px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {product.category.name}
            </Badge>
          )}

          <Link href={`/product/${product.slug}`}>
            <h3 className="font-heading mb-4 text-3xl leading-tight md:text-4xl">
              {product.title}
            </h3>
          </Link>

          <p className="mb-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            {product.short_description}
          </p>

          {product.why_i_recommend && (
            <blockquote className="mb-8 border-l-2 border-[var(--accent)] pl-4 text-sm italic leading-relaxed text-foreground/80">
              &ldquo;{product.why_i_recommend}&rdquo;
              <footer className="mt-2 not-italic text-xs font-medium text-muted-foreground">
                — Renu
              </footer>
            </blockquote>
          )}

          <Link
            href={product.affiliate_link}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              size: "lg",
              className:
                "h-12 w-fit rounded-full px-8 text-sm font-medium shadow-soft",
            })}
          >
            {getPlatformCta(product.platform)}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
