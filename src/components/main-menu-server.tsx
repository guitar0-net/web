// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { cacheLife } from "next/cache";

import { type CoursesList, coursesApi } from "@/features/courses";

import { MainMenu } from "./main-menu";

export async function MainMenuServer() {
  "use cache";
  cacheLife("hours");
  let courses: CoursesList | null = null;
  try {
    courses = (await coursesApi.fetchCourses()).results;
  } catch (error) {
    console.error("[MainMenuServer] Failed to fetch courses:", error);
  }
  return <MainMenu courses={courses} />;
}
