import type { Metadata } from "next";
import "../globals.css";
import { getReader } from "@/lib/reader";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";

export async function generateMetadata(): Promise<Metadata> {
  const reader = await getReader();
  const settings = await reader.singletons.settings.read();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const title = settings?.siteName || "Portfolio";
  const description = settings?.description || "My professional portfolio";
  const ogImage = settings?.ogImage ? { url: settings.ogImage } : undefined;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    openGraph: {
      title: {
        default: title,
        template: `%s | ${title}`,
      },
      description,
      url: "/",
      siteName: title,
      locale: "en_US",
      type: "website",
      images: ogImage ? [ogImage] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: {
        default: title,
        template: `%s | ${title}`,
      },
      description,
      images: ogImage ? [ogImage] : [],
    },
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
    </>
  );
}
