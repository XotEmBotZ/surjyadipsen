"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import Link from "next/link";

export function PostHogPageView({
  event,
  properties,
}: {
  event: string;
  properties?: Record<string, unknown>;
}) {
  useEffect(() => {
    posthog.capture(event, properties);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

export function ResumeDownloadButton({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => posthog.capture("resume_downloaded", { url: href })}
    >
      {children}
    </Link>
  );
}

export function EndorsementsLink({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href="/testimonials"
      className={className}
      onClick={() => posthog.capture("view_all_endorsements_clicked")}
    >
      {children}
    </Link>
  );
}

export function TrackedExternalLink({
  href,
  event,
  properties,
  children,
  className,
}: {
  href: string;
  event: string;
  properties?: Record<string, unknown>;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => posthog.capture(event, { url: href, ...properties })}
    >
      {children}
    </Link>
  );
}
