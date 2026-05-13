import { Apple, Smartphone, MessageCircle } from "lucide-react";

export function TopBar() {
  return (
    <div className="bg-brand text-brand-foreground text-xs">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-2 px-4 py-2">
        <p className="font-medium">We deliver 7:00 to 23:00</p>
        <div className="flex flex-wrap items-center gap-4">
          <a href="https://wa.me/252618601212" className="flex items-center gap-1.5 hover:opacity-80">
            <MessageCircle className="h-3.5 w-3.5" /> +252 61 8601212
          </a>
          <a className="flex items-center gap-1.5 hover:opacity-80" href="#">
            <Apple className="h-3.5 w-3.5" /> App Store
          </a>
          <a className="flex items-center gap-1.5 hover:opacity-80" href="#">
            <Smartphone className="h-3.5 w-3.5" /> Google Play
          </a>
        </div>
      </div>
    </div>
  );
}
