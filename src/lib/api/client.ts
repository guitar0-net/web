// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import createClient from "openapi-fetch";
import type { Client, MaybeOptionalInit, MethodResponse } from "openapi-fetch";
import type { PathsWithMethod } from "openapi-typescript-helpers";

import type { paths } from "@/types/api";

import { config } from "../config";
import { errorMiddleware } from "./middleware/errors";
import { unwrap } from "./unwrap";

// TypeScript cannot index T[P]["get"] directly from PathsWithMethod<T, "get"> alone.
// This conditional extracts the init type safely via `infer`.
type GetInit<Obj> = Obj extends { get: infer Op }
  ? MaybeOptionalInit<{ get: Op }, "get">
  : undefined;

export function buildApiClient<T extends object>(baseUrl: string) {
  const raw = createClient<T>({ baseUrl });
  raw.use(errorMiddleware);

  return {
    get: async <P extends PathsWithMethod<T, "get">>(
      path: P,
      init?: GetInit<T[P]>,
    ): Promise<MethodResponse<Client<T>, "get", P>> =>
      // InitParam<Init> is not exported from openapi-fetch, so TypeScript cannot match
      // `init?` against the rest-param `...init: InitParam<Init>` for generic T[P].
      // The call site is fully type-safe; only the internal bridge needs `as never`.
      unwrap(await raw.GET(path, init as never)),
  };
}

export const apiClient = buildApiClient<paths>(config.apiUrl);
