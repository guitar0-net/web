// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Middleware } from "openapi-fetch";

import {
  ApiError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "../errors";

export async function normalizeErrorResponse(response: Response): Promise<Response> {
  if (response.ok) return response;

  const data = await response.json().catch(() => undefined);

  if (response.status === 401) throw new UnauthorizedError(data);
  if (response.status === 403) throw new ForbiddenError(data);
  if (response.status === 404) throw new NotFoundError(data);
  if (response.status === 422) throw new ValidationError(data);

  throw new ApiError(response.status, `API error: ${response.status}`, data);
}

export const errorMiddleware: Middleware = {
  onResponse: ({ response }) => normalizeErrorResponse(response),
};
