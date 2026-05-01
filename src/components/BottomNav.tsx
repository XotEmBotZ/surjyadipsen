"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FolderOpen, BookText, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "HOME", icon: Home },
    { href: "/projects", label: "PORTFOLIO", icon: FolderOpen },
    { href: "/posts", label: "JOURNAL", icon: BookText },
    { href: "/testimonials", label: "ENDORSE", icon: User },
  ];

  return (
    <nav className="bg-canvas border-primary fixed right-0 bottom-0 left-0 z-50 grid h-16 grid-cols-4 border-t-2 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] md:hidden">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/" && pathname.startsWith(item.href));
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 transition-none",
              isActive
                ? "bg-primary text-canvas"
                : "text-primary hover:bg-primary hover:text-canvas"
            )}
          >
            <Icon size={20} strokeWidth={isActive ? 3 : 2} />
            <span className="text-[9px] font-black tracking-tighter uppercase">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
