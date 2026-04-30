import { getReader } from "@/lib/reader";
import Link from "next/link";
export default async function NavBar() {
  const reader = await getReader();
  const details = await reader.singletons.details.read();
  return (
    <header className="relative z-10 flex h-16 items-center justify-between px-6 md:px-12">
      <Link href="/" className="text-lg font-bold">
        {details?.name}{" "}
        <span className="text-muted-foreground mx-1 font-normal">|</span>{" "}
        <span className="font-normal">{details?.role}</span>
      </Link>
      <nav className="hidden space-x-6 text-sm font-bold tracking-wider uppercase md:flex">
        <Link
          href="/posts"
          className="decoration-2 underline-offset-4 transition-all hover:line-through"
        >
          Journal
        </Link>
        <span className="text-border">|</span>
        <Link
          href="/#about"
          className="decoration-2 underline-offset-4 transition-all hover:line-through"
        >
          About
        </Link>
        <span className="text-border">|</span>
        <Link
          href="/#contact"
          className="decoration-2 underline-offset-4 transition-all hover:line-through"
        >
          Me
        </Link>
      </nav>
    </header>
  );
}
