import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <Analytics />
      <SpeedInsights />
      <body
        className="font-body-md bg-canvas text-primary selection:bg-primary selection:text-canvas flex min-h-full flex-col"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
