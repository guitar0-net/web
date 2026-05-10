// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/* v8 ignore file */

import { cacheLife } from "next/cache";

import { coursesApi } from "@/features/courses";

import { MainMenuInline } from "./main-menu-inline";
import { type CourseMenuItem } from "./types";

export async function MainMenuServer() {
  "use cache";
  cacheLife("hours");
  let courses: CourseMenuItem[] | null = null;
  try {
    courses = (await coursesApi.fetchCourses()).results;
  } catch (error) {
    console.error("[MainMenuServer] Failed to fetch courses:", error);
  }
  return <MainMenuInline courses={courses} />;
}
