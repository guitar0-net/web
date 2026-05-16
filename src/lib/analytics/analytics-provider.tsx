// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/* v8 ignore file */

"use client";

import { PostHogProvider } from "@posthog/react";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";
import { Suspense, useEffect, type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const isAnalyticsEnabled =
  !!process.env.NEXT_PUBLIC_POSTHOG_KEY && process.env.NODE_ENV === "production";

function PageviewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!isAnalyticsEnabled) return;
    posthog.capture("$pageview", { $current_url: window.location.href });
  }, [pathname]);

  return null;
}

export function AnalyticsProvider({ children }: Props) {
  useEffect(() => {
    if (!isAnalyticsEnabled) return;

    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: "https://eu.i.posthog.com",
      defaults: "2026-01-30",
      persistence: "localStorage",
      capture_pageview: false,
      autocapture: false,
    });
  }, []);

  return (
    <PostHogProvider client={posthog}>
      <Suspense>
        <PageviewTracker />
      </Suspense>
      {children}
    </PostHogProvider>
  );
}
