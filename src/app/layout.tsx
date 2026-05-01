export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body
        className="font-body-md bg-canvas text-primary selection:bg-primary selection:text-canvas flex min-h-full flex-col"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
