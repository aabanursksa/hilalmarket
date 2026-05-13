import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/layout/Shell";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { CreditCard, ChevronRight, MapPin, Truck, ShoppingBag } from "lucide-react";
import { useCart } from "@/stores/cart-context";

export const DELIVERY_FEE = 2.5;
export const DISCOUNT = 5;

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — HilaalMarket" }] }),
  component: Checkout,
});

function Checkout() {
  const { items, subtotal } = useCart();
  const total = subtotal + DELIVERY_FEE - DISCOUNT;

  if (items.length === 0) {
    return (
      <Shell>
        <PageHeader title="Checkout" />
        <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground" />
          <h2 className="text-xl font-extrabold text-foreground">Your cart is empty</h2>
          <p className="text-muted-foreground">Add some products before checkout</p>
          <Link to="/shop"><Button className="bg-brand hover:bg-brand/90">Browse Products</Button></Link>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <PageHeader title="Checkout" />
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-10 lg:grid-cols-[1fr_420px]">
        <div className="space-y-6">
          <div className="rounded-2xl border bg-card p-6">
            <h3 className="flex items-center gap-2 text-lg font-extrabold text-foreground">
              <MapPin className="h-5 w-5 text-brand" /> Delivery Address
            </h3>
            <div className="mt-4 rounded-lg border border-brand/30 bg-brand/5 p-4">
              <div className="font-semibold">Ahmed Hassan</div>
              <div className="text-sm text-muted-foreground">Mogadishu, Somalia Street, Building 12</div>
              <div className="text-sm text-muted-foreground">+252 61 8601212</div>
            </div>
            <Button variant="outline" className="mt-3 border-brand text-brand hover:bg-brand hover:text-white">
              Change Address
            </Button>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <h3 className="flex items-center gap-2 text-lg font-extrabold text-foreground">
              <Truck className="h-5 w-5 text-brand" /> Delivery Method
            </h3>
            <div className="mt-4 space-y-3">
              {[
                { label: "Standard Delivery", time: "1-2 hours", price: "$2.50" },
                { label: "Express Delivery", time: "30-45 mins", price: "$5.00" },
                { label: "Scheduled Delivery", time: "Choose time slot", price: "Free" },
              ].map((d) => (
                <label key={d.label} className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 has-checked:border-brand has-checked:bg-brand/5">
                  <input type="radio" name="delivery" defaultChecked={d.label === "Standard Delivery"} className="accent-brand" />
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{d.label}</div>
                    <div className="text-xs text-muted-foreground">{d.time}</div>
                  </div>
                  <div className="font-bold text-brand">{d.price}</div>
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <h3 className="flex items-center gap-2 text-lg font-extrabold text-foreground">
              <CreditCard className="h-5 w-5 text-brand" /> Payment Method
            </h3>
            <div className="mt-4 space-y-3">
              {[
                { label: "Cash on Delivery", desc: "Pay when you receive" },
                { label: "EVC Plus", desc: "Somali mobile money" },
                { label: "Credit Card", desc: "Visa / Mastercard" },
                { label: "PayPal", desc: "International payment" },
              ].map((p) => (
                <label key={p.label} className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 has-checked:border-brand has-checked:bg-brand/5">
                  <input type="radio" name="payment" defaultChecked={p.label === "EVC Plus"} className="accent-brand" />
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{p.label}</div>
                    <div className="text-xs text-muted-foreground">{p.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <aside className="h-fit space-y-6">
          <div className="rounded-2xl border bg-card p-6">
            <h3 className="text-lg font-extrabold text-foreground">Order Summary</h3>
            <div className="mt-4 space-y-3">
              {items.map((it) => (
                <div key={it.id} className="flex items-center gap-3">
                  <img src={it.image} className="h-12 w-12 rounded-md object-cover" alt="" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate">{it.name}</div>
                    <div className="text-xs text-muted-foreground">Qty: {it.qty}</div>
                  </div>
                  <div className="font-bold text-brand text-sm">${(it.price * it.qty).toFixed(2)}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2 border-t pt-4 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Sub-Total</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>${DELIVERY_FEE.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Discount</span><span className="text-success">-${DISCOUNT.toFixed(2)}</span></div>
              <div className="flex justify-between border-t pt-2 text-base font-extrabold">
                <span>Total</span><span className="text-brand">${total.toFixed(2)}</span>
              </div>
            </div>
            <Link to="/payment">
              <Button className="mt-5 w-full bg-brand hover:bg-brand/90 h-12 text-base">
                Continue to Payment <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="rounded-2xl border bg-card p-4 text-center text-xs text-muted-foreground">
            <p>Free delivery on orders over $50. Secure checkout guaranteed.</p>
          </div>
        </aside>
      </div>
    </Shell>
  );
}
