import { Link } from "@tanstack/react-router";
import { Search, Bell, Heart, ShoppingCart, User, MapPin, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logoUrl from "@/assets/hilaal-logo.svg";

export function Logo() {
  return (
    <Link to="/" className="flex items-center">
      <img src={logoUrl} alt="HilaalMarket" className="h-16 md:h-20 w-auto" />
    </Link>
  );
}

export function Header() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex items-center gap-4 px-4 py-4">
        <Logo />
        <button className="hidden lg:flex items-center gap-2 rounded-md border px-3 py-2 text-sm text-muted-foreground hover:border-brand">
          <MapPin className="h-4 w-4 text-brand" />
          <div className="text-left">
            <div className="text-[10px] uppercase">Deliver to</div>
            <div className="font-semibold text-foreground">Mogadishu, Somalia Street</div>
          </div>
          <ChevronDown className="h-4 w-4" />
        </button>
        <div className="relative flex-1 max-w-2xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search for fruits, vegetables, groceries..." className="pl-10 pr-24 h-11" />
          <Button className="absolute right-1 top-1/2 -translate-y-1/2 h-9 bg-brand hover:bg-brand/90">Search</Button>
        </div>
        <div className="flex items-center gap-1">
          <IconBtn icon={<Bell className="h-5 w-5" />} count={2} />
          <Link to="/favorites"><IconBtn icon={<Heart className="h-5 w-5" />} count={4} /></Link>
          <Link to="/cart"><IconBtn icon={<ShoppingCart className="h-5 w-5" />} count={3} /></Link>
          <Link to="/account"><IconBtn icon={<User className="h-5 w-5" />} /></Link>
        </div>
      </div>
      <Nav />
    </header>
  );
}

function IconBtn({ icon, count }: { icon: React.ReactNode; count?: number }) {
  return (
    <button className="relative rounded-full p-2.5 hover:bg-muted">
      {icon}
      {count ? (
        <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white">{count}</span>
      ) : null}
    </button>
  );
}

function Nav() {
  const links = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/shop", label: "Latest Offers" },
    { to: "/shop", label: "Best Sellers" },
    { to: "/shop", label: "New Products" },
    { to: "/", label: "Contact Us" },
  ];
  return (
    <div className="border-t bg-background">
      <div className="container mx-auto flex items-center gap-2 px-4">
        <button className="flex items-center gap-2 bg-brand px-4 py-3 text-sm font-semibold text-brand-foreground -mb-px">
          All Categories <ChevronDown className="h-4 w-4" />
        </button>
        <nav className="flex flex-1 items-center gap-6 px-4 text-sm font-medium">
          {links.map((l, i) => (
            <Link key={i} to={l.to} className="py-3 text-foreground hover:text-brand" activeProps={{ className: "text-brand" }}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
