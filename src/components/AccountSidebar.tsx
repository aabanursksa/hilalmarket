import { Link, useRouterState } from "@tanstack/react-router";
import { User, Package, MapPin, CreditCard, Ticket, Settings, HelpCircle, Shield, Info, FileText, LogOut } from "lucide-react";

const items = [
  { to: "/account", label: "My account", icon: User },
  { to: "/orders", label: "My Orders", icon: Package },
  { to: "/account", label: "Manage Address", icon: MapPin },
  { to: "/account", label: "Payment Methods", icon: CreditCard },
  { to: "/account", label: "My Coupons", icon: Ticket },
  { to: "/account", label: "Settings", icon: Settings },
  { to: "/account", label: "FAQ", icon: HelpCircle },
  { to: "/account", label: "Privacy Policy", icon: Shield },
  { to: "/account", label: "About Us", icon: Info },
  { to: "/account", label: "Terms and Conditions", icon: FileText },
];

export function AccountSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="w-full md:w-64 shrink-0">
      <div className="rounded-lg border bg-card overflow-hidden">
        <div className="bg-brand p-4 text-white">
          <div className="flex items-center gap-3">
            <img src="https://i.pravatar.cc/80?img=12" className="h-12 w-12 rounded-full ring-2 ring-white" alt="" />
            <div>
              <div className="font-semibold">Ahmed Hassan</div>
              <div className="text-xs opacity-80">ahmed@hilaal.com</div>
            </div>
          </div>
        </div>
        <nav className="p-2">
          {items.map((it, i) => {
            const active = pathname === it.to && (it.to !== "/account" || i === 0);
            return (
              <Link key={i} to={it.to} className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition ${active ? "bg-brand/10 text-brand font-semibold" : "hover:bg-muted"}`}>
                <it.icon className="h-4 w-4" /> {it.label}
              </Link>
            );
          })}
          <button className="mt-2 flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-destructive hover:bg-destructive/10">
            <LogOut className="h-4 w-4" /> Log-out
          </button>
        </nav>
      </div>
    </aside>
  );
}
