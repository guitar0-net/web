// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import http from "http";
import type { AddressInfo } from "net";

type ServerHandle = { url: string; close: () => Promise<void> };

export async function startServer(
  handler: (req: http.IncomingMessage, res: http.ServerResponse) => void,
): Promise<ServerHandle> {
  const server = http.createServer(handler);
  await new Promise<void>((resolve) => server.listen(0, resolve));
  const port = (server.address() as AddressInfo).port;
  return {
    url: `http://localhost:${port}`,
    close: () =>
      new Promise<void>((resolve, reject) =>
        server.close((err) => (err ? reject(err) : resolve())),
      ),
  };
}

export async function withServer(
  handler: (req: http.IncomingMessage, res: http.ServerResponse) => void,
  testFn: (url: string) => Promise<void>,
): Promise<void> {
  const { url, close } = await startServer(handler);
  let testError: unknown;
  try {
    await testFn(url);
  } catch (err) {
    testError = err;
  } finally {
    await close();
  }
  if (testError !== undefined) throw testError;
}
