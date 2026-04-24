// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { NotFoundError } from "@/lib/api";
import { buildApiClient } from "@/lib/api/client";
import { withServer } from "@/test/helpers/server";
import type { paths } from "@/types/api";

import type { CourseDetail, CoursesList, PaginatedCoursesList } from "./api";

function makeCoursesApi(baseUrl: string) {
  const client = buildApiClient<paths>(baseUrl);
  return {
    fetchCourses: async (params?: {
      limit?: number;
      offset?: number;
    }): Promise<PaginatedCoursesList> =>
      client.get("/api/v1/courses/", {
        next: { revalidate: 3600 },
        params: { query: params },
      }),
    fetchCourse: async (uuid: string): Promise<CourseDetail> =>
      client.get("/api/v1/courses/{uuid}/", { params: { path: { uuid } } }),
  };
}

it("fetchCourse throws NotFoundError on 404", async () => {
  await withServer(
    (_, res) => {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ detail: "not found" }));
    },
    async (url) => {
      await expect(
        makeCoursesApi(url).fetchCourse("nonexistent-uuid"),
      ).rejects.toBeInstanceOf(NotFoundError);
    },
  );
});

it("fetchCourse returns CourseDetail on 200", async () => {
  const body: CourseDetail = {
    uuid: "d4e5f6a7-b8c9-0d1e-2f3a-4b5c6d7e8f9a",
    title: "Джазовая гитара",
    description: "Основы джазовой импровизации",
    created_at: "2026-01-10T08:00:00Z",
    updated_at: "2026-02-20T12:00:00Z",
    lessons: [],
  };
  await withServer(
    (_, res) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(body));
    },
    async (url) => {
      expect(await makeCoursesApi(url).fetchCourse(body.uuid)).toEqual(body);
    },
  );
});

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

it("fetchCourses returns paginated list on 200", async () => {
  const items: CoursesList = [
    {
      uuid: "c9f1e2d3-4a5b-6c7d-8e9f-0a1b2c3d4e5f",
      title: "Основы гитары",
      description: "",
      lessons_count: 7,
    },
  ];
  const body: PaginatedCoursesList = { count: items.length, results: items };
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
