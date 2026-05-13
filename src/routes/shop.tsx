import { createFileRoute, useSearch } from "@tanstack/react-router";
import { Shell } from "@/components/layout/Shell";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/lib/data";
import { PageHeader } from "@/components/PageHeader";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Grid3x3, List, ChevronDown, Search as SearchIcon } from "lucide-react";
import { useState, useMemo } from "react";

type ShopSearch = { q?: string };

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    q: typeof search.q === "string" ? search.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop — HilaalMarket" },
      { name: "description", content: "Browse fresh groceries, fruits, vegetables, and household essentials." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const { q } = useSearch({ from: "/shop" });
  const [price, setPrice] = useState([0, 50]);
  const [category, setCategory] = useState<string | null>(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];
    if (q) {
      const lower = q.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(lower) || p.category.toLowerCase().includes(lower));
    }
    if (category) result = result.filter((p) => p.category === category);
    if (inStockOnly) result = result.filter((p) => p.inStock !== false);
    if (onSaleOnly) result = result.filter((p) => p.oldPrice !== undefined);
    result = result.filter((p) => p.price >= price[0] && p.price <= price[1]);
    return result;
  }, [q, category, inStockOnly, onSaleOnly, price]);

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

        {q && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border bg-brand/5 p-3 text-sm">
            <SearchIcon className="h-4 w-4 text-brand" />
            <span>Results for: <strong className="text-brand">"{q}"</strong></span>
            <span className="text-muted-foreground">({filtered.length} products found)</span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="space-y-6">
            <FilterBox title="Categories">
              <ul className="space-y-2 text-sm">
                <li
                  onClick={() => setCategory(null)}
                  className={`cursor-pointer px-2 py-1 rounded ${!category ? "bg-brand/10 text-brand font-semibold" : "hover:text-brand"}`}
                >
                  All Categories
                </li>
                {categories.slice(0, 8).map((c) => (
                  <li
                    key={c.slug}
                    onClick={() => setCategory(category === c.name ? null : c.name)}
                    className={`cursor-pointer flex items-center justify-between px-2 py-1 rounded ${category === c.name ? "bg-brand/10 text-brand font-semibold" : "hover:text-brand"}`}
                  >
                    <span>{c.name}</span><span className="text-muted-foreground">({c.count})</span>
                  </li>
                ))}
              </ul>
            </FilterBox>
            <FilterBox title="Price Range">
              <Slider value={price} onValueChange={setPrice} max={50} step={1} />
              <div className="mt-3 flex justify-between text-sm">
                <span>${price[0]}</span><span>${price[1]}</span>
              </div>
            </FilterBox>
            <FilterBox title="Product Status">
              <label className="flex items-center gap-2 text-sm py-1 cursor-pointer">
                <Checkbox checked={inStockOnly} onCheckedChange={(v) => setInStockOnly(!!v)} /> In Stock
              </label>
              <label className="flex items-center gap-2 text-sm py-1 cursor-pointer">
                <Checkbox checked={onSaleOnly} onCheckedChange={(v) => setOnSaleOnly(!!v)} /> On Sale
              </label>
            </FilterBox>
          </aside>
          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-card p-3">
              <div className="flex items-center gap-2">
                <button className="rounded p-2 bg-brand text-white"><Grid3x3 className="h-4 w-4" /></button>
                <button className="rounded p-2 hover:bg-muted"><List className="h-4 w-4" /></button>
                <span className="ml-2 text-sm text-muted-foreground">Showing {filtered.length} of {products.length} results</span>
              </div>
            </div>
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center py-16 text-center">
                <SearchIcon className="h-12 w-12 text-muted-foreground/40" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">No products found</h3>
                <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search or filter criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {filtered.map((p) => <ProductCard key={p.id} p={p} />)}
              </div>
            )}
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
