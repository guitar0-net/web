// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { withServer } from "@/test/helpers/server";

import { buildApiClient } from "./client";
import {
  ApiError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "./errors";

type TestPaths = {
  "/": {
    get: {
      responses: {
        200: { content: { "application/json": { data: string } } };
        401: { content: { "application/json": { detail: string } } };
        403: { content: { "application/json": { detail: string } } };
        404: { content: { "application/json": { detail: string } } };
        422: { content: { "application/json": { field: string[] } } };
        503: { content: { "application/json": { detail: string } } };
        500: { content: never };
      };
    };
  };
};

describe("buildApiClient", () => {
  it("returns data directly on a 200 response", async () => {
    const body = { data: Math.random().toString(36) };
    await withServer(
      (_, res) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(body));
      },
      async (url) => {
        const client = buildApiClient<TestPaths>(url);
        const data = await client.get("/");
        expect(data).toEqual(body);
      },
    );
  });

  it("throws UnauthorizedError with status 401 on a 401 response", async () => {
    await withServer(
      (_, res) => {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ detail: Math.random().toString(36) }));
      },
      async (url) => {
        const client = buildApiClient<TestPaths>(url);
        await expect(client.get("/")).rejects.toBeInstanceOf(UnauthorizedError);
      },
    );
  });

  it("throws ForbiddenError on a 403 response", async () => {
    await withServer(
      (_, res) => {
        res.writeHead(403, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ detail: Math.random().toString(36) }));
      },
      async (url) => {
        const client = buildApiClient<TestPaths>(url);
        await expect(client.get("/")).rejects.toBeInstanceOf(ForbiddenError);
      },
    );
  });

  it("throws NotFoundError on a 404 response", async () => {
    await withServer(
      (_, res) => {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ detail: Math.random().toString(36) }));
      },
      async (url) => {
        const client = buildApiClient<TestPaths>(url);
        await expect(client.get("/")).rejects.toBeInstanceOf(NotFoundError);
      },
    );
  });

  it("throws ValidationError on a 422 response", async () => {
    await withServer(
      (_, res) => {
        res.writeHead(422, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ field: [Math.random().toString(36)] }));
      },
      async (url) => {
        const client = buildApiClient<TestPaths>(url);
        await expect(client.get("/")).rejects.toBeInstanceOf(ValidationError);
      },
    );
  });

  it("throws ApiError on an unrecognised error status", async () => {
    await withServer(
      (_, res) => {
        res.writeHead(503, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ detail: Math.random().toString(36) }));
      },
      async (url) => {
        const client = buildApiClient<TestPaths>(url);
        await expect(client.get("/")).rejects.toBeInstanceOf(ApiError);
      },
    );
  });

  it("resolves all responses with correct data when called concurrently", async () => {
    const body = { data: `параллельно-${Math.random().toString(36)}` };
    await withServer(
      (_, res) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(body));
      },
      async (url) => {
        const client = buildApiClient<TestPaths>(url);
        const results = await Promise.all([
          client.get("/"),
          client.get("/"),
          client.get("/"),
        ]);
        expect(results).toHaveLength(3);
        expect(results.every((r) => r.data === body.data)).toBe(true);
      },
    );
  });

  it("throws when the server is unreachable", async () => {
    const port = Math.floor(Math.random() * 1000 + 60000);
    const client = buildApiClient<TestPaths>(`http://localhost:${port}`);
    await expect(client.get("/")).rejects.toThrow(/fetch failed|ECONNREFUSED/i);
  });
});
