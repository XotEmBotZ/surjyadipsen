"use client";

import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ScrollIndicator() {
  const scrollToNext = () => {
    const nextSection = document.getElementById("about");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="absolute bottom-12 left-1/2 z-20 -translate-x-1/2 md:bottom-16">
      <Button
        variant="outline"
        size="icon"
        className="bg-background/80 hover:bg-background animate-bounce rounded-full shadow-lg backdrop-blur-sm transition-all"
        onClick={scrollToNext}
        aria-label="Scroll to next section"
      >
        <ChevronDown className="size-6 stroke-3" />
      </Button>
    </div>
  );
}
