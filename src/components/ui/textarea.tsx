import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-border placeholder:text-muted-foreground disabled:bg-input/50 aria-invalid:border-destructive dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 flex field-sizing-content min-h-16 w-full rounded-none border bg-transparent px-2.5 py-2 text-base transition-colors outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-0 md:text-sm dark:aria-invalid:ring-0",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
