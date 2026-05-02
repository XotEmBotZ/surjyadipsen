import { block } from "@keystatic/core/content-components";
import { fields } from "@keystatic/core";
import { MermaidChart } from "./mermaid-chart";
import React from "react";

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
};
