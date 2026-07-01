import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addCategory } from "../../actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewCategoryPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/categories" className={buttonVariants({ variant: "outline", size: "icon" })}>
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-3xl font-bold">Add Category</h1>
      </div>

      <form action={addCategory} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required placeholder="e.g. Beauty" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" name="slug" required placeholder="e.g. beauty" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image_file">Upload Image</Label>
          <Input id="image_file" name="image_file" type="file" accept="image/*" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="image_url">Or Image URL</Label>
          <Input id="image_url" name="image_url" placeholder="https://..." />
        </div>

        <div className="space-y-2">
          <Label htmlFor="display_order">Display Order</Label>
          <Input id="display_order" name="display_order" type="number" defaultValue="0" />
        </div>

        <div className="pt-4 flex gap-4">
          <Button type="submit">Save Category</Button>
          <Link href="/admin/categories" className={buttonVariants({ variant: "outline" })}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
