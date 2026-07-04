import { Category, Product, Platform } from "@/types";

export const mockCategories: Category[] = [
  { id: "1", name: "Beauty", slug: "beauty", display_order: 1, image_url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80" },
  { id: "2", name: "Home Essentials", slug: "home-essentials", display_order: 2, image_url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80" },
  { id: "3", name: "Tech", slug: "tech", display_order: 3, image_url: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80" },
  { id: "4", name: "Handmade", slug: "handmade", display_order: 4, image_url: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80" },
];

const mockPlatforms: Platform[] = [
  { id: "p1", name: "Amazon", display_order: 1 },
  { id: "p2", name: "Flipkart", display_order: 2 },
  { id: "p3", name: "Other", display_order: 99 },
];

export const mockProducts: Product[] = [
  {
    id: "1",
    title: "Premium Ceramic Coffee Dripper",
    slug: "premium-ceramic-coffee-dripper",
    short_description: "Elevate your morning routine with this handcrafted ceramic pour-over coffee dripper.",
    image_url: "https://images.unsplash.com/photo-1544426577-628d0979a0b1?w=800&q=80",
    affiliate_link: "#",
    platform_id: "p1",
    platform: mockPlatforms[0],
    category_id: "2",
    category: mockCategories[1],
    badge: "Editor's Pick",
    featured: true,
    handmade: false,
    display_order: 1,
  },
  {
    id: "2",
    title: "Minimalist Resin Coasters (Set of 4)",
    slug: "minimalist-resin-coasters",
    short_description: "Hand-poured resin coasters with subtle gold leaf accents.",
    image_url: "https://images.unsplash.com/photo-1617391741544-77e8a3ffb104?w=800&q=80",
    affiliate_link: "#",
    platform_id: "p3",
    platform: mockPlatforms[2],
    category_id: "4",
    category: mockCategories[3],
    featured: false,
    handmade: true,
    display_order: 2,
  },
  {
    id: "3",
    title: "Hydrating Vitamin C Serum",
    slug: "hydrating-vitamin-c-serum",
    short_description: "A lightweight, brightening serum that leaves your skin glowing all day.",
    image_url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
    affiliate_link: "#",
    platform_id: "p1",
    platform: mockPlatforms[0],
    category_id: "1",
    category: mockCategories[0],
    badge: "Trending",
    featured: false,
    handmade: false,
    display_order: 3,
  },
  {
    id: "4",
    title: "Ergonomic Desk Chair",
    slug: "ergonomic-desk-chair",
    short_description: "The ultimate work-from-home companion for perfect posture.",
    image_url: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&q=80",
    affiliate_link: "#",
    platform_id: "p2",
    platform: mockPlatforms[1],
    category_id: "3",
    category: mockCategories[2],
    featured: false,
    handmade: false,
    display_order: 4,
  }
];
