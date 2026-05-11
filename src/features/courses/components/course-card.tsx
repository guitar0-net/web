// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { pluralizeRu } from "@/lib/utils";

import type { CoursesListItem } from "../api";

interface CourseCardProps {
  course: CoursesListItem;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.uuid}`} className="block">
      <Card className="transition-all hover:-translate-y-1 hover:shadow-lg">
        <CardContent className="flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-xl font-medium">{course.title}</p>
            {course.description && (
              <p
                data-testid="course-description"
                className="text-muted-foreground text-sm"
              >
                {course.description}
              </p>
            )}
          </div>
          <div className="bg-primary/10 text-primary flex size-15 shrink-0 flex-col items-center justify-center rounded-full">
            <span className="text-xl leading-none font-bold">
              {course.lessons_count}
            </span>
            <span className="text-xs">
              {pluralizeRu(course.lessons_count, "урок", "урока", "уроков")}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
