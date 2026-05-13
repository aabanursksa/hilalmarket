import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/layout/Shell";
import { ProductCard } from "@/components/ProductCard";
import { PageHeader } from "@/components/PageHeader";
import { products } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ChevronDown, Grid3x3, List } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/latest-offers")({
  head: () => ({
    meta: [
      { title: "Latest Offers — HilaalMarket" },
      { name: "description", content: "Check out the latest offers and deals on fresh groceries." },
    ],
  }),
  component: LatestOffers,
});

function LatestOffers() {
  const [price, setPrice] = useState([0, 50]);
  const discounted = products.filter((p) => p.oldPrice);
  return (
    <Shell>
      <PageHeader title="Latest Offers" />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-brand to-brand/70 p-6 text-white md:p-10">
          <div className="max-w-md">
            <p className="text-xs font-bold opacity-90">LIMITED TIME</p>
            <h2 className="mt-2 text-3xl font-extrabold">Up to 40% off on selected items</h2>
            <Button className="mt-4 bg-white text-brand hover:bg-white/90">Shop Sale</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="space-y-6">
            <FilterBox title="Categories">
              <ul className="space-y-2 text-sm">
                {["Fruits", "Vegetables", "Meat", "Dairy", "Bakery", "Beverages"].map((c) => (
                  <li key={c} className="flex items-center justify-between hover:text-brand cursor-pointer">
                    <span>{c}</span><span className="text-muted-foreground">({Math.floor(Math.random() * 20) + 5})</span>
                  </li>
                ))}
              </ul>
            </FilterBox>
            <FilterBox title="Discount Range">
              <div className="space-y-2 text-sm">
                {["10% or more", "20% or more", "30% or more", "40% or more", "50% or more"].map((d) => (
                  <label key={d} className="flex items-center gap-2 py-1 cursor-pointer">
                    <input type="radio" name="discount" className="accent-brand" /> {d}
                  </label>
                ))}
              </div>
            </FilterBox>
          </aside>
          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-card p-3">
              <div className="flex items-center gap-2">
                <button className="rounded p-2 bg-brand text-white"><Grid3x3 className="h-4 w-4" /></button>
                <button className="rounded p-2 hover:bg-muted"><List className="h-4 w-4" /></button>
                <span className="ml-2 text-sm text-muted-foreground">Showing {discounted.length} results</span>
              </div>
              <button className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm">
                Sort By: Discount <ChevronDown className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {discounted.map((p) => <ProductCard key={p.id} p={p} />)}
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

function FilterBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <h3 className="mb-3 font-bold text-foreground">{title}</h3>
      {children}
    </div>
  );
}
