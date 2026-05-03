// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/* v8 ignore file */

import Link from "next/link";

import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { pluralizeRu } from "@/lib/utils";

import { type CourseMenuItem } from "./main-menu";

type Props = {
  course: CourseMenuItem;
};

export function CourseMenuItemLink({ course }: Props) {
  return (
    <NavigationMenuLink asChild>
      <Link
        href={`/courses/${course.uuid}`}
        className="hover:bg-accent flex items-center gap-3 rounded-md p-3"
      >
        <div className="min-w-0 flex-1">
          <span className="text-primary font-semibold">{course.title}</span>
          {course.description && (
            <p className="text-muted-foreground text-[13px]">{course.description}</p>
          )}
        </div>
        <div className="bg-primary/10 text-primary flex size-15 shrink-0 flex-col items-center justify-center rounded-full">
          <span className="text-xl leading-none font-bold">{course.lessons_count}</span>
          <span className="text-xs">
            {pluralizeRu(course.lessons_count, "урок", "урока", "уроков")}
          </span>
        </div>
      </Link>
    </NavigationMenuLink>
  );
}
