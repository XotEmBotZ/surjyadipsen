import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-none border-2 border-border bg-clip-padding text-sm font-bold uppercase tracking-tight whitespace-nowrap transition-all outline-none select-none focus-visible:ring-0 focus-visible:border-border active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-0 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-card hover:text-foreground",
        outline:
          "border-2 border-border bg-transparent hover:bg-primary hover:text-primary-foreground aria-expanded:bg-primary aria-expanded:text-primary-foreground",
        secondary:
          "bg-muted text-muted-foreground border-2 border-border hover:bg-primary hover:text-primary-foreground",
        ghost:
          "border-transparent hover:bg-primary hover:text-primary-foreground aria-expanded:bg-primary aria-expanded:text-primary-foreground",
        destructive:
          "bg-destructive text-destructive-foreground border-2 border-border hover:bg-card hover:text-destructive",
        link: "text-foreground underline-offset-4 hover:underline border-none",
      },
      size: {
        default:
          "h-8 gap-1.5 px-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
        xs: "h-6 gap-1 px-2 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 px-2.5 text-[0.8rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 gap-2 px-4 text-base",
        icon: "size-8",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
