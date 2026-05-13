// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/* v8 ignore file */

import { apiClient } from "@/lib/api";
import type { components } from "@/types/api";

export type ChordDetail = components["schemas"]["ChordDetail"];
export type ChordsListItem = components["schemas"]["ChordsList"];

export const chordsApi = {
  fetchChords: async (): Promise<ChordsListItem[]> => {
    const result = await apiClient.get("/api/v1/chords/", {
      params: { query: { limit: 200 } },
    });
    return result.results;
  },
};
