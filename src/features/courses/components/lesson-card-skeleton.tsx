// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/* v8 ignore file */

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function LessonCardSkeleton() {
  return (
    <div className="flex items-start gap-4">
      <Card className="flex-1">
        <CardContent className="flex gap-4">
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-8 w-0.5" />
          </div>
          <div className="flex-1 space-y-2 py-1">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
