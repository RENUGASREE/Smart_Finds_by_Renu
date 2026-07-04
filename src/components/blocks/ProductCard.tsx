import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { getPlatformCta } from "@/lib/platform-cta";
import { Product } from "@/types";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border/50 bg-card",
        "shadow-[0_2px_16px_-4px_rgb(0_0_0_0.05),0_6px_20px_-8px_rgb(0_0_0_0.06)]",
        "transition-all duration-500 ease-out",
        "hover:-translate-y-1.5 hover:border-[var(--accent)]/20",
        "hover:shadow-[0_8px_32px_-8px_rgb(0_0_0_0.1),0_16px_40px_-12px_rgba(184,149,106,0.12)]"
      )}
    >
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-[4/5] overflow-hidden bg-[var(--cream)]"
      >
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-contain object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
            No image
          </div>
        )}

        <div className="absolute left-3.5 top-3.5 flex flex-col gap-1.5">
          {product.category?.name && (
            <Badge className="rounded-full border-none bg-white/95 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-foreground/80 shadow-[0_2px_8px_rgb(0_0_0_0.06)] backdrop-blur-md">
              {product.category.name}
            </Badge>
          )}
          {product.badge && (
            <Badge className="rounded-full border-none bg-[var(--accent)] px-3 py-1 text-[10px] font-medium tracking-wide text-white shadow-[0_2px_8px_rgba(184,149,106,0.35)]">
              {product.badge}
            </Badge>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4 md:p-5">
        <Link href={`/product/${product.slug}`} className="block">
          <h3 className="line-clamp-2 font-heading text-base leading-snug transition-colors duration-300 group-hover:text-[var(--accent)] md:text-lg">
            {product.title}
          </h3>
        </Link>

        <p className="line-clamp-1 flex-1 text-xs leading-relaxed text-muted-foreground md:text-sm">
          {product.short_description}
        </p>

        <div className="flex flex-col gap-3 pt-1">
          <Link
            href={product.affiliate_link}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              size: "sm",
              className:
                "h-9 w-full rounded-full text-xs font-medium shadow-[0_2px_12px_-2px_rgba(184,149,106,0.4)] transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_16px_-2px_rgba(184,149,106,0.5)]",
            })}
          >
            {(() => {
              const cta = getPlatformCta(product.platform || product.platform_name || 'Other');
              console.log('ProductCard CTA:', { platform: product.platform, platform_name: product.platform_name, cta });
              return cta;
            })()}
            <ExternalLink className="ml-1 h-3 w-3 opacity-80" />
          </Link>
        </div>
      </div>
    </article>
  );
}
