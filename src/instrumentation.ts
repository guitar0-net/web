// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Instrumentation } from "next";
import type { PostHog } from "posthog-node";

/* v8 ignore file */
import { POSTHOG_HOST } from "@/lib/constants";

let clientPromise: Promise<PostHog> | undefined;

function getClient(key: string): Promise<PostHog> {
  clientPromise ??= import("posthog-node").then(
    ({ PostHog }) => new PostHog(key, { host: POSTHOG_HOST }),
  );
  return clientPromise;
}

function errorDigest(error: unknown): string | undefined {
  return typeof error === "object" && error !== null && "digest" in error
    ? String(error.digest)
    : undefined;
}

/**
 * Report errors thrown while rendering on the server.
 *
 * Without this hook a failed server render only ever surfaces in the browser as React
 * error #419 ("the server could not finish this Suspense boundary"), which carries no
 * stack, no route and no cause. The context Next.js passes here is what turns that
 * into an actionable report.
 */
export const onRequestError: Instrumentation.onRequestError = async (
  error,
  request,
  context,
) => {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key || process.env.NODE_ENV !== "production") return;
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  const client = await getClient(key);
  const [pathname] = request.path.split("?");

  await client.captureExceptionImmediate(error, undefined, {
    digest: errorDigest(error),
    $pathname: pathname,
    request_path: request.path,
    request_method: request.method,
    route_path: context.routePath,
    route_type: context.routeType,
    router_kind: context.routerKind,
    render_source: context.renderSource,
    revalidate_reason: context.revalidateReason,
  });
};
