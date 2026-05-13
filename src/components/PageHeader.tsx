import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export function PageHeader({ title, crumb }: { title: string; crumb?: string }) {
  return (
    <div className="relative overflow-hidden bg-brand-navy text-white">
      <img src="https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=1600&q=60" alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
      <div className="relative container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-extrabold">{title}</h1>
        <div className="mt-2 flex items-center gap-2 text-sm text-white/80">
          <Link to="/" className="hover:text-brand">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span>{crumb ?? title}</span>
        </div>
      </div>
    </div>
  );
}
