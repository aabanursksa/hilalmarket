import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/layout/Shell";
import { PageHeader } from "@/components/PageHeader";
import { products } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Check, Package, Truck, Home, Phone, MessageCircle, Star, Download, X } from "lucide-react";

export const Route = createFileRoute("/track")({
  head: () => ({ meta: [{ title: "Track Order — HilaalMarket" }] }),
  component: Track,
});

function Track() {
  const steps = [
    { icon: Check, label: "Confirmed", time: "10:15 AM", done: true },
    { icon: Package, label: "Picking Items", time: "10:30 AM", done: true },
    { icon: Truck, label: "Out for delivery", time: "11:00 AM", done: true, current: true },
    { icon: Home, label: "Delivered", time: "Est. 11:45 AM", done: false },
  ];
  const items = products.slice(0, 3);
  const sub = items.reduce((s, p) => s + p.price, 0);
  return (
    <Shell>
      <PageHeader title="Track Order #HM-10244" crumb="Track Order" />
      <div className="container mx-auto grid grid-cols-1 gap-6 px-4 py-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-2xl border bg-card">
            <iframe
              title="Delivery map"
              className="h-80 w-full"
              src="https://www.openstreetmap.org/export/embed.html?bbox=45.30%2C2.02%2C45.38%2C2.06&layer=mapnik&marker=2.0469%2C45.3182"
            />
          </div>
          <div className="rounded-2xl border bg-card p-6">
            <h3 className="text-lg font-extrabold text-brand-navy">Order Status</h3>
            <ol className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {steps.map((s, i) => (
                <li key={i} className="relative">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full ${s.done ? "bg-brand text-white" : "bg-muted text-muted-foreground"} ${s.current ? "ring-4 ring-brand/20" : ""}`}>
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div className="mt-2 font-semibold text-sm">{s.label}</div>
                  <div className="text-xs text-muted-foreground">{s.time}</div>
                  {i < steps.length - 1 && (
                    <div className={`absolute left-12 top-6 hidden h-0.5 w-[calc(100%-3rem)] md:block ${s.done ? "bg-brand" : "bg-muted"}`} />
                  )}
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-2xl border bg-card p-6">
            <h3 className="text-lg font-extrabold text-brand-navy">Products</h3>
            <div className="mt-4 space-y-3">
              {items.map((p) => (
                <div key={p.id} className="flex items-center gap-4">
                  <img src={p.image} className="h-14 w-14 rounded-md object-cover" alt="" />
                  <div className="flex-1">
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.unit}</div>
                  </div>
                  <div className="font-bold text-brand">${p.price.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <aside className="space-y-6">
          <div className="rounded-2xl border bg-card p-6">
            <h3 className="font-extrabold text-brand-navy">Delivery Details</h3>
            <div className="mt-4 flex items-center gap-3">
              <img src="https://i.pravatar.cc/80?img=33" alt="" className="h-14 w-14 rounded-full ring-2 ring-brand" />
              <div className="flex-1">
                <div className="font-semibold">Mohamed Ali</div>
                <div className="flex items-center gap-1 text-xs text-warning">
                  <Star className="h-3 w-3 fill-current" /> 4.9 · Driver
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button variant="outline" className="border-brand text-brand hover:bg-brand hover:text-white">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </Button>
              <Button className="bg-brand-navy hover:bg-brand-navy/90">
                <Phone className="h-4 w-4" /> Call
              </Button>
            </div>
          </div>
          <div className="rounded-2xl border bg-card p-6">
            <h3 className="font-extrabold text-brand-navy">Order Total</h3>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Sub-Total</span><span>${sub.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>$2.50</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Discount</span><span className="text-success">-$3.00</span></div>
              <div className="flex justify-between border-t pt-2 text-base font-extrabold">
                <span>Total</span><span className="text-brand">${(sub + 2.5 - 3).toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Link to="/cancel-order"><Button variant="outline" className="w-full border-destructive text-destructive hover:bg-destructive hover:text-white">
              <X className="h-4 w-4" /> Cancel Order
            </Button></Link>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4" /> Download Invoice
            </Button>
          </div>
        </aside>
      </div>
    </Shell>
  );
}
