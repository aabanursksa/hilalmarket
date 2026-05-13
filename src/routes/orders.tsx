import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/layout/Shell";
import { PageHeader } from "@/components/PageHeader";
import { AccountSidebar } from "@/components/AccountSidebar";
import { orders } from "@/lib/data";
import { Eye, X } from "lucide-react";

export const Route = createFileRoute("/orders")({
  head: () => ({ meta: [{ title: "My Orders — HilaalMarket" }] }),
  component: Orders,
});

const statusStyles: Record<string, string> = {
  Delivered: "bg-success/15 text-success",
  "Out for delivery": "bg-info/15 text-info",
  Processing: "bg-warning/15 text-warning",
  Cancelled: "bg-destructive/15 text-destructive",
};

function Orders() {
  return (
    <Shell>
      <PageHeader title="My Orders" />
      <div className="container mx-auto flex flex-col gap-6 px-4 py-10 md:flex-row">
        <AccountSidebar />
        <div className="flex-1 rounded-lg border bg-card">
          <div className="border-b p-5">
            <h2 className="text-lg font-extrabold text-brand-navy">Order History</h2>
            <p className="text-sm text-muted-foreground">Track and manage all your orders</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Order Type</th>
                  <th className="p-4">Cancel</th>
                  <th className="p-4">Details</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-t">
                    <td className="p-4 font-semibold text-brand">{o.id}</td>
                    <td className="p-4">{o.date}</td>
                    <td className="p-4 font-semibold">${o.total.toFixed(2)}</td>
                    <td className="p-4">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[o.status]}`}>{o.status}</span>
                    </td>
                    <td className="p-4 text-muted-foreground">{o.type}</td>
                    <td className="p-4">
                      <button disabled={o.status === "Delivered" || o.status === "Cancelled"} className="rounded-md p-2 text-destructive hover:bg-destructive/10 disabled:opacity-30">
                        <X className="h-4 w-4" />
                      </button>
                    </td>
                    <td className="p-4">
                      <Link to="/track" className="inline-flex items-center gap-1 text-brand hover:underline">
                        <Eye className="h-4 w-4" /> View
                      </Link>
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
