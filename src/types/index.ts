export interface Category {
  id: string;
  name: string;
  slug: string;
  image_url?: string;
  display_order: number;
}

export interface Platform {
  id: string;
  name: string;
  display_order: number;
}

export type AffiliatePlatform = string;

export interface Product {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  image_url: string;
  affiliate_link: string;
  platform: AffiliatePlatform;
  category_id: string;
  category?: Category;
  badge?: string;
  featured: boolean;
  handmade: boolean;
  display_order: number;
}

export interface SiteConfig {
  website_name: string;
  tagline: string;
  instagram_url: string;
  pinterest_url: string;
  whatsapp_url: string;
  contact_email: string;
}
