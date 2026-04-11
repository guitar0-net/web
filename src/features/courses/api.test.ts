// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { NotFoundError } from "@/lib/api";
import { buildApiClient } from "@/lib/api/client";
import { withServer } from "@/test/helpers/server";
import type { paths } from "@/types/api";

import type { CoursesList } from "./api";

function makeCoursesApi(baseUrl: string) {
  const client = buildApiClient<paths>(baseUrl);
  return {
    fetchCourses: async (): Promise<CoursesList> =>
      client.get("/api/v1/courses/", { cache: "no-store" }),
  };
}

it("fetchCourses throws NotFoundError on 404", async () => {
  await withServer(
    (_, res) => {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ detail: "not found" }));
    },
    async (url) => {
      await expect(makeCoursesApi(url).fetchCourses()).rejects.toBeInstanceOf(
        NotFoundError,
      );
    },
  );
});

it("fetchCourses returns courses list on 200", async () => {
  const body: CoursesList = [
    {
      uuid: "c9f1e2d3-4a5b-6c7d-8e9f-0a1b2c3d4e5f",
      title: "Основы гитары",
      lessons_count: 7,
    },
  ];
  await withServer(
    (_, res) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(body));
    },
    async (url) => {
      expect(await makeCoursesApi(url).fetchCourses()).toEqual(body);
    },
  );
});
