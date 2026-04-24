// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/* v8 ignore file */

import { Skeleton } from "@/components/ui/skeleton";

export function CourseHeaderSkeleton() {
  return (
    <header className="bg-accent border-b py-18">
      <div className="container mx-auto px-2">
        <div className="mb-4 flex items-center gap-2">
          <div className="border-foreground/20 w-10 border-t" />
          <Skeleton className="bg-foreground/4 h-4 w-8" />
        </div>
        <Skeleton className="bg-foreground/4 mb-8 h-14 w-2/3 md:h-16" />
        <Skeleton className="bg-foreground/4 h-6 w-full" />
        <Skeleton className="bg-foreground/4 mt-2 h-6 w-4/5" />
      </div>
    </header>
  );
}
