// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { apiClient, unwrap } from "@/lib/api";
import { components } from "@/types/api";

export type CoursesListItem = components["schemas"]["CoursesList"];
export type CoursesList = CoursesListItem[];

export function createCoursesApi(client: typeof apiClient) {
  return {
    fetchCourses: async (): Promise<CoursesList> =>
      unwrap(await client.GET("/api/v1/courses/", { cache: "no-store" })),
  };
}

export const coursesApi = createCoursesApi(apiClient);
