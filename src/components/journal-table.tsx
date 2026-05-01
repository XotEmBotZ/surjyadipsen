import * as React from "react";
import { cn } from "@/lib/utils";

function JournalTable({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-border bg-card overflow-hidden border-2",
        className
      )}
    >
      <table className="w-full text-left font-mono text-xs md:text-sm">
        {children}
      </table>
    </div>
  );
}

function JournalTableHead({ children }: { children: React.ReactNode }) {
  return (
    <thead className="border-border bg-secondary/30 border-b">
      <tr className="text-muted-foreground tracking-widest uppercase">
        {children}
      </tr>
    </thead>
  );
}

function JournalTableBody({ children }: { children: React.ReactNode }) {
  return <tbody className="divide-border divide-y">{children}</tbody>;
}

function JournalTableRow({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <tr
      onClick={onClick}
      className={cn(
        "group hover:bg-secondary/20 cursor-pointer transition-colors",
        className
      )}
    >
      {children}
    </tr>
  );
}

export { JournalTable, JournalTableHead, JournalTableBody, JournalTableRow };
