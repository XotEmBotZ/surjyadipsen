import * as React from "react";
import Markdoc, { type RenderableTreeNode } from "@markdoc/markdoc";
import { cn } from "@/lib/utils";
import { reactComponents } from "./custom-components";

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}

const components = {
  ...reactComponents,
  p: ({ children, className }: ComponentProps) => (
    <p
      className={cn(
        "font-body-md text-body-md mb-6 text-justify leading-relaxed",
        className
      )}
    >
      {children}
    </p>
  ),
  h1: ({ children, className }: ComponentProps) => (
    <h1
      className={cn(
        "font-headline-xl text-headline-xl border-border-technical mb-8 border-l-4 pl-4 uppercase",
        className
      )}
    >
      {children}
    </h1>
  ),
  h2: ({ children, className }: ComponentProps) => (
    <h2
      className={cn(
        "font-headline-lg text-headline-lg border-border-technical mt-12 mb-6 border-l-4 pl-4 uppercase",
        className
      )}
    >
      {children}
    </h2>
  ),
  h3: ({ children, className }: ComponentProps) => (
    <h3
      className={cn(
        "font-technical-sm text-technical-sm mt-8 mb-4 font-bold uppercase",
        className
      )}
    >
      {children}
    </h3>
  ),
  ul: ({ children, className }: ComponentProps) => (
    <ul className={cn("mb-6 list-none space-y-2", className)}>{children}</ul>
  ),
  li: ({ children, className }: ComponentProps) => (
    <li
      className={cn(
        "font-body-md text-body-md flex items-start gap-3",
        className
      )}
    >
      <span className="text-secondary font-mono-data mt-1.5 text-xs">—</span>
      <span>{children}</span>
    </li>
  ),
  blockquote: ({ children, className }: ComponentProps) => (
    <blockquote
      className={cn(
        "border-border-technical bg-surface-card font-headline-lg mb-8 border-l-4 py-4 pl-6 text-lg leading-tight italic",
        className
      )}
    >
      {children}
    </blockquote>
  ),
  hr: ({ className }: ComponentProps) => (
    <hr className={cn("border-border-technical my-12 border-t-2", className)} />
  ),
  code: ({ children, className }: ComponentProps) => (
    <code
      className={cn(
        "bg-surface-muted font-mono-data px-1.5 py-0.5 text-xs",
        className
      )}
    >
      {children}
    </code>
  ),
  pre: ({ children, className }: ComponentProps) => (
    <pre
      className={cn(
        "bg-surface-card border-border-technical font-mono-data mb-8 overflow-x-auto border-2 p-6 text-xs",
        className
      )}
    >
      {children}
    </pre>
  ),
};

export function MarkdocRenderer({ content }: { content: RenderableTreeNode }) {
  return (
    <div className="markdoc-content">
      {Markdoc.renderers.react(content, React, { components })}
    </div>
  );
}
