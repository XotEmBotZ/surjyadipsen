import type { Metadata } from "next";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { getReader } from "@/lib/reader";
import NavBar from "@/components/Navbar";

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
    <html lang="en" className={`h-full antialiased`}>
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <TooltipProvider>
          <NavBar />
          {children}
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
