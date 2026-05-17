// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/* v8 ignore file */

import type { MetadataRoute } from "next";

import { coursesApi } from "@/features/courses";
import { lessonsApi } from "@/features/lessons";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://guitar0.net";

const staticRoutes: MetadataRoute.Sitemap = [
  { url: siteUrl, priority: 1.0, changeFrequency: "weekly" },
  { url: `${siteUrl}/courses`, priority: 0.9, changeFrequency: "weekly" },
  { url: `${siteUrl}/chords`, priority: 0.8, changeFrequency: "monthly" },
  { url: `${siteUrl}/privacy-policy`, priority: 0.3, changeFrequency: "yearly" },
];

async function fetchAllCourseUrls(): Promise<MetadataRoute.Sitemap> {
  const { results } = await coursesApi.fetchCourses({ limit: 200 });
  return results.map((course) => ({
    url: `${siteUrl}/courses/${course.uuid}`,
    priority: 0.7,
    changeFrequency: "weekly" as const,
  }));
}

async function fetchAllLessonUrls(): Promise<MetadataRoute.Sitemap> {
  const { results } = await lessonsApi.fetchLessons({ limit: 200 });
  return results.map((lesson) => ({
    url: `${siteUrl}/lessons/${lesson.uuid}`,
    priority: 0.6,
    changeFrequency: "weekly" as const,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const [courseUrls, lessonUrls] = await Promise.all([
      fetchAllCourseUrls(),
      fetchAllLessonUrls(),
    ]);
    return [...staticRoutes, ...courseUrls, ...lessonUrls];
  } catch {
    return staticRoutes;
  }
}
