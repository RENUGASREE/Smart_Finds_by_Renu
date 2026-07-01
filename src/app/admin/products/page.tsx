import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, CheckCircle2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteProduct } from "../actions";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

export default async function ProductsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase.from("products").select("*, category:categories(name)").order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link href="/admin/products/new" className={buttonVariants({ variant: "default" })}>
          <Plus className="w-4 h-4 mr-2" /> Add Product
        </Link>
      </div>

      <div className="rounded-xl border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">
                  {product.title}
                  {product.featured && <Badge variant="default" className="ml-2 text-[10px]">Today's Pick</Badge>}
                </TableCell>
                <TableCell>{product.category?.name}</TableCell>
                <TableCell>{product.platform}</TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {product.badge && <Badge variant="outline">{product.badge}</Badge>}
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
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
