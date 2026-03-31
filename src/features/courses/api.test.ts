// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { makeApiStub } from "@/test/helpers/api-stub";

import { createCoursesApi } from "./api";

describe("coursesApi", () => {
  it("fetchCourses calls /api/v1/courses/", async () => {
    const { client, getCapturedPath } = makeApiStub([]);
    await createCoursesApi(client).fetchCourses();
    expect(getCapturedPath()).toBe("/api/v1/courses/");
  });
});
