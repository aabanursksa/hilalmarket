import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/layout/Shell";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock, ChevronRight } from "lucide-react";
import { useCart } from "@/stores/cart-context";

const DELIVERY_FEE = 2.5;
const DISCOUNT = 5;

export const Route = createFileRoute("/payment")({
  head: () => ({ meta: [{ title: "Payment — HilaalMarket" }] }),
  component: Payment,
});

function Payment() {
  const { subtotal, clearCart } = useCart();
  const total = subtotal + DELIVERY_FEE - DISCOUNT;

  return (
    <Shell>
      <PageHeader title="Payment" crumb="Payment" />
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-10 lg:grid-cols-[1fr_420px]">
        <div className="rounded-2xl border bg-card p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
              <CreditCard className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-foreground">Payment Details</h2>
              <p className="text-sm text-muted-foreground">Enter your payment information</p>
            </div>
          </div>

          <div className="mt-8 space-y-5">
            <div>
              <Label className="mb-2 block text-sm font-semibold">Card Number</Label>
              <Input placeholder="1234 5678 9012 3456" className="h-12" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="mb-2 block text-sm font-semibold">Expiry Date</Label>
                <Input placeholder="MM/YY" className="h-12" />
              </div>
              <div>
                <Label className="mb-2 block text-sm font-semibold">CVV</Label>
                <Input placeholder="123" className="h-12" />
              </div>
            </div>
            <div>
              <Label className="mb-2 block text-sm font-semibold">Cardholder Name</Label>
              <Input placeholder="Ahmed Hassan" className="h-12" />
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 rounded-lg bg-muted p-3 text-xs text-muted-foreground">
            <Lock className="h-4 w-4 shrink-0" /> Your payment information is encrypted and secure.
          </div>

          <Link to="/order-success" onClick={() => clearCart()}>
            <Button className="mt-6 w-full bg-brand hover:bg-brand/90 h-12 text-base">
              Pay Now <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <aside className="rounded-2xl border bg-card p-6 h-fit">
          <h3 className="text-lg font-extrabold text-foreground">Order Total</h3>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Sub-Total</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>${DELIVERY_FEE.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Discount</span><span className="text-success">-${DISCOUNT.toFixed(2)}</span></div>
            <div className="flex justify-between border-t pt-2 text-base font-extrabold">
              <span>Total</span><span className="text-brand">${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Lock className="h-3 w-3" /> Secure Payment
          </div>
        </aside>
      </div>
    </Shell>
  );
}
