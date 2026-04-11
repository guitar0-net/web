// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { apiClient } from "@/lib/api";
import { components } from "@/types/api";

export type CoursesListItem = components["schemas"]["CoursesList"];
export type CoursesList = CoursesListItem[];

export const coursesApi = {
  fetchCourses: async (): Promise<CoursesList> =>
    apiClient.get("/api/v1/courses/", { cache: "no-store" }),
};
