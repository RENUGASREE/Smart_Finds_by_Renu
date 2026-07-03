"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import ProductImageUpload from "@/components/admin/ProductImageUpload";
import { addProduct } from "@/app/admin/actions";
import { Category } from "@/types";
import { ArrowLeft, Plus } from "lucide-react";

const PLATFORMS = [
  "Amazon",
  "Flipkart",
  "Meesho",
  "Myntra",
  "Ajio",
  "Other",
] as const;

interface AddProductFormProps {
  categories: Category[] | null;
}

export default function AddProductForm({ categories }: AddProductFormProps) {
  const hasCategories = categories && categories.length > 0;

  return (
    <div className="mx-auto max-w-2xl pb-10">
      <div className="mb-8 flex items-center gap-4">
        <Link
          href="/admin/products"
          className={buttonVariants({ variant: "outline", size: "icon" })}
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-semibold">Add a Find</h1>
          <p className="text-sm text-muted-foreground">
            Like creating a recommendation post — simple and personal.
          </p>
        </div>
      </div>

      <form
        action={addProduct}
        className="space-y-6 rounded-[1.5rem] border border-border/60 bg-secondary/20 p-6 md:p-8"
      >
        <div className="space-y-2">
          <Label htmlFor="title">Find Name</Label>
          <Input
            id="title"
            name="title"
            required
            placeholder="e.g. My favourite vitamin C serum"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="short_description">Short Description</Label>
          <Textarea
            id="short_description"
            name="short_description"
            required
            rows={3}
            placeholder="A quick note about why this find is worth a look..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="why_i_recommend">Why I Recommend It</Label>
          <Textarea
            id="why_i_recommend"
            name="why_i_recommend"
            rows={4}
            placeholder="Share your personal recommendation in your own words..."
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="category_id">Category</Label>
            {hasCategories ? (
              <select
                id="category_id"
                name="category_id"
                required
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition-colors focus:border-[var(--accent)]/50 focus:ring-2 focus:ring-[var(--accent)]/20"
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            ) : (
              <div className="rounded-xl border border-dashed border-border/80 bg-background px-4 py-5 text-center">
                <p className="mb-3 text-sm text-muted-foreground">
                  No categories yet. Create one first to organize your finds.
                </p>
                <Link href="/admin/categories/new">
                  <Button type="button" variant="outline" size="sm">
                    <Plus className="mr-1.5 h-4 w-4" />
                    Create Category
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="platform">Platform</Label>
            <select
              id="platform"
              name="platform"
              defaultValue="Amazon"
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition-colors focus:border-[var(--accent)]/50 focus:ring-2 focus:ring-[var(--accent)]/20"
            >
              {PLATFORMS.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="affiliate_link">Affiliate Link</Label>
          <Input
            id="affiliate_link"
            name="affiliate_link"
            required
            placeholder="https://..."
          />
        </div>

        <ProductImageUpload />

        <div className="space-y-4 rounded-xl border border-border/60 bg-background p-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="featured" name="featured" value="true" />
            <Label htmlFor="featured" className="cursor-pointer font-medium">
              Featured find
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="handmade" name="handmade" value="true" />
            <Label htmlFor="handmade" className="cursor-pointer">
              Handmade find
            </Label>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={!hasCategories}>
            Publish Find
          </Button>
          <Link href="/admin/products" className={buttonVariants({ variant: "outline" })}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
