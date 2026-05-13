import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/layout/Shell";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/order-success")({
  head: () => ({ meta: [{ title: "Order Successful — HilaalMarket" }] }),
  component: OrderSuccess,
});

function OrderSuccess() {
  return (
    <Shell>
      <PageHeader title="Order Successful" crumb="Confirmation" />
      <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/15">
          <CheckCircle className="h-10 w-10 text-success" />
        </div>
        <h1 className="mt-6 text-3xl font-extrabold text-foreground">Order Placed Successfully!</h1>
        <p className="mt-3 max-w-md text-muted-foreground">
          Thank you for your order! Your order <span className="font-bold text-brand">#HM-10246</span> has been confirmed and is being processed.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border bg-card p-5 text-center">
            <Package className="mx-auto h-8 w-8 text-brand" />
            <div className="mt-2 font-semibold">Order Number</div>
            <div className="text-sm text-muted-foreground">#HM-10246</div>
          </div>
          <div className="rounded-xl border bg-card p-5 text-center">
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-brand/10 text-brand text-sm font-bold">30</div>
            <div className="mt-2 font-semibold">Est. Delivery</div>
            <div className="text-sm text-muted-foreground">~30 minutes</div>
          </div>
          <div className="rounded-xl border bg-card p-5 text-center">
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-brand/10 text-brand text-sm font-bold">$</div>
            <div className="mt-2 font-semibold">Total Paid</div>
            <div className="text-sm text-muted-foreground">$24.96</div>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/track">
            <Button className="bg-brand hover:bg-brand/90 h-12 px-8">
              Track Order <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/shop">
            <Button variant="outline" className="h-12 px-8">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </Shell>
  );
}
