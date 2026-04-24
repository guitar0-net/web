// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/* v8 ignore file */

import { CourseHeaderSkeleton } from "@/features/courses/components/course-header-skeleton";
import { LessonCardSkeleton } from "@/features/courses/components/lesson-card-skeleton";

export default function CourseLoading() {
  return (
    <>
      <CourseHeaderSkeleton />
      <main className="container mx-auto px-4 py-8">
        <ol className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i}>
              <LessonCardSkeleton />
            </li>
          ))}
        </ol>
      </main>
    </>
  );
}
