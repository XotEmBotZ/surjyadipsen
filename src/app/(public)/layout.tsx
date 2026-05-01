import type { Metadata } from "next";
import "../globals.css";
import { getReader } from "@/lib/reader";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";

export async function generateMetadata(): Promise<Metadata> {
  const reader = await getReader();
  const settings = await reader.singletons.settings.read();

  return {
    title: settings?.siteName || "Portfolio",
    description: settings?.description || "My professional portfolio",
    openGraph: settings?.ogImage
      ? {
          images: [settings.ogImage],
        }
      : undefined,
    icons: settings?.favicon
      ? {
          icon: settings.favicon,
        }
      : undefined,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      <div className="grow">{children}</div>
      <Footer />
      <BottomNav />
    </>
  );
}
