"use client";

import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

export function MermaidChart({ code }: { code: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && ref.current && code) {
      // Resolve CSS variables from global.css at runtime
      // Mermaid doesn't support var(--...) syntax in its internal color parser
      const style = getComputedStyle(document.documentElement);
      const getVar = (name: string) => style.getPropertyValue(name).trim();

      mermaid.initialize({
        startOnLoad: false,
        theme: "base",
        themeVariables: {
          primaryColor: getVar("--canvas") || "#fff7db",
          primaryTextColor: getVar("--primary") || "#000000",
          primaryBorderColor: getVar("--primary") || "#000000",
          lineColor: getVar("--primary") || "#000000",
          secondaryColor: getVar("--surface-muted") || "#e0e0e0",
          tertiaryColor: getVar("--surface-card") || "#f5f1e2",
          fontFamily: getVar("--font-mono") || "monospace",
          fontSize: "12px",
        },
      });

      ref.current.innerHTML = "";
      const id = `mermaid-${Math.random().toString(36).substring(7)}`;
      mermaid
        .render(id, code)
        .then((result) => {
          if (ref.current) ref.current.innerHTML = result.svg;
        })
        .catch((e) => {
          if (ref.current)
            ref.current.innerHTML = `<pre class="text-error text-xs p-4 border-2 border-error font-mono">${e.message}</pre>`;
        });
    }
  }, [code]);

  if (!code) return null;

  return (
    <div
      ref={ref}
      className="border-primary bg-surface-muted/20 my-8 flex w-full justify-center overflow-x-auto border-y-2 py-6"
    />
  );
}
