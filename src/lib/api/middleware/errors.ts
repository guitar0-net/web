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

export async function normalizeErrorResponse(
  response: Response,
  schemaPath: string,
  requestPath?: string,
): Promise<Response> {
  if (response.ok) return response;

  const data = await response.json().catch(() => undefined);
  const details = { schemaPath, requestPath, data };

  if (response.status === 401) throw new UnauthorizedError(details);
  if (response.status === 403) throw new ForbiddenError(details);
  if (response.status === 404) throw new NotFoundError(details);
  if (response.status === 422) throw new ValidationError(details);

  throw new ApiError({
    ...details,
    status: response.status,
    reason: `API error: ${response.status}`,
  });
}

export const errorMiddleware: Middleware = {
  onResponse: ({ response, request, schemaPath }) =>
    normalizeErrorResponse(response, schemaPath, new URL(request.url).pathname),
};
