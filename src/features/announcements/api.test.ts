// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { NotFoundError, unwrap } from "@/lib/api";
import { buildApiClient } from "@/lib/api/client";
import { withServer } from "@/test/helpers/server";
import type { paths } from "@/types/api";

import type { AnnouncementDetail, AnnouncementsList } from "./api";

function makeAnnouncementsApi(baseUrl: string) {
  const client = buildApiClient<paths>(baseUrl);
  return {
    fetchAnnouncements: async (): Promise<AnnouncementsList> =>
      unwrap(await client.GET("/api/v1/announcements/")),
    fetchAnnouncement: async (uuid: string): Promise<AnnouncementDetail> =>
      unwrap(
        await client.GET("/api/v1/announcements/{uuid}/", {
          params: { path: { uuid } },
        }),
      ),
  };
}

it("fetchAnnouncements throws NotFoundError on 404", async () => {
  await withServer(
    (_, res) => {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ detail: "not found" }));
    },
    async (url) => {
      await expect(
        makeAnnouncementsApi(url).fetchAnnouncements(),
      ).rejects.toBeInstanceOf(NotFoundError);
    },
  );
});

it("fetchAnnouncement throws NotFoundError on 404", async () => {
  await withServer(
    (_, res) => {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ detail: "not found" }));
    },
    async (url) => {
      await expect(
        makeAnnouncementsApi(url).fetchAnnouncement("nonexistent-uuid"),
      ).rejects.toBeInstanceOf(NotFoundError);
    },
  );
});

it("fetchAnnouncement returns detail on 200", async () => {
  const body: AnnouncementDetail = {
    uuid: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    title: "Критическое обновление",
    slug: "kriticheskoe-obnovlenie",
    content: "Подробности обновления...",
    created_at: "2026-01-15T10:00:00Z",
    updated_at: "2026-01-15T10:00:00Z",
  };
  await withServer(
    (_, res) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(body));
    },
    async (url) => {
      expect(await makeAnnouncementsApi(url).fetchAnnouncement(body.uuid)).toEqual(
        body,
      );
    },
  );
});

it("fetchAnnouncements returns list on 200", async () => {
  const body: AnnouncementsList = [
    {
      uuid: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      title: "Новый релиз",
      slug: "novyj-reliz",
    },
  ];
  await withServer(
    (_, res) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(body));
    },
    async (url) => {
      expect(await makeAnnouncementsApi(url).fetchAnnouncements()).toEqual(body);
    },
  );
});
