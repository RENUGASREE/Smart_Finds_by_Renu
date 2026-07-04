import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteProduct, addPlatform, deletePlatform } from "../actions";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function ProductsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*, category:categories(name)")
    .order("created_at", { ascending: false });

  const { data: platforms } = await supabase
    .from("platforms")
    .select("*")
    .order("display_order", { ascending: true });

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Finds</h1>
          <p className="text-sm text-muted-foreground">
            Manage your curated recommendations.
          </p>
        </div>
        <Link href="/admin/products/new" className={buttonVariants({ variant: "default" })}>
          <Plus className="mr-2 h-4 w-4" /> Add Find
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Labels</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">
                  {product.title}
                  {product.featured && (
                    <Badge variant="default" className="ml-2 text-[10px]">
                      Featured
                    </Badge>
                  )}
                </TableCell>
                <TableCell>{product.category?.name}</TableCell>
                <TableCell>{product.platform}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {product.handmade && <Badge variant="secondary">Handmade</Badge>}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DeleteButton id={product.id} deleteAction={deleteProduct} />
                </TableCell>
              </TableRow>
            ))}
            {(!products || products.length === 0) && (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                  No finds yet. Add your first recommendation.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Platforms Management */}
      <div className="mt-12">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Platforms</h2>
            <p className="text-sm text-muted-foreground">
              Manage available platforms for your finds.
            </p>
          </div>
        </div>

        <div className="mb-6 rounded-xl border bg-card p-6">
          <form action={addPlatform} className="flex gap-4 items-end">
            <div className="flex-1 space-y-2">
              <Label htmlFor="platform_name">Platform Name</Label>
              <Input
                id="platform_name"
                name="name"
                required
                placeholder="e.g. Amazon"
              />
            </div>
            <div className="w-32 space-y-2">
              <Label htmlFor="platform_order">Order</Label>
              <Input
                id="platform_order"
                name="display_order"
                type="number"
                defaultValue="0"
              />
            </div>
            <Button type="submit">Add Platform</Button>
          </form>
        </div>

        <div className="overflow-hidden rounded-xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Order</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {platforms?.map((platform) => (
                <TableRow key={platform.id}>
                  <TableCell className="font-medium">{platform.name}</TableCell>
                  <TableCell>{platform.display_order}</TableCell>
                  <TableCell className="text-right">
                    <DeleteButton id={platform.id} deleteAction={deletePlatform} />
                  </TableCell>
                </TableRow>
              ))}
              {(!platforms || platforms.length === 0) && (
                <TableRow>
                  <TableCell colSpan={3} className="py-8 text-center text-muted-foreground">
                    No platforms yet. Add your first platform.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
