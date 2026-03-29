// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { apiClient, unwrap } from "@/lib/api";
import type { components } from "@/types/api";

type AnnouncementsList = components["schemas"]["AnnouncementsList"];
type AnnouncementDetail = components["schemas"]["AnnouncementDetail"];

export function createAnnouncementApi(client: typeof apiClient) {
  return {
    fetchAnnouncements: async (): Promise<AnnouncementsList[]> =>
      unwrap(await client.GET("/api/v1/announcements/")),
    fetchAnnouncement: async (uuid: string): Promise<AnnouncementDetail> =>
      unwrap(
        await client.GET("/api/v1/announcements/{uuid}/", {
          params: { path: { uuid } },
        }),
      ),
  };
}

export const announcementsApi = createAnnouncementApi(apiClient);
