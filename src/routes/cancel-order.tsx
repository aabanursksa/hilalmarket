import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/layout/Shell";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { XCircle, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/cancel-order")({
  head: () => ({ meta: [{ title: "Cancel Order — HilaalMarket" }] }),
  component: CancelOrder,
});

function CancelOrder() {
  return (
    <Shell>
      <PageHeader title="Cancel Order" />
      <div className="container mx-auto flex flex-col items-center px-4 py-14 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/15">
          <XCircle className="h-10 w-10 text-destructive" />
        </div>
        <h1 className="mt-6 text-3xl font-extrabold text-foreground">Cancel Order #HM-10244</h1>
        <p className="mt-3 max-w-md text-muted-foreground">
          Are you sure you want to cancel this order? This action cannot be undone.
        </p>
        <div className="mt-6 w-full max-w-sm rounded-xl border bg-card p-5 text-left">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Order</span><span className="font-semibold">#HM-10244</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Items</span><span className="font-semibold">3 items</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Total</span><span className="font-bold text-destructive">$23.99</span></div>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button className="bg-destructive hover:bg-destructive/90 h-12 px-8">Confirm Cancel</Button>
          <Link to="/track">
            <Button variant="outline" className="h-12 px-8"><ArrowLeft className="mr-1 h-4 w-4" /> Keep Order</Button>
          </Link>
        </div>
      </div>
    </Shell>
  );
}
