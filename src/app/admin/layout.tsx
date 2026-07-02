import Link from "next/link";
import { LayoutDashboard, Package, FolderTree, Settings, LogOut } from "lucide-react";
import { logout } from "./login/actions";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[var(--cream)]">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col md:flex-row">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border/60 bg-background md:flex">
          <div className="border-b border-border/60 p-6">
            <h2 className="font-heading text-xl">Admin</h2>
            <p className="truncate text-sm text-muted-foreground">{user.email}</p>
          </div>
          <nav className="flex-1 space-y-1 p-4">
            <Link
              href="/admin"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-secondary"
            >
              <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
              Dashboard
            </Link>
            <Link
              href="/admin/products"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-secondary"
            >
              <Package className="h-4 w-4 text-muted-foreground" />
              Finds
            </Link>
            <Link
              href="/admin/categories"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-secondary"
            >
              <FolderTree className="h-4 w-4 text-muted-foreground" />
              Categories
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-secondary"
            >
              <Settings className="h-4 w-4 text-muted-foreground" />
              Settings
            </Link>
          </nav>
          <div className="border-t border-border/60 p-4">
            <form action={logout}>
              <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-destructive transition-colors hover:bg-destructive/10">
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </form>
          </div>
        </aside>

        <main className="flex-1 p-4 md:p-8">
          <div className="mb-4 flex items-center justify-between rounded-xl border border-border/60 bg-background p-4 md:hidden">
            <h2 className="font-medium">Admin</h2>
            <form action={logout}>
              <button className="text-sm text-destructive">Sign out</button>
            </form>
          </div>

          <div className="min-h-[calc(100vh-2rem)] rounded-[1.5rem] border border-border/60 bg-background p-6 shadow-soft md:p-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
