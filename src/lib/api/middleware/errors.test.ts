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
    expect(await normalizeErrorResponse(response, "/api/v1/уроки/")).toBe(response);
  });

  it("throws UnauthorizedError when response status is 401", async () => {
    const response = fakeJsonResponse(401, { detail: Math.random().toString(36) });
    await expect(
      normalizeErrorResponse(response, "/api/v1/профиль/"),
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });

  it("throws ForbiddenError when response status is 403", async () => {
    const response = fakeJsonResponse(403, { detail: Math.random().toString(36) });
    await expect(
      normalizeErrorResponse(response, "/api/v1/подписка/"),
    ).rejects.toBeInstanceOf(ForbiddenError);
  });

  it("throws NotFoundError when response status is 404", async () => {
    const response = fakeJsonResponse(404, { detail: Math.random().toString(36) });
    await expect(
      normalizeErrorResponse(response, "/api/v1/аккорды/{slug}/"),
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it("throws ValidationError when response status is 422", async () => {
    const response = fakeJsonResponse(422, { field: [Math.random().toString(36)] });
    await expect(
      normalizeErrorResponse(response, "/api/v1/отзывы/"),
    ).rejects.toBeInstanceOf(ValidationError);
  });

  it("throws ApiError when response status is 503", async () => {
    const response = fakeJsonResponse(503, { detail: Math.random().toString(36) });
    await expect(
      normalizeErrorResponse(response, "/api/v1/анонсы/"),
    ).rejects.toBeInstanceOf(ApiError);
  });

  it("throws ApiError when error response body is not valid JSON", async () => {
    const response = new Response(`не валидный JSON ${Math.random()}`, { status: 500 });
    await expect(
      normalizeErrorResponse(response, "/api/v1/песни/{uuid}/"),
    ).rejects.toBeInstanceOf(ApiError);
  });

  it("throws UnauthorizedError that is also an instance of ApiError", async () => {
    const response = fakeJsonResponse(401, { detail: Math.random().toString(36) });
    await expect(
      normalizeErrorResponse(response, "/api/v1/избранное/"),
    ).rejects.toBeInstanceOf(ApiError);
  });

  it("names the failing schema path in the error message", async () => {
    const schemaPath = `/api/v1/курсы-${Math.random().toString(36).slice(2)}/{uuid}/`;
    const response = fakeJsonResponse(502, { detail: Math.random().toString(36) });
    await expect(normalizeErrorResponse(response, schemaPath)).rejects.toThrow(
      schemaPath,
    );
  });

  it("exposes the schema path template on the thrown error", async () => {
    const schemaPath = `/api/v1/курсы-${Math.random().toString(36).slice(2)}/{uuid}/`;
    const response = fakeJsonResponse(500, { detail: Math.random().toString(36) });
    await expect(normalizeErrorResponse(response, schemaPath)).rejects.toMatchObject({
      schemaPath,
    });
  });

  it("exposes the concrete request path on the thrown error", async () => {
    const requestPath = `/api/v1/курсы/${crypto.randomUUID()}/`;
    const response = fakeJsonResponse(404, { detail: Math.random().toString(36) });
    await expect(
      normalizeErrorResponse(response, "/api/v1/курсы/{uuid}/", requestPath),
    ).rejects.toMatchObject({ requestPath });
  });
});
