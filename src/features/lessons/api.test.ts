// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { NotFoundError } from "@/lib/api";
import { buildApiClient } from "@/lib/api/client";
import { withServer } from "@/test/helpers/server";
import type { paths } from "@/types/api";

import type { LessonDetail } from "./api";

function makeLessonsApi(baseUrl: string) {
  const client = buildApiClient<paths>(baseUrl);
  return {
    fetchLesson: async (uuid: string): Promise<LessonDetail> =>
      client.get("/api/v1/lessons/{uuid}/", { params: { path: { uuid } } }),
  };
}

it("fetchLesson throws NotFoundError on 404", async () => {
  await withServer(
    (_, res) => {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ detail: "not found" }));
    },
    async (url) => {
      await expect(
        makeLessonsApi(url).fetchLesson("nonexistent-uuid"),
      ).rejects.toBeInstanceOf(NotFoundError);
    },
  );
});

it("fetchLesson returns LessonDetail on 200", async () => {
  const body: LessonDetail = {
    uuid: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    title: "Барре на 5-м ладу",
    video_url: "https://example.com/video",
    songs: [],
    addition_lessons: [],
    course: null,
  };
  await withServer(
    (_, res) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(body));
    },
    async (url) => {
      expect(await makeLessonsApi(url).fetchLesson(body.uuid)).toEqual(body);
    },
  );
});
