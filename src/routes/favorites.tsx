import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/layout/Shell";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart, X, Trash2, Heart } from "lucide-react";
import { useState } from "react";
import { useFavorites } from "@/stores/favorites-context";
import { useCart } from "@/stores/cart-context";

export const Route = createFileRoute("/favorites")({
  head: () => ({ meta: [{ title: "My Favorites — HilaalMarket" }] }),
  component: Favorites,
});

function Favorites() {
  const { items, removeItem, clearAll } = useFavorites();
  const { addItem } = useCart();
  const [qtys, setQtys] = useState<Record<string, number>>({});

  const getQty = (id: string) => qtys[id] ?? 1;
  const setQty = (id: string, v: number) => setQtys((prev) => ({ ...prev, [id]: Math.max(1, v) }));

  if (items.length === 0) {
    return (
      <Shell>
        <PageHeader title="My Favorites" />
        <div className="flex flex-col items-center py-20 text-center">
          <Heart className="h-16 w-16 text-muted-foreground/30" />
          <h2 className="mt-4 text-xl font-extrabold text-foreground">No saved items</h2>
          <p className="mt-2 text-sm text-muted-foreground">Start adding products to your favorites.</p>
          <a href="/shop"><Button className="mt-6 bg-brand hover:bg-brand/90">Browse Products</Button></a>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <PageHeader title="My Favorites" />
      <div className="container mx-auto px-4 py-10">
        <div className="rounded-lg border bg-card">
          <div className="flex items-center justify-between border-b p-5">
            <h2 className="text-lg font-extrabold text-foreground">{items.length} Saved Items</h2>
            <Button variant="outline" onClick={clearAll} className="border-destructive text-destructive hover:bg-destructive hover:text-white">
              <Trash2 className="h-4 w-4" /> Clear Favorites
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Quantity</th>
                  <th className="p-4">Action</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((it) => (
                  <tr key={it.id} className="border-t">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={it.image} className="h-14 w-14 rounded-md object-cover" alt="" />
                        <div>
                          <div className="font-semibold">{it.name}</div>
                          <div className="text-xs text-muted-foreground">{it.unit}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-bold text-brand">${it.price.toFixed(2)}</td>
                    <td className="p-4"><span className="rounded-full bg-success/15 px-2.5 py-1 text-xs font-semibold text-success">In Stock</span></td>
                    <td className="p-4">
                      <div className="inline-flex items-center rounded-full border">
                        <button onClick={() => setQty(it.id, getQty(it.id) - 1)} className="px-2 py-1.5"><Minus className="h-3.5 w-3.5" /></button>
                        <span className="px-3 font-semibold">{getQty(it.id)}</span>
                        <button onClick={() => setQty(it.id, getQty(it.id) + 1)} className="px-2 py-1.5"><Plus className="h-3.5 w-3.5" /></button>
                      </div>
                    </td>
                    <td className="p-4">
                      <Button size="sm" className="bg-brand hover:bg-brand/90" onClick={() => addItem(it)}>
                        <ShoppingCart className="h-3.5 w-3.5" /> Add to Cart
                      </Button>
                    </td>
                    <td className="p-4">
                      <button onClick={() => removeItem(it.id)} className="rounded-full p-2 hover:bg-destructive/10 hover:text-destructive"><X className="h-4 w-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Shell>
  );
}
