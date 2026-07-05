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
  Scissors,
  Droplets,
  Bath,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "beauty-skincare": Sparkles,
  "beauty": Sparkles,
  "hair-care": Scissors,
  "hair": Scissors,
  "bath-body": Bath,
  "bath": Bath,
  "home-cleaning-essentials": Home,
  "home-cleaning": Home,
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
