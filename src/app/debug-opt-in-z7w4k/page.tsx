"use client";

import { useEffect, useState } from "react";
import posthog from "posthog-js";

export default function DebugOptInPage() {
  const [status, setStatus] = useState<string>("Initializing opt-in...");

  useEffect(() => {
    try {
      posthog.opt_in_capturing();
      const optedOut = posthog.has_opted_out_capturing();
      setTimeout(() => {
        if (!optedOut) {
          setStatus("SUCCESS: PostHog data collection enabled.");
        } else {
          setStatus(
            "FAILED: PostHog capturing state is still set to opted out."
          );
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
