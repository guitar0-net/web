// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { apiClient } from "@/lib/api";
import type { components } from "@/types/api";

export type AnnouncementsListItem = components["schemas"]["AnnouncementsList"];
export type AnnouncementDetail = components["schemas"]["AnnouncementDetail"];
export type AnnouncementsList = AnnouncementsListItem[];

export const announcementsApi = {
  fetchAnnouncements: async (): Promise<AnnouncementsList> =>
    apiClient.get("/api/v1/announcements/"),
  fetchAnnouncement: async (uuid: string): Promise<AnnouncementDetail> =>
    apiClient.get("/api/v1/announcements/{uuid}/", { params: { path: { uuid } } }),
};
