import * as React from "react";
import Markdoc, { type RenderableTreeNode } from "@markdoc/markdoc";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { reactComponents } from "./custom-components";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

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
        "font-headline-xl text-headline-xl border-primary mb-8 border-l-4 pl-4 uppercase",
        className
      )}
    >
      {children}
    </h1>
  ),
  h2: ({ children, className }: ComponentProps) => (
    <h2
      className={cn(
        "font-headline-lg text-headline-lg border-primary mt-12 mb-6 border-l-4 pl-4 uppercase",
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
  ol: ({ children, className }: ComponentProps) => (
    <ol className={cn("mb-6 list-decimal space-y-2 pl-6", className)}>
      {children}
    </ol>
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
        "border-primary bg-surface-card font-headline-lg mb-8 border-l-4 py-4 pl-6 text-lg leading-tight italic",
        className
      )}
    >
      {children}
    </blockquote>
  ),
  hr: ({ className }: ComponentProps) => (
    <hr className={cn("border-primary my-12 border-t-2", className)} />
  ),
  code: ({ children, className }: ComponentProps) => (
    <code
      className={cn(
        "bg-surface-muted/50 font-mono-data rounded-sm px-1.5 py-0.5 text-[0.85em] font-medium",
        className
      )}
    >
      {children}
    </code>
  ),
  Fence: ({
    children,
    language,
    className,
  }: ComponentProps & { language?: string }) => (
    <div
      className={cn(
        "group border-primary bg-surface-muted/5 relative my-8 overflow-hidden border-2",
        className
      )}
    >
      {language && (
        <div className="border-primary bg-surface-muted/20 flex items-center justify-between border-b-2 px-4 py-2">
          <span className="font-technical-sm text-[10px] font-bold tracking-widest uppercase opacity-60">
            SOURCE_CODE // {language.toUpperCase()}
          </span>
          <span className="font-mono-data text-[9px] opacity-30">
            RAW_DATA_METRIC
          </span>
        </div>
      )}
      <pre className="font-mono-data overflow-x-auto p-4 text-xs leading-relaxed md:p-6">
        <code className="bg-transparent! p-0!">{children}</code>
      </pre>
    </div>
  ),
  pre: ({ children, className }: ComponentProps) => (
    <pre
      className={cn(
        "bg-surface-muted/5 border-primary font-mono-data mb-8 overflow-x-auto border-2 p-4 text-xs md:p-6",
        className
      )}
    >
      {children}
    </pre>
  ),
  a: ({ children, href, className }: ComponentProps & { href: string }) => (
    <Link
      href={href}
      className={cn(
        "text-primary font-bold underline decoration-2 underline-offset-4 hover:opacity-70",
        className
      )}
    >
      {children}
    </Link>
  ),
  img: ({
    src,
    alt,
    title,
    className,
  }: {
    src: string;
    alt: string;
    title?: string;
    className?: string;
  }) => (
    <figure className={cn("my-8", className)}>
      <div className="border-primary bg-surface-muted relative aspect-video overflow-hidden border-2 p-2 contrast-125 grayscale">
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
      {(alt || title) && (
        <figcaption className="font-technical-sm mt-3 text-center text-[10px] tracking-tighter uppercase opacity-60">
          PLATE: {title || alt}
        </figcaption>
      )}
    </figure>
  ),
  Table: ({ children, className }: ComponentProps) => (
    <div className="my-8">
      <Table className={className}>{children}</Table>
    </div>
  ),
  TableHeader: ({ children, className }: ComponentProps) => (
    <TableHeader className={className}>{children}</TableHeader>
  ),
  TableBody: ({ children, className }: ComponentProps) => (
    <TableBody className={className}>{children}</TableBody>
  ),
  TableRow: ({ children, className }: ComponentProps) => (
    <TableRow className={className}>{children}</TableRow>
  ),
  TableHead: ({ children, className }: ComponentProps) => (
    <TableHead className={className}>{children}</TableHead>
  ),
  TableCell: ({ children, className }: ComponentProps) => (
    <TableCell className={className}>{children}</TableCell>
  ),
};

export function MarkdocRenderer({ content }: { content: RenderableTreeNode }) {
  return (
    <div className="markdoc-content">
      {Markdoc.renderers.react(content, React, { components })}
    </div>
  );
}
