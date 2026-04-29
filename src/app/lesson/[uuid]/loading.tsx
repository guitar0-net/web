// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/* v8 ignore file */

import { LessonHeaderSkeleton } from "@/features/lessons/components/lesson-header-skeleton";
import { LessonVideoSkeleton } from "@/features/lessons/components/lesson-video-skeleton";

export default function LessonLoading() {
  return (
    <>
      <LessonHeaderSkeleton />
      <LessonVideoSkeleton />
    </>
  );
}
