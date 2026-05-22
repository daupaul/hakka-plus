import { Header } from "@/components/front/layout/header";
import { Footer } from "@/components/front/layout/footer";

export default function FrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-bg-base">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
