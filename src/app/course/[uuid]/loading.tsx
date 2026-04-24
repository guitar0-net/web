// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/* v8 ignore file */

import { Skeleton } from "@/components/ui/skeleton";
import { CourseHeaderSkeleton } from "@/features/courses/components/course-header-skeleton";

export default function CourseLoading() {
  return (
    <>
      <CourseHeaderSkeleton />
      <main className="container mx-auto px-2 py-12">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 border-b py-4">
            <Skeleton className="h-5 w-6 shrink-0" />
            <Skeleton className="h-5 w-3/4" />
          </div>
        ))}
      </main>
    </>
  );
}
