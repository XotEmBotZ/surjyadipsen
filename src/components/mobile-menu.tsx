"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

interface MobileMenuProps {
  details: {
    email?: string | null;
  } | null;
}

export function MobileMenu({ details }: MobileMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  // Close menu when clicking a link
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border-primary bg-canvas text-primary flex items-center justify-center border-2 p-2 transition-none"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isOpen && (
        <div className="bg-canvas border-primary animate-in slide-in-from-top fixed inset-0 top-18.25 z-50 flex flex-col border-t-2 p-6 duration-200">
          <nav className="font-inter flex flex-col gap-4 text-lg font-bold tracking-tighter uppercase">
            <Link
              href="/projects"
              onClick={closeMenu}
              className="border-primary hover:bg-primary hover:text-canvas border-2 px-4 py-3 transition-none"
            >
              PROJECT
            </Link>
            <Link
              href="/posts"
              onClick={closeMenu}
              className="border-primary hover:bg-primary hover:text-canvas border-2 px-4 py-3 transition-none"
            >
              JOURNAL
            </Link>
            <Link
              href="/testimonials"
              onClick={closeMenu}
              className="border-primary hover:bg-primary hover:text-canvas border-2 px-4 py-3 transition-none"
            >
              ENDORSEMENTS
            </Link>
          </nav>

          <div className="mt-auto pb-12">
            <a
              href={`mailto:${details?.email}`}
              onClick={closeMenu}
              className="border-primary bg-primary text-canvas font-inter hover:bg-canvas hover:text-primary block w-full border-2 py-4 text-center text-xl font-bold tracking-tighter uppercase transition-none"
            >
              CONTACT
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
