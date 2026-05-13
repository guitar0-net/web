// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { buildApiClient } from "@/lib/api/client";
import { withServer } from "@/test/helpers/server";
import type { paths } from "@/types/api";

import type { ChordsListItem } from "./api";

function makeChordsApi(baseUrl: string) {
  const client = buildApiClient<paths>(baseUrl);
  return {
    fetchChords: async (): Promise<ChordsListItem[]> => {
      const result = await client.get("/api/v1/chords/", {
        params: { query: { limit: 200 } },
      });
      return result.results;
    },
  };
}

it("fetchChords returns chord items from results", async () => {
  const items: ChordsListItem[] = [
    { id: 1, title: "Am", musical_title: "A minor", positions: [] },
    { id: 2, title: "Cm", musical_title: "C minor", positions: [] },
  ];
  await withServer(
    (_, res) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ count: 2, results: items }));
    },
    async (url) => {
      expect(await makeChordsApi(url).fetchChords()).toEqual(items);
    },
  );
});

it("fetchChords returns empty array when results is empty", async () => {
  await withServer(
    (_, res) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ count: 0, results: [] }));
    },
    async (url) => {
      expect(await makeChordsApi(url).fetchChords()).toEqual([]);
    },
  );
});
