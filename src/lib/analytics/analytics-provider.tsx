// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/* v8 ignore file */

"use client";

import { PostHogProvider } from "@posthog/react";
import posthog from "posthog-js";
import { useEffect, type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function AnalyticsProvider({ children }: Props) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key || process.env.NODE_ENV !== "production") return;

    posthog.init(key, {
      api_host: "https://eu.i.posthog.com",
      defaults: "2026-01-30",
      persistence: "memory",
    });
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
