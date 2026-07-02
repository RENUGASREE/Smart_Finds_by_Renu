import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { addProduct } from "../../actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function NewProductPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase.from("categories").select("*").order("name");

  return (
    <div className="mx-auto max-w-2xl pb-10">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/admin/products" className={buttonVariants({ variant: "outline", size: "icon" })}>
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-semibold">Add a Find</h1>
          <p className="text-sm text-muted-foreground">
            Like creating a recommendation post — simple and personal.
          </p>
        </div>
      </div>

      <form action={addProduct} className="space-y-6 rounded-[1.5rem] border border-border/60 bg-secondary/20 p-6 md:p-8">
        <div className="space-y-2">
          <Label htmlFor="title">Find Name</Label>
          <Input id="title" name="title" required placeholder="e.g. My favourite vitamin C serum" />
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
            <select
              id="category_id"
              name="category_id"
              required
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
            >
              <option value="">Select category</option>
              {categories?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="platform">Platform</Label>
            <select
              id="platform"
              name="platform"
              defaultValue="Amazon"
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
            >
              <option value="Amazon">Amazon</option>
              <option value="Flipkart">Flipkart</option>
              <option value="Other">Other</option>
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

        <div className="space-y-2">
          <Label htmlFor="image_file">Find Image</Label>
          <Input id="image_file" name="image_file" type="file" accept="image/*" required />
          <p className="text-xs text-muted-foreground">
            Upload directly from your device. No image URLs needed.
          </p>
        </div>

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
          <Button type="submit">Publish Find</Button>
          <Link href="/admin/products" className={buttonVariants({ variant: "outline" })}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
