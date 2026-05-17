// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/* v8 ignore file */

"use client";

import { usePathname } from "next/navigation";
import posthog from "posthog-js";
import { useEffect } from "react";

export function PageviewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const url = window.location.href;
    posthog.capture("$pageview", { $current_url: url });
    return () => {
      posthog.capture("$pageleave", { $current_url: url });
    };
  }, [pathname]);

  return null;
}
