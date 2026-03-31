// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { apiClient } from "@/lib/api";

export function makeApiStub(response: unknown) {
  let capturedPath: string | undefined;
  let capturedParams: unknown;
  const client = {
    GET: async (path: string, opts?: { params?: unknown }) => {
      capturedPath = path;
      capturedParams = opts?.params;
      return { data: response, error: undefined };
    },
  } as unknown as typeof apiClient;
  return {
    client,
    getCapturedPath: () => capturedPath,
    getCapturedParams: () => capturedParams,
  };
}
