import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addProduct } from "../../actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function NewProductPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase.from("categories").select("*").order("name");

  return (
    <div className="max-w-3xl mx-auto pb-20">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products" className={buttonVariants({ variant: "outline", size: "icon" })}>
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-3xl font-bold">Add Product</h1>
      </div>

      <form action={addProduct} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="slug">Slug (URL friendly)</Label>
            <Input id="slug" name="slug" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="short_description">Short Description</Label>
          <Textarea id="short_description" name="short_description" required rows={2} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Full Description</Label>
          <Textarea id="description" name="description" required rows={5} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="why_i_recommend">Why I Recommend This (Optional)</Label>
          <Textarea id="why_i_recommend" name="why_i_recommend" rows={3} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="image_file">Upload Image</Label>
            <Input id="image_file" name="image_file" type="file" accept="image/*" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url">Or Image URL</Label>
            <Input id="image_url" name="image_url" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="affiliate_link">Affiliate Link</Label>
            <Input id="affiliate_link" name="affiliate_link" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="platform">Platform</Label>
            <Select name="platform" defaultValue="Amazon">
              <SelectTrigger>
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Amazon">Amazon</SelectItem>
                <SelectItem value="Flipkart">Flipkart</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category_id">Category</Label>
            <Select name="category_id" required>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories?.map(c => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price (Optional)</Label>
            <Input id="price" name="price" type="number" step="0.01" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="badge">Badge (Optional)</Label>
            <Select name="badge">
              <SelectTrigger>
                <SelectValue placeholder="None" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">None</SelectItem>
                <SelectItem value="Trending">Trending</SelectItem>
                <SelectItem value="New Arrival">New Arrival</SelectItem>
                <SelectItem value="Editor's Pick">Editor's Pick</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="display_order">Display Order</Label>
            <Input id="display_order" name="display_order" type="number" defaultValue="0" />
          </div>
        </div>

        <div className="flex flex-col gap-4 p-4 border rounded-xl bg-muted/20">
          <div className="flex items-center space-x-2">
            <Checkbox id="featured" name="featured" value="true" />
            <Label htmlFor="featured" className="font-semibold text-primary cursor-pointer">
              Mark as Today's Featured Pick
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="handmade" name="handmade" value="true" />
            <Label htmlFor="handmade" className="cursor-pointer">Handmade Product</Label>
          </div>
        </div>

        <div className="pt-4 flex gap-4">
          <Button type="submit">Save Product</Button>
          <Link href="/admin/products" className={buttonVariants({ variant: "outline" })}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
