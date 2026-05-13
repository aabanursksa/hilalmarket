import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import logoUrl from "@/assets/hilaal-logo.svg";

export function Footer() {
  const cols = [
    { title: "My Account", links: ["My Account", "Order History", "Shopping Cart", "Wishlist", "Settings"] },
    { title: "Helps", links: ["Contact Us", "FAQs", "Terms & Conditions", "Privacy Policy", "Returns"] },
    { title: "Explore", links: ["Fresh Vegetables", "Beverages", "Meats & Seafood", "Bakery", "Snacks"] },
  ];
  return (
    <footer className="mt-16 bg-[#222835] text-white/75">
      <div className="container mx-auto grid grid-cols-1 gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="rounded-xl bg-white/95 p-3 inline-block">
            <img src={logoUrl} alt="HilaalMarket" className="h-16 w-auto" />
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            Your trusted grocery partner in Mogadishu. Fresh products delivered to your doorstep daily — Tayo iyo Raqiis.
          </p>
          <div className="mt-5 flex gap-3">
            {[Facebook, Twitter, Youtube, Instagram].map((Ic, i) => (
              <a key={i} href="#" aria-label="social" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-brand">
                <Ic className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="mb-4 text-base font-bold text-white">{c.title}</h4>
            <ul className="space-y-2.5 text-sm">
              {c.links.map((l) => (
                <li key={l}><a href="#" className="transition hover:text-brand">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h4 className="mb-4 text-base font-bold text-white">Download our Mobile App</h4>
          <div className="space-y-3">
            <a href="#" className="flex items-center gap-3 rounded-lg border border-white/20 px-3 py-2.5 transition hover:border-brand hover:bg-white/5">
              <span className="text-2xl">🍎</span>
              <div>
                <div className="text-[10px] uppercase opacity-70">Download on the</div>
                <div className="text-sm font-bold text-white">App Store</div>
              </div>
            </a>
            <a href="#" className="flex items-center gap-3 rounded-lg border border-white/20 px-3 py-2.5 transition hover:border-brand hover:bg-white/5">
              <span className="text-2xl">▶️</span>
              <div>
                <div className="text-[10px] uppercase opacity-70">Get it on</div>
                <div className="text-sm font-bold text-white">Google Play</div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 px-4 py-5 text-xs">
          <p>© 2026 HilaalMarket. All rights reserved.</p>
          <div className="flex gap-3 text-white/60">
            <span>Visa</span><span>Mastercard</span><span>PayPal</span><span>EVC Plus</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
