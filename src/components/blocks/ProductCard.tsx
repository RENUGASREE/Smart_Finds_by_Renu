import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Share2, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden rounded-2xl border bg-card transition-all hover:shadow-xl hover:-translate-y-1 duration-300">
      <Link href={`/product/${product.slug}`} className="block relative aspect-square overflow-hidden bg-muted">
        {/* Placeholder for actual image */}
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-secondary/50 group-hover:scale-105 transition-transform duration-500">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          ) : (
            <span className="text-sm">Image: {product.title}</span>
          )}
        </div>
        
        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.badge && (
            <Badge className="bg-primary/90 hover:bg-primary text-primary-foreground backdrop-blur-sm border-none shadow-sm">
              {product.badge}
            </Badge>
          )}
          {product.handmade && (
            <Badge variant="secondary" className="bg-background/90 hover:bg-background text-foreground backdrop-blur-sm shadow-sm">
              Handmade
            </Badge>
          )}
        </div>

        {/* Platform Badge */}
        <div className="absolute bottom-3 right-3">
          <Badge variant="outline" className="bg-background/90 hover:bg-background backdrop-blur-sm shadow-sm border-none text-xs font-semibold">
            {product.platform}
          </Badge>
        </div>
      </Link>

      <CardContent className="p-5">
        <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>{product.category?.name || "Category"}</span>
          {product.price && <span className="font-medium text-foreground">${product.price.toFixed(2)}</span>}
        </div>
        
        <Link href={`/product/${product.slug}`} className="block group-hover:text-primary transition-colors">
          <h3 className="font-bold text-lg leading-tight mb-2 line-clamp-1">{product.title}</h3>
        </Link>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.short_description}
        </p>
      </CardContent>

      <CardFooter className="p-5 pt-0 flex gap-2">
        <Link href={product.affiliate_link} target="_blank" rel="noopener noreferrer" className={`${buttonVariants({ variant: "default", size: "lg" })} flex-1 rounded-xl shadow-sm`}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Buy Now
        </Link>
        <Button variant="secondary" size="icon" className="rounded-xl shrink-0" title="Share">
          <Share2 className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Share</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
