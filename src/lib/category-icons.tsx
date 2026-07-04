import {
  Sparkles,
  UtensilsCrossed,
  Laptop,
  Home,
  Leaf,
  Gem,
  Palette,
  Heart,
  ShoppingBag,
  Shirt,
  Baby,
  BookOpen,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  beauty: Sparkles,
  kitchen: UtensilsCrossed,
  electronics: Laptop,
  tech: Laptop,
  home: Home,
  "home-essentials": Home,
  lifestyle: Leaf,
  jewellery: Gem,
  jewelry: Gem,
  "resin-art": Palette,
  handmade: Heart,
  fashion: Shirt,
  clothing: Shirt,
  shopping: ShoppingBag,
  kids: Baby,
  books: BookOpen,
};

export function getCategoryIcon(slug: string): LucideIcon {
  return iconMap[slug.toLowerCase()] ?? ShoppingBag;
}
