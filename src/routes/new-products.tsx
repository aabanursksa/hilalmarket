import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/layout/Shell";
import { ProductCard } from "@/components/ProductCard";
import { PageHeader } from "@/components/PageHeader";
import { products } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ChevronDown, Grid3x3, List } from "lucide-react";

export const Route = createFileRoute("/new-products")({
  head: () => ({
    meta: [
      { title: "New Products — HilaalMarket" },
      { name: "description", content: "Discover the newest grocery products added to HilaalMarket." },
    ],
  }),
  component: NewProducts,
});

function NewProducts() {
  const newest = [...products].reverse();
  return (
    <Shell>
      <PageHeader title="New Products" />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-info to-info/70 p-6 text-white md:p-10">
          <div className="max-w-md">
            <p className="text-xs font-bold opacity-90">JUST ARRIVED</p>
            <h2 className="mt-2 text-3xl font-extrabold">Fresh from the farm to your table</h2>
            <Button className="mt-4 bg-white text-info hover:bg-white/90">Explore New</Button>
          </div>
        </div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-card p-3">
          <div className="flex items-center gap-2">
            <button className="rounded p-2 bg-brand text-white"><Grid3x3 className="h-4 w-4" /></button>
            <button className="rounded p-2 hover:bg-muted"><List className="h-4 w-4" /></button>
            <span className="ml-2 text-sm text-muted-foreground">Showing {newest.length} results</span>
          </div>
          <button className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm">
            Sort By: Newest <ChevronDown className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {newest.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </div>
    </Shell>
  );
}
