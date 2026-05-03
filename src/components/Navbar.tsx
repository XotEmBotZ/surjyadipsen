import { getReader } from "@/lib/reader";
import Link from "next/link";
import { MobileMenu } from "./mobile-menu";

export default async function NavBar() {
  const reader = await getReader();
  const settings = await reader.singletons.settings.read().catch(() => null);
  const details = await reader.singletons.details.read().catch(() => null);

  return (
    <header className="bg-canvas border-primary sticky top-0 z-50 mx-auto flex w-full items-center justify-between rounded-none border-b-2 px-6 py-3 transition-none duration-0 md:py-4">
      <div className="flex items-center gap-8">
        <Link
          href="/"
          className="text-primary text-[13px] font-black tracking-tighter whitespace-nowrap uppercase sm:text-base md:text-2xl"
        >
          {settings?.siteName || "FIELD NOTES"}
        </Link>
        <nav className="hidden gap-2 md:flex">
          <Link
            href="/projects"
            className="font-inter text-primary hover:bg-primary hover:text-canvas border-none px-3 py-1 text-sm font-bold tracking-tighter uppercase transition-none"
          >
            PORTFOLIO
          </Link>
          <Link
            href="/posts"
            className="font-inter text-primary hover:bg-primary hover:text-canvas border-none px-3 py-1 text-sm font-bold tracking-tighter uppercase transition-none"
          >
            JOURNAL
          </Link>
          <Link
            href="/testimonials"
            className="font-inter text-primary hover:bg-primary hover:text-canvas border-none px-3 py-1 text-sm font-bold tracking-tighter uppercase transition-none"
          >
            ENDORSEMENTS
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <a
          href={`mailto:${details?.email}`}
          className="border-primary bg-primary text-canvas font-inter hover:bg-canvas hover:text-primary hidden rounded-none border-2 px-4 py-2 text-sm font-bold tracking-tighter uppercase transition-none md:block"
        >
          CONTACT
        </a>
        <MobileMenu details={details} />
      </div>
    </header>
  );
}
