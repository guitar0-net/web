// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/* v8 ignore file */

import { coursesApi } from "@/features/courses";

import { MainMenu } from "./main-menu";

export async function MainMenuServer() {
  const courses = await coursesApi.fetchCourses();
  return <MainMenu courses={courses} />;
}
