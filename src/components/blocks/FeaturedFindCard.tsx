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
        "group overflow-hidden rounded-[2rem] border border-border/50 bg-card",
        "shadow-[0_4px_24px_-8px_rgb(0_0_0_0.08)] transition-all duration-500",
        "hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(184,149,106,0.2)]",
        className
      )}
    >
      <div className="grid md:grid-cols-2">
        <Link
          href={`/product/${product.slug}`}
          className="relative block aspect-[4/3] overflow-hidden bg-[var(--cream)] md:aspect-square lg:aspect-[4/5]"
        >
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
              className="object-contain object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              No image
            </div>
          )}
        </Link>

        <div className="flex flex-col justify-center p-8 md:p-11 lg:p-14">
          {product.category?.name && (
            <Badge className="mb-5 w-fit rounded-full border-none bg-[var(--cream)] px-3.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {product.category.name}
            </Badge>
          )}

          <Link href={`/product/${product.slug}`}>
            <h3 className="font-heading mb-5 text-3xl leading-tight tracking-tight transition-colors duration-300 group-hover:text-[var(--accent)] md:text-4xl">
              {product.title}
            </h3>
          </Link>

          <p className="mb-6 text-base leading-[1.75] text-muted-foreground md:text-lg">
            {product.short_description}
          </p>

          <Link
            href={product.affiliate_link}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              size: "lg",
              className:
                "h-12 w-fit rounded-full px-9 text-sm font-medium shadow-[0_4px_20px_-4px_rgba(184,149,106,0.45)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_28px_-4px_rgba(184,149,106,0.5)]",
            })}
          >
            {(() => {
              const cta = getPlatformCta(product.platform || product.platform_name || 'Other');
              console.log('FeaturedFindCard CTA:', { platform: product.platform, platform_name: product.platform_name, cta });
              return cta;
            })()}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
