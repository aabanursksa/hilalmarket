import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/layout/Shell";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/stores/cart-context";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Shopping Cart — HilaalMarket" }] }),
  component: Cart,
});

function Cart() {
  const { items, updateQty, removeItem, subtotal } = useCart();
  const delivery = 2.5;
  const discount = 5;
  const total = subtotal + delivery - discount;

  if (items.length === 0) {
    return (
      <Shell>
        <PageHeader title="Shopping Cart" />
        <div className="flex flex-col items-center py-20 text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
          <h2 className="mt-4 text-xl font-extrabold text-foreground">Your cart is empty</h2>
          <p className="mt-2 text-sm text-muted-foreground">Looks like you haven't added anything yet.</p>
          <Link to="/shop">
            <Button className="mt-6 bg-brand hover:bg-brand/90">Continue Shopping</Button>
          </Link>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <PageHeader title="Shopping Cart" />
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-10 lg:grid-cols-[1fr_360px]">
        <div className="overflow-x-auto rounded-lg border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Price</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Subtotal</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id} className="border-t">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={it.image} className="h-16 w-16 rounded-md object-cover" alt="" />
                      <div>
                        <div className="font-semibold">{it.name}</div>
                        <div className="text-xs text-muted-foreground">{it.unit}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-medium">${it.price.toFixed(2)}</td>
                  <td className="p-4">
                    <div className="inline-flex items-center rounded-full border">
                      <button onClick={() => updateQty(it.id, -1)} className="px-2 py-1.5 hover:text-brand"><Minus className="h-3.5 w-3.5" /></button>
                      <span className="px-3 text-sm font-semibold">{it.qty}</span>
                      <button onClick={() => updateQty(it.id, 1)} className="px-2 py-1.5 hover:text-brand"><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-brand">${(it.price * it.qty).toFixed(2)}</td>
                  <td className="p-4">
                    <button onClick={() => removeItem(it.id)} className="rounded-full p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><X className="h-4 w-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-wrap items-center gap-3 border-t bg-muted/30 p-4">
            <Input placeholder="Coupon code" className="max-w-xs" />
            <Button variant="outline" className="border-brand text-brand hover:bg-brand hover:text-white">Apply Coupon</Button>
            <Link to="/shop" className="ml-auto text-sm text-brand hover:underline">Continue Shopping</Link>
          </div>
        </div>
        <aside className="rounded-lg border bg-card p-6 h-fit">
          <h3 className="text-lg font-extrabold text-foreground">Cart Total</h3>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sub-Total</span><span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery Fee</span><span className="font-semibold">${delivery.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Discount</span><span className="font-semibold text-success">-${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t pt-3">
              <span className="font-bold text-base">Total Cost</span>
              <span className="text-lg font-extrabold text-brand">${total.toFixed(2)}</span>
            </div>
          </div>
          <Link to="/checkout"><Button className="mt-5 w-full bg-brand hover:bg-brand/90 h-12">Proceed to Checkout</Button></Link>
          <p className="mt-3 text-xs text-center text-muted-foreground">Free delivery on orders over $50</p>
        </aside>
      </div>
    </Shell>
  );
}
