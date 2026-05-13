// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { CoursesListItem } from "../api";
import { CourseCard } from "./course-card";

interface CoursesListProps {
  courses: CoursesListItem[];
}

export function CoursesList({ courses }: CoursesListProps) {
  if (courses.length === 0) {
    return <p className="text-muted-foreground">Курсы пока не добавлены.</p>;
  }
  return (
    <ul className="space-y-4">
      {courses.map((course) => (
        <li key={course.uuid}>
          <CourseCard course={course} />
        </li>
      ))}
    </ul>
  );
}
