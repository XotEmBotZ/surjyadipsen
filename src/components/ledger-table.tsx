import * as React from "react";
import { cn } from "@/lib/utils";

function LedgerTable({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-primary bg-canvas w-full overflow-x-auto border-2",
        className
      )}
    >
      <table className="w-full border-collapse text-left">{children}</table>
    </div>
  );
}

function LedgerTableHead({ children }: { children: React.ReactNode }) {
  return (
    <thead>
      <tr className="bg-surface-muted border-primary border-b-2">{children}</tr>
    </thead>
  );
}

function LedgerTableBody({ children }: { children: React.ReactNode }) {
  return <tbody className="divide-primary divide-y-2">{children}</tbody>;
}

function LedgerTableRow({
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
        "hover:bg-surface-card group cursor-pointer transition-none",
        className
      )}
    >
      {children}
    </tr>
  );
}

export { LedgerTable, LedgerTableHead, LedgerTableBody, LedgerTableRow };
