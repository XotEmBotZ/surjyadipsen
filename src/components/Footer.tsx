import { getReader } from "@/lib/reader";
import Link from "next/link";

export default async function Footer() {
  const reader = await getReader();
  const settings = await reader.singletons.settings.read().catch(() => null);
  const details = await reader.singletons.details.read().catch(() => null);

  return (
    <footer className="bg-canvas border-primary relative z-10 mt-auto flex w-full flex-col items-center justify-between gap-8 rounded-none border-t-2 px-6 py-12 pb-32 md:flex-row md:gap-4 md:py-8 md:pb-8">
      <Link
        href="/"
        className="text-primary text-xl font-black tracking-tighter uppercase"
      >
        {settings?.siteName || "FIELD NOTES"}
      </Link>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
        {settings?.socialLinks?.map((link, i) => (
          <a
            key={i}
            className="font-inter text-primary hover:bg-primary hover:text-canvas px-2 py-1 text-xs font-bold tracking-widest uppercase no-underline transition-none"
            href={link.url || undefined}
          >
            {link.platform.toUpperCase()}
          </a>
        ))}
      </div>
      <div className="flex flex-col items-center gap-1 md:items-end">
        <span className="font-inter text-secondary text-center text-[10px] font-bold tracking-[0.2em] uppercase md:text-right">
          {settings?.copyright ||
            `© ${settings?.siteName?.toUpperCase() || "FIELD NOTES"} TECHNICAL LEDGER. ALL RIGHTS RESERVED.`}
        </span>
      </div>
    </footer>
  );
}
