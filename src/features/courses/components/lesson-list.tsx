// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { LessonCard } from "@/components/lesson-card";

import type { CourseLessonDetail } from "../api";

interface LessonListProps {
  lessons: CourseLessonDetail[];
  courseId: string;
}

export function LessonList({ lessons, courseId }: LessonListProps) {
  return (
    <ol className="space-y-4">
      {lessons.map(({ order, lesson }) => (
        <li key={lesson.uuid}>
          <LessonCard
            lesson={lesson}
            order={order}
            href={`/lessons/${lesson.uuid}?course=${courseId}`}
          />
        </li>
      ))}
    </ol>
  );
}
