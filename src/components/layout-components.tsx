import * as React from "react";
import { cn } from "@/lib/utils";

function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-[1440px] flex-grow flex-col gap-12 px-6 py-12",
        className
      )}
      {...props}
    />
  );
}

function PageHeader({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <header className={cn("border-primary border-b-4 pb-6", className)}>
      <h1 className="font-headline-xl text-headline-xl text-primary uppercase">
        {title} {subtitle && <span className="opacity-50">| {subtitle}</span>}
      </h1>
    </header>
  );
}

function Section({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("flex w-full flex-col gap-6", className)}
      {...props}
    />
  );
}

export { Container, PageHeader, Section };
