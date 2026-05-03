import * as React from "react";
import { cn } from "@/lib/utils";

function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 md:max-w-7xl md:px-12 lg:px-24",
        className
      )}
      {...props}
    />
  );
}

function Section({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "border-border border-b-2 py-12 last:border-b-0 md:py-24",
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
    <div className={cn("mb-12 space-y-4 md:mb-24", className)}>
      <h1 className="text-5xl leading-none font-black tracking-tighter uppercase sm:text-6xl md:text-7xl lg:text-8xl">
        {title}
      </h1>
      {subtitle && (
        <p className="max-w-2xl text-xl leading-tight font-bold md:text-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export { Container, Section, PageHeader };
