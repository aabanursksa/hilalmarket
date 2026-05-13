import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/layout/Shell";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/lib/data";
import { PageHeader } from "@/components/PageHeader";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Grid3x3, List, ChevronDown } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — HilaalMarket" },
      { name: "description", content: "Browse fresh groceries, fruits, vegetables, and household essentials." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const [price, setPrice] = useState([0, 50]);
  const all = [...products, ...products].map((p, i) => ({ ...p, id: p.id + i }));
  return (
    <Shell>
      <PageHeader title="Shop" />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-brand to-brand/70 p-6 text-white md:p-10">
          <div className="max-w-md">
            <p className="text-xs font-bold opacity-90">SUMMER SALE</p>
            <h2 className="mt-2 text-3xl font-extrabold">Up to 40% off on fresh produce</h2>
            <Button className="mt-4 bg-white text-brand hover:bg-white/90">Explore Deals</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="space-y-6">
            <FilterBox title="Categories">
              <ul className="space-y-2 text-sm">
                {categories.slice(0, 8).map((c) => (
                  <li key={c.slug} className="flex items-center justify-between hover:text-brand cursor-pointer">
                    <span>{c.name}</span><span className="text-muted-foreground">({c.count})</span>
                  </li>
                ))}
              </ul>
            </FilterBox>
            <FilterBox title="Price Range">
              <Slider value={price} onValueChange={setPrice} max={100} step={1} />
              <div className="mt-3 flex justify-between text-sm">
                <span>${price[0]}</span><span>${price[1]}</span>
              </div>
            </FilterBox>
            <FilterBox title="Product Status">
              {["In Stock", "On Sale", "New Arrival"].map((s) => (
                <label key={s} className="flex items-center gap-2 text-sm py-1"><Checkbox /> {s}</label>
              ))}
            </FilterBox>
            <FilterBox title="Brand">
              {["HilaalFresh", "Organic Co", "FarmDirect", "DailyChoice"].map((s) => (
                <label key={s} className="flex items-center gap-2 text-sm py-1"><Checkbox /> {s}</label>
              ))}
            </FilterBox>
            <FilterBox title="Product Type">
              {["Organic", "Non-GMO", "Gluten-Free", "Vegan"].map((s) => (
                <label key={s} className="flex items-center gap-2 text-sm py-1"><Checkbox /> {s}</label>
              ))}
            </FilterBox>
          </aside>
          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-card p-3">
              <div className="flex items-center gap-2">
                <button className="rounded p-2 bg-brand text-white"><Grid3x3 className="h-4 w-4" /></button>
                <button className="rounded p-2 hover:bg-muted"><List className="h-4 w-4" /></button>
                <span className="ml-2 text-sm text-muted-foreground">Showing 1–{all.length} of {all.length * 2} results</span>
              </div>
              <button className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm">
                Sort By: Default <ChevronDown className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {all.map((p) => <ProductCard key={p.id} p={p} />)}
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
      <h3 className="mb-3 font-bold text-brand-navy">{title}</h3>
      {children}
    </div>
  );
}
