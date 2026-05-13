// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/* v8 ignore file */

import { CourseCardSkeleton } from "./course-card-skeleton";

export function CoursesListSkeleton() {
  return (
    <ul className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <li key={i}>
          <CourseCardSkeleton />
        </li>
      ))}
    </ul>
  );
}
