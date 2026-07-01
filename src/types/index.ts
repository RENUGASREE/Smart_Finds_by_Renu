export interface Category {
  id: string;
  name: string;
  slug: string;
  image_url?: string;
  display_order: number;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  image_url: string;
  affiliate_link: string;
  platform: "Amazon" | "Flipkart" | "Other";
  category_id: string;
  category?: Category; // Joined category
  price?: number;
  badge?: string;
  featured: boolean;
  handmade: boolean;
  why_i_recommend?: string;
  display_order: number;
}
