import { Heart, Eye, Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/data";

export function ProductCard({ p }: { p: Product }) {
  const [qty, setQty] = useState(1);
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-white transition hover:shadow-lg">
      {p.badge && (
        <span className={`absolute left-3 top-3 z-10 rounded-md px-2 py-0.5 text-[10px] font-bold text-white ${p.badge === "Sale" ? "bg-destructive" : p.badge === "New" ? "bg-info" : "bg-secondary"}`}>
          {p.badge}
        </span>
      )}
      <div className="absolute right-3 top-3 z-10 flex flex-col gap-1.5">
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow hover:bg-brand hover:text-white"><Heart className="h-4 w-4" /></button>
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow hover:bg-brand hover:text-white"><Eye className="h-4 w-4" /></button>
      </div>
      <div className="aspect-square overflow-hidden bg-muted">
        <img src={p.image} alt={p.name} className="h-full w-full object-cover transition group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-extrabold text-secondary">${p.price.toFixed(2)}</span>
          {p.oldPrice && <span className="text-xs text-muted-foreground line-through">${p.oldPrice.toFixed(2)}</span>}
        </div>
        <p className="text-xs font-medium text-muted-foreground">{p.unit}</p>
        <h3 className="line-clamp-2 text-sm font-semibold text-brand-navy min-h-[2.5rem]">{p.name}</h3>
        <div className="mt-2 flex items-center gap-2">
          <button className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-full bg-brand text-xs font-bold text-white transition hover:bg-brand/90">
            <ShoppingCart className="h-3.5 w-3.5" /> Add to cart
          </button>
          <div className="flex items-center rounded-full border border-border">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-2 py-1.5 text-brand-navy hover:text-brand"><Minus className="h-3 w-3" /></button>
            <span className="px-1 text-xs font-bold text-brand-navy whitespace-nowrap">{qty}{p.unit.match(/kg|L|pcs/) ? p.unit.replace(/\d+/, "") : ""}</span>
            <button onClick={() => setQty(qty + 1)} className="px-2 py-1.5 text-brand-navy hover:text-brand"><Plus className="h-3 w-3" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
