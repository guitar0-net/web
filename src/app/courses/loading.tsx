// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/* v8 ignore file */

import { Skeleton } from "@/components/ui/skeleton";
import { CoursesListSkeleton } from "@/features/courses/components/courses-list-skeleton";

export default function CoursesLoading() {
  return (
    <section>
      <div className="bg-accent border-b py-8">
        <div className="container mx-auto px-4">
          <Skeleton className="h-12 w-48" />
        </div>
      </div>
      <main className="container mx-auto px-4 py-8">
        <CoursesListSkeleton />
      </main>
    </section>
  );
}
