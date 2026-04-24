// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { CourseLessonDetail } from "../api";
import { LessonCard } from "./lesson-card";

interface LessonListProps {
  lessons: CourseLessonDetail[];
}

export function LessonList({ lessons }: LessonListProps) {
  return (
    <ol className="space-y-4">
      {lessons.map((entry) => (
        <li key={entry.lesson.uuid}>
          <LessonCard lesson={entry} />
        </li>
      ))}
    </ol>
  );
}
