// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { NextConfig } from "next";

import { POSTHOG_ASSETS_HOST, POSTHOG_HOST } from "./src/lib/constants";

const nextConfig: NextConfig = {
  output: "standalone",
  cacheComponents: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**.guitar0.net" }],
  },
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: `${POSTHOG_ASSETS_HOST}/static/:path*`,
      },
      {
        source: "/ingest/array/:path*",
        destination: `${POSTHOG_ASSETS_HOST}/array/:path*`,
      },
      {
        source: "/ingest/:path*",
        destination: `${POSTHOG_HOST}/:path*`,
      },
    ];
  },
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
