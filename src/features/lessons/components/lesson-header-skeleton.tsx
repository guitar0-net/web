// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/* v8 ignore file */

import { Skeleton } from "@/components/ui/skeleton";

export function LessonHeaderSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="mb-4 h-9 w-2/3" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="mt-2 h-6 w-4/5" />
    </div>
  );
}
