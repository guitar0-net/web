// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import createClient from "openapi-fetch";

import type { paths } from "@/types/api";

import { config } from "../config";
import { errorMiddleware } from "./middleware/errors";

export function buildApiClient<T extends object>(baseUrl: string) {
  const client = createClient<T>({ baseUrl });
  client.use(errorMiddleware);
  return client;
}

export const apiClient = buildApiClient<paths>(config.apiUrl);
