// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/* eslint-disable react-hooks/rules-of-hooks */

import { test as base } from "@playwright/test";

import { API_BASE_URL } from "./constants";
import type { components } from "../src/types/api";

type AnnouncementsListItem = components["schemas"]["AnnouncementsList"];
type ChordsListItem = components["schemas"]["ChordsList"];
type CourseDetail = components["schemas"]["CourseDetail"];

type Fixtures = {
  firstAnnouncement: AnnouncementsListItem;
  firstCourse: CourseDetail;
  firstChord: ChordsListItem;
};

// Fetches the first available course (with its lessons) from the staging API.
// Used by tests that need real UUIDs to navigate to course/lesson pages.
export const test = base.extend<Fixtures>({
  firstCourse: async ({ request }, use) => {
    const listRes = await request.get(`${API_BASE_URL}/api/v1/courses/`);
    const { results } = (await listRes.json()) as { results: Array<{ uuid: string }> };

    if (!results.length) {
      throw new Error("Staging has no courses");
    }

    const detailRes = await request.get(
      `${API_BASE_URL}/api/v1/courses/${results[0].uuid}/`,
    );
    await use((await detailRes.json()) as CourseDetail);
  },

  firstAnnouncement: async ({ request }, use) => {
    const res = await request.get(`${API_BASE_URL}/api/v1/announcements/?limit=1`);
    const { results } = (await res.json()) as { results: AnnouncementsListItem[] };

    if (!results.length) {
      throw new Error("Staging has no announcements");
    }

    await use(results[0]);
  },

  firstChord: async ({ request }, use) => {
    const res = await request.get(`${API_BASE_URL}/api/v1/chords/?limit=1`);
    const { results } = (await res.json()) as { results: ChordsListItem[] };

    if (!results.length) {
      throw new Error("Staging has no chords");
    }

    await use(results[0]);
  },
});

export { expect } from "@playwright/test";
