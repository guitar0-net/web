// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { CourseDetail } from "../api";

interface CourseHeaderProps {
  course: CourseDetail;
}

export function CourseHeader({ course }: CourseHeaderProps) {
  return (
    <header className="bg-accent border-b py-18">
      <div className="container mx-auto px-2">
        <div className="mb-4 flex items-center gap-2">
          <div className="border-primary w-10 border-t"></div>
          <span className="text-primary text-sm">Курс</span>
        </div>
        <h1 className="mb-8 text-5xl font-medium md:text-6xl">{course.title}</h1>
        {course.description && (
          <p data-testid="course-description" className="text-muted-foreground text-xl">
            {course.description}
          </p>
        )}
      </div>
    </header>
  );
}
