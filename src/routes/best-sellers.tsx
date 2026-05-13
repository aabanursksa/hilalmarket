import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/layout/Shell";
import { ProductCard } from "@/components/ProductCard";
import { PageHeader } from "@/components/PageHeader";
import { products } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ChevronDown, Grid3x3, List, Star } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/best-sellers")({
  head: () => ({
    meta: [
      { title: "Best Sellers — HilaalMarket" },
      { name: "description", content: "Shop our most popular grocery products loved by customers." },
    ],
  }),
  component: BestSellers,
});

function BestSellers() {
  const [price, setPrice] = useState([0, 50]);
  const best = [...products].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
  return (
    <Shell>
      <PageHeader title="Best Sellers" />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-secondary to-secondary/70 p-6 text-white md:p-10">
          <div className="max-w-md">
            <p className="text-xs font-bold opacity-90">TOP RATED</p>
            <h2 className="mt-2 text-3xl font-extrabold">Customer favorites you'll love</h2>
            <Button className="mt-4 bg-white text-secondary hover:bg-white/90">View All</Button>
          </div>
        </div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-card p-3">
          <div className="flex items-center gap-2">
            <button className="rounded p-2 bg-brand text-white"><Grid3x3 className="h-4 w-4" /></button>
            <button className="rounded p-2 hover:bg-muted"><List className="h-4 w-4" /></button>
            <span className="ml-2 text-sm text-muted-foreground">Showing {best.length} results</span>
          </div>
          <button className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm">
            Sort By: Best Rating <ChevronDown className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {best.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </div>
    </Shell>
  );
}
