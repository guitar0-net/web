// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import {
  ApiError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "../errors";
import { normalizeErrorResponse } from "./errors";

function fakeJsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("normalizeErrorResponse", () => {
  it("returns the response unchanged when status is 200", async () => {
    const response = fakeJsonResponse(200, { урок: Math.random().toString(36) });
    expect(await normalizeErrorResponse(response)).toBe(response);
  });

  it("throws UnauthorizedError when response status is 401", async () => {
    const response = fakeJsonResponse(401, { detail: Math.random().toString(36) });
    await expect(normalizeErrorResponse(response)).rejects.toBeInstanceOf(
      UnauthorizedError,
    );
  });

  it("throws ForbiddenError when response status is 403", async () => {
    const response = fakeJsonResponse(403, { detail: Math.random().toString(36) });
    await expect(normalizeErrorResponse(response)).rejects.toBeInstanceOf(
      ForbiddenError,
    );
  });

  it("throws NotFoundError when response status is 404", async () => {
    const response = fakeJsonResponse(404, { detail: Math.random().toString(36) });
    await expect(normalizeErrorResponse(response)).rejects.toBeInstanceOf(
      NotFoundError,
    );
  });

  it("throws ValidationError when response status is 422", async () => {
    const response = fakeJsonResponse(422, { field: [Math.random().toString(36)] });
    await expect(normalizeErrorResponse(response)).rejects.toBeInstanceOf(
      ValidationError,
    );
  });

  it("throws ApiError when response status is 503", async () => {
    const response = fakeJsonResponse(503, { detail: Math.random().toString(36) });
    await expect(normalizeErrorResponse(response)).rejects.toBeInstanceOf(ApiError);
  });

  it("throws ApiError when error response body is not valid JSON", async () => {
    const response = new Response(`не валидный JSON ${Math.random()}`, { status: 500 });
    await expect(normalizeErrorResponse(response)).rejects.toBeInstanceOf(ApiError);
  });

  it("throws UnauthorizedError that is also an instance of ApiError", async () => {
    const response = fakeJsonResponse(401, { detail: Math.random().toString(36) });
    await expect(normalizeErrorResponse(response)).rejects.toBeInstanceOf(ApiError);
  });
});
