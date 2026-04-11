// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { withServer } from "@/test/helpers/server";

import { buildApiClient } from "./client";
import { UnauthorizedError } from "./errors";
import { normalizeErrorResponse } from "./middleware/errors";
import * as unwrapModule from "./unwrap";

function buildTestClient(url: string) {
  return buildApiClient<{
    "/": {
      get: {
        responses: {
          200: { content: { "application/json": { lesson: number } } };
          401: { content: { "application/json": { detail: string } } };
        };
      };
    };
  }>(url);
}

describe("unwrap unit", () => {
  it("returns data on a successful response", () => {
    expect(unwrapModule.unwrap({ data: 42 })).toBe(42);
  });

  it("throws when data is absent", () => {
    expect(() => unwrapModule.unwrap({})).toThrow("Response contained no data");
  });

  it("never receives an error field — errorMiddleware throws first", async () => {
    const errorResponse = new Response(JSON.stringify({ detail: "unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
    await expect(normalizeErrorResponse(errorResponse)).rejects.toThrow();
  });
});

describe("unwrap integration", () => {
  it("returns data", async () => {
    const body = { lesson: 1 };
    await withServer(
      (_, res) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(body));
      },
      async (url) => {
        const client = buildTestClient(url);
        expect(await client.get("/")).toEqual(body);
      },
    );
  });

  it("throws error before unwrap is called", async () => {
    const unwrapSpy = vi.spyOn(unwrapModule, "unwrap");
    await withServer(
      (_, res) => {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ detail: "error details" }));
      },
      async (url) => {
        const client = buildTestClient(url);
        await expect(client.get("/")).rejects.toThrow(UnauthorizedError);
        expect(unwrapSpy).not.toHaveBeenCalled();
      },
    );
  });
});
