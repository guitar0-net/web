// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { apiClient } from "@/lib/api";
import { components } from "@/types/api";

export type CoursesListItem = components["schemas"]["CoursesList"];
export type CoursesList = CoursesListItem[];
export type PaginatedCoursesList = components["schemas"]["PaginatedCoursesListList"];

export const coursesApi = {
  fetchCourses: async (params?: {
    limit?: number;
    offset?: number;
  }): Promise<PaginatedCoursesList> =>
    apiClient.get("/api/v1/courses/", { cache: "no-store", params: { query: params } }),
};
