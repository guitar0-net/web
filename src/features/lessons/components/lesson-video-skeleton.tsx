// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/* v8 ignore file */

import { Skeleton } from "@/components/ui/skeleton";

export function LessonVideoSkeleton() {
  return (
    <div className="container mx-auto aspect-video px-2">
      <Skeleton className="h-full w-full" />
    </div>
  );
}
