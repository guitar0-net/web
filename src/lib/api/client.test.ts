// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { withServer } from "@/test/helpers/server";

import { apiFetch } from "./client";
import { ApiError, ForbiddenError, NotFoundError, UnauthorizedError } from "./errors";

describe("apiFetch", () => {
  it("returns parsed response body on a 200 response", async () => {
    const body = { урок: Math.random().toString(36) };
    await withServer(
      (_, res) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(body));
      },
      async (url) => {
        process.env.NEXT_PUBLIC_API_URL = url;
        const result = await apiFetch<typeof body>("/");
        expect(result).toEqual(body);
      },
    );
  }, 5000);

  it("throws NotFoundError on a 404 response", async () => {
    await withServer(
      (_, res) => {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ detail: Math.random().toString(36) }));
      },
      async (url) => {
        process.env.NEXT_PUBLIC_API_URL = url;
        await expect(apiFetch("/")).rejects.toBeInstanceOf(NotFoundError);
      },
    );
  }, 5000);

  it("throws UnauthorizedError on a 401 response", async () => {
    await withServer(
      (_, res) => {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ detail: Math.random().toString(36) }));
      },
      async (url) => {
        process.env.NEXT_PUBLIC_API_URL = url;
        await expect(apiFetch("/")).rejects.toBeInstanceOf(UnauthorizedError);
      },
    );
  }, 5000);

  it("throws ForbiddenError on a 403 response", async () => {
    await withServer(
      (_, res) => {
        res.writeHead(403, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ detail: Math.random().toString(36) }));
      },
      async (url) => {
        process.env.NEXT_PUBLIC_API_URL = url;
        await expect(apiFetch("/")).rejects.toBeInstanceOf(ForbiddenError);
      },
    );
  }, 5000);

  it("throws ApiError on a non-ok response other than known", async () => {
    await withServer(
      (_, res) => {
        res.writeHead(503, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ detail: Math.random().toString(36) }));
      },
      async (url) => {
        process.env.NEXT_PUBLIC_API_URL = url;
        await expect(apiFetch("/")).rejects.toBeInstanceOf(ApiError);
      },
    );
  });

  it("sends the Content-Type application/json header", async () => {
    let capturedContentType: string | undefined;
    await withServer(
      (req, res) => {
        capturedContentType = req.headers["content-type"];
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end("{}");
      },
      async (url) => {
        process.env.NEXT_PUBLIC_API_URL = url;
        await apiFetch("/");
        expect(capturedContentType).toBe("application/json");
      },
    );
  });

  it("includes caller-provided headers in the request", async () => {
    const headerValue = Math.random().toString(36);
    let capturedHeader: string | undefined;
    await withServer(
      (req, res) => {
        capturedHeader = [req.headers["x-lesson-id"]].flat()[0];
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end("{}");
      },
      async (url) => {
        process.env.NEXT_PUBLIC_API_URL = url;
        await apiFetch("/", { headers: { "x-lesson-id": headerValue } });
        expect(capturedHeader).toBe(headerValue);
      },
    );
  });

  it("preserves Content-Type when caller-provided headers are present", async () => {
    let capturedContentType: string | undefined;
    await withServer(
      (req, res) => {
        capturedContentType = req.headers["content-type"];
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end("{}");
      },
      async (url) => {
        process.env.NEXT_PUBLIC_API_URL = url;
        await apiFetch("/", { headers: { "x-lesson-id": "123" } });
        expect(capturedContentType).toBe("application/json");
      },
    );
  });

  it("throws ApiError when the error response body is not valid JSON", async () => {
    await withServer(
      (_, res) => {
        res.writeHead(500);
        res.end(`не валидный JSON ${Math.random()}`);
      },
      async (url) => {
        process.env.NEXT_PUBLIC_API_URL = url;
        await expect(apiFetch("/")).rejects.toBeInstanceOf(ApiError);
      },
    );
  });

  it("returns plain text when the response in not JSON", async () => {
    const text = `урок-${Math.random().toString(36)}`;
    await withServer(
      (_, res) => {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(text);
      },
      async (url) => {
        process.env.NEXT_PUBLIC_API_URL = url;
        const result = await apiFetch<string>("/");
        expect(result).toBe(text);
      },
    );
  });

  it("returns undefined on a 204 response", async () => {
    await withServer(
      (_, res) => {
        res.writeHead(204);
        res.end();
      },
      async (url) => {
        process.env.NEXT_PUBLIC_API_URL = url;
        const result = await apiFetch<undefined>("/");
        expect(result).toBeUndefined();
      },
    );
  });

  it("resolves all responses when called concurrently", async () => {
    const body = { параллельно: Math.random().toString(36) };
    await withServer(
      (_, res) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(body));
      },
      async (url) => {
        process.env.NEXT_PUBLIC_API_URL = url;
        const results = await Promise.all([
          apiFetch("/"),
          apiFetch("/"),
          apiFetch("/"),
        ]);
        expect(results).toHaveLength(3);
      },
    );
  });

  it("throws when the server is unreachable", async () => {
    process.env.NEXT_PUBLIC_API_URL = `http://localhost:${Math.floor(Math.random() * 1000 + 60000)}`;
    await expect(apiFetch("/")).rejects.toBeInstanceOf(Error);
  });
});
