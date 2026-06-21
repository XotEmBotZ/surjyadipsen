"use client";

import { useEffect, useState } from "react";
import posthog from "posthog-js";

export default function DebugOptOutPage() {
  const [status, setStatus] = useState<string>("Initializing opt-out...");

  useEffect(() => {
    try {
      posthog.opt_out_capturing();
      const optedOut = posthog.has_opted_out_capturing();
      setTimeout(() => {
        if (optedOut) {
          setStatus("SUCCESS: PostHog data collection disabled.");
        } else {
          setStatus("FAILED: PostHog capturing state is not set to opted out.");
        }
      }, 0);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setTimeout(() => {
        setStatus(`ERROR: ${msg}`);
      }, 0);
    }
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <pre>{status}</pre>
    </div>
  );
}
