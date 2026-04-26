// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/* v8 ignore file */

import { apiClient } from "@/lib/api";
import type { components } from "@/types/api";

export type LessonDetail = components["schemas"]["LessonDetail"];

export const lessonsApi = {
  fetchLesson: async (uuid: string): Promise<LessonDetail> =>
    apiClient.get("/api/v1/lessons/{uuid}/", { params: { path: { uuid } } }),
};
