import { TopBar } from "./TopBar";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
