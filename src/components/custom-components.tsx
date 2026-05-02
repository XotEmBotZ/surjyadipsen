import { block, wrapper, repeating } from "@keystatic/core/content-components";
import { fields } from "@keystatic/core";
import { MermaidChart } from "./mermaid-chart";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

// ==========================================
// 1. KEYSTATIC CONTENT BLOCKS
// Used in keystatic.config.ts to render the UI editor preview
// ==========================================
export const componentBlocks = {
  mermaid: block({
    label: "Mermaid Chart",
    description: "Render a Mermaid diagram or chart",
    schema: {
      code: fields.text({
        label: "Mermaid Code",
        multiline: true,
      }),
    },
    ContentView: (props) => {
      return (
        <div style={{ pointerEvents: "none" }}>
          <MermaidChart code={props.value.code} />
        </div>
      );
    },
  }),
  accordion: repeating({
    label: "Accordion",
    children: ["accordionItem"],
    schema: {},
    ContentView: (props) => {
      return (
        <div className="border-primary bg-surface-card border-2 p-4">
          <div className="font-technical-sm text-primary mb-4 text-[10px] uppercase opacity-50">
            Accordion_Container
          </div>
          {props.children}
        </div>
      );
    },
  }),
  accordionItem: wrapper({
    label: "Accordion Item",
    schema: {
      title: fields.text({ label: "Title" }),
    },
    ContentView: (props) => {
      return (
        <div className="border-primary border-b-2 py-2 last:border-b-0">
          <div className="text-primary flex items-center justify-between text-sm font-bold uppercase">
            <span>{props.value.title || "Untitled Item"}</span>
            <span>↓</span>
          </div>
          <div className="text-primary mt-2 text-xs opacity-80">
            {props.children}
          </div>
        </div>
      );
    },
  }),
};

// ==========================================
// 2. MARKDOC PARSER TAGS & NODES
// Used in Markdoc.transform(node, { tags: markdocTags, nodes: markdocNodes })
// ==========================================
export const markdocTags = {
  mermaid: {
    render: "Mermaid",
    attributes: {
      code: {
        type: String,
        required: true,
      },
    },
  },
  accordion: {
    render: "Accordion",
  },
  accordionItem: {
    render: "AccordionItem",
    attributes: {
      title: { type: String, required: true },
    },
  },
};

export const markdocNodes = {
  fence: {
    render: "Fence",
    attributes: {
      content: { type: String },
      language: { type: String },
    },
  },
  table: {
    render: "Table",
  },
  thead: {
    render: "TableHeader",
  },
  tbody: {
    render: "TableBody",
  },
  tr: {
    render: "TableRow",
  },
  th: {
    render: "TableHead",
  },
  td: {
    render: "TableCell",
  },
};

// ==========================================
// 3. MARKDOC REACT RENDERERS
// Used in Markdoc.renderers.react(content, React, { components: reactComponents })
// ==========================================
export const reactComponents = {
  Mermaid: ({ code }: { code: string }) => <MermaidChart code={code} />,
  Accordion: ({ children }: { children: React.ReactNode }) => (
    <Accordion
      type="single"
      collapsible
      className="border-primary my-8 border-t-2"
    >
      {children}
    </Accordion>
  ),
  AccordionItem: ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <AccordionItem value={title}>
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  ),
};
