import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/layout/Shell";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ArrowRight, CreditCard, Package, ShieldCheck, Truck } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HilaalMarket — Fresh Groceries Delivered in Mogadishu" },
      { name: "description", content: "Shop fresh fruits, vegetables, meats, and groceries online. Tayo iyo Raqiis — quality and best price, delivered to your door." },
      { property: "og:title", content: "HilaalMarket — Tayo iyo Raqiis" },
      { property: "og:description", content: "Fresh groceries delivered in Mogadishu, daily 7:00–23:00." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <Shell>
      <Hero />
      <CategoriesGrid />
      <Section title="Popular Products" link="/shop">
        <Grid cols={6}>{products.slice(0, 6).map((p) => <ProductCard key={p.id} p={p} />)}</Grid>
      </Section>
      <PromoBanners />
      <Section title="Featured Products" link="/shop">
        <Grid cols={5}>{products.slice(0, 5).map((p) => <ProductCard key={p.id} p={p} />)}</Grid>
      </Section>
      <HotAndNew />
      <Features />
    </Shell>
  );
}

function Hero() {
  return (
    <section className="bg-[#EEF7E5]">
      <div className="container mx-auto grid grid-cols-1 gap-10 px-4 py-12 md:grid-cols-2 md:items-center">
        <div>
          <span className="inline-block rounded-full bg-secondary px-4 py-1.5 text-xs font-bold text-white">WEEKEND DISCOUNT</span>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight text-brand-navy">
            Shopping with us for <span className="text-brand">better quality</span> and the best price
          </h1>
          <p className="mt-4 text-muted-foreground max-w-md">
            We have prepared special discounts for you on grocery products. Don't miss these opportunities...
          </p>
          <div className="mt-6 flex items-center gap-5">
            <Button asChild size="lg" className="bg-brand hover:bg-brand/90 text-white h-12 px-6">
              <Link to="/shop">Shop Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <div className="flex items-baseline gap-2">
              <span className="text-base text-muted-foreground line-through">$26.67</span>
              <span className="text-3xl font-extrabold text-secondary">$21.67</span>
            </div>
          </div>
          <p className="mt-2 text-xs text-muted-foreground/60">Don't miss this limited time offer.</p>
        </div>
        <div className="relative">
          <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=70" alt="Fresh groceries" className="relative rounded-3xl shadow-xl" />
          <div className="absolute -bottom-4 -left-4 rounded-2xl bg-white p-3 shadow-lg">
            <div className="text-xs text-muted-foreground">Sale up to</div>
            <div className="text-2xl font-extrabold text-secondary">35% OFF</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoriesGrid() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-2xl font-extrabold text-brand-navy">Shop by Category</h2>
        <Link to="/shop" className="text-sm font-semibold text-brand hover:underline">View All →</Link>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {categories.map((c) => (
          <Link key={c.slug} to="/shop" className="group flex flex-col items-center rounded-xl border border-border bg-white p-4 text-center transition hover:border-brand hover:shadow-md">
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-muted">
              <img src={c.image} alt={c.name} className="h-full w-full object-cover transition group-hover:scale-105" />
            </div>
            <h3 className="mt-3 text-sm font-semibold text-brand-navy">{c.name}</h3>
            <p className="text-xs text-muted-foreground">{c.count} items</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Section({ title, link, children }: { title: string; link?: string; children: React.ReactNode }) {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-2xl font-extrabold text-brand-navy">{title}</h2>
        {link && <Link to={link} className="text-sm font-semibold text-brand hover:underline">View All →</Link>}
      </div>
      {children}
    </section>
  );
}

function Grid({ cols, children }: { cols: number; children: React.ReactNode }) {
  const c: Record<number, string> = {
    5: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
    6: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
  };
  return <div className={`grid gap-4 ${c[cols]}`}>{children}</div>;
}

function PromoBanners() {
  const banners = [
    { tag: "BREAKFAST", title: "Start your day fresh", price: "$5.99", img: "photo-1533089860892-a7c6f0a88666", bg: "from-secondary/20 to-secondary/5" },
    { tag: "ORGANIC", title: "Pure & natural picks", price: "$12.49", img: "photo-1542838132-92c53300491e", bg: "from-brand/20 to-brand/5" },
    { tag: "BAKERY", title: "Freshly baked daily", price: "$3.99", img: "photo-1509440159596-0249088772ff", bg: "from-info/20 to-info/5" },
  ];
  return (
    <section className="container mx-auto grid grid-cols-1 gap-4 px-4 py-8 md:grid-cols-3">
      {banners.map((b, i) => (
        <div key={i} className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${b.bg} p-6`}>
          <span className="text-xs font-bold text-secondary">{b.tag}</span>
          <h3 className="mt-2 text-xl font-extrabold text-brand-navy max-w-[60%]">{b.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">From <span className="font-bold text-brand">{b.price}</span></p>
          <Button size="sm" className="mt-3 bg-brand-navy hover:bg-brand-navy/90">Shop Now</Button>
          <img src={`https://images.unsplash.com/${b.img}?auto=format&fit=crop&w=400&q=60`} alt="" className="absolute -right-4 -bottom-4 h-32 w-32 rounded-full object-cover" />
        </div>
      ))}
    </section>
  );
}

function HotAndNew() {
  return (
    <section className="container mx-auto grid grid-cols-1 gap-8 px-4 py-8 md:grid-cols-2">
      {[
        { title: "Hot Deals", items: products.slice(0, 4) },
        { title: "New Products", items: products.slice(4, 8) },
      ].map((s) => (
        <div key={s.title}>
          <h2 className="mb-4 text-xl font-extrabold text-brand-navy">{s.title}</h2>
          <div className="space-y-3">
            {s.items.map((p) => (
              <div key={p.id} className="flex items-center gap-4 rounded-lg border bg-card p-3">
                <img src={p.image} alt={p.name} className="h-20 w-20 rounded-md object-cover" />
                <div className="flex-1">
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-xs text-muted-foreground">{p.unit}</p>
                  <div className="mt-1">
                    <span className="font-bold text-brand">${p.price.toFixed(2)}</span>
                    {p.oldPrice && <span className="ml-2 text-xs line-through text-muted-foreground">${p.oldPrice.toFixed(2)}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

function Features() {
  const feats = [
    { icon: CreditCard, t: "Payment only online", d: "Secure payment methods" },
    { icon: Package, t: "New stocks and sales", d: "Fresh products daily" },
    { icon: ShieldCheck, t: "Quality assurance", d: "100% quality guaranteed" },
    { icon: Truck, t: "Delivery from 1 hour", d: "Fast home delivery" },
  ];
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-4 rounded-2xl border bg-card p-6 sm:grid-cols-2 lg:grid-cols-4">
        {feats.map((f, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
              <f.icon className="h-6 w-6" />
            </div>
            <div>
              <div className="font-bold">{f.t}</div>
              <div className="text-xs text-muted-foreground">{f.d}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
