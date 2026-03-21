// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { config } from "../config";
import { ApiError, ForbiddenError, NotFoundError, UnauthorizedError } from "./errors";

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${config.apiUrl}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
  });

  if (!response.ok) {
    const data = await response.json().catch(() => undefined);
    if (response.status === 401) throw new UnauthorizedError(data);
    if (response.status === 403) throw new ForbiddenError(data);
    if (response.status === 404) throw new NotFoundError(data);
    throw new ApiError(response.status, `API error: ${response.status}`, data);
  }

  if (response.status === 204) return undefined as T;

  const contentType = response.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    return response.json() as Promise<T>;
  }

  return response.text() as Promise<T>;
}
