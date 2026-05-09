// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/* v8 ignore file */

import { Skeleton } from "@/components/ui/skeleton";

export function ChordsSkeleton() {
  return (
    <section>
      <div className="bg-accent border-b py-8">
        <div className="container mx-auto">
          <h1 className="mb-4 text-5xl font-medium md:text-5xl">Аккорды</h1>
        </div>
      </div>
      <div className="container mx-auto mt-10">
        <div className="flex flex-wrap gap-4">
          {Array.from({ length: 16 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-44" />
          ))}
        </div>
      </div>
    </section>
  );
}
