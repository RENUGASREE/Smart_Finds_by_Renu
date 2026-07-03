"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ProductImageUpload from "@/components/admin/ProductImageUpload";
import { addCategory } from "@/app/admin/actions";

export default function AddCategoryForm() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/admin/categories" className={buttonVariants({ variant: "outline", size: "icon" })}>
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-2xl font-semibold">Add Category</h1>
      </div>

      <form action={addCategory} className="space-y-6 rounded-[1.5rem] border border-border/60 bg-secondary/20 p-6 md:p-8">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required placeholder="e.g. Beauty" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug (optional)</Label>
          <Input id="slug" name="slug" placeholder="Auto-generated from name if left blank" />
        </div>

        <ProductImageUpload label="Category Image" required={false} />

        <div className="space-y-2">
          <Label htmlFor="display_order">Display Order</Label>
          <Input id="display_order" name="display_order" type="number" defaultValue="0" />
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit">Save Category</Button>
          <Link href="/admin/categories" className={buttonVariants({ variant: "outline" })}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
