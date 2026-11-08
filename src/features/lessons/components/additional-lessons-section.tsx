// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { LessonCard } from "@/components/lesson-card";
import type { Lesson } from "@/types/lesson";

interface AdditionalLessonsSectionProps {
  lessons: Lesson[];
}

export function AdditionalLessonsSection({ lessons }: AdditionalLessonsSectionProps) {
  if (lessons.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="mb-6 text-2xl font-semibold">Дополнительные уроки</h2>
      <ul className="grid gap-4 md:grid-cols-2">
        {lessons.map((lesson) => (
          <li key={lesson.uuid}>
            <LessonCard lesson={lesson} href={`/lessons/${lesson.uuid}`} />
          </li>
        ))}
      </ul>
    </section>
  );
}
