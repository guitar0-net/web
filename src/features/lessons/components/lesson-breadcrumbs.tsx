// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Breadcrumb } from "@/components/breadcrumb";

interface LessonBreadcrumbsProps {
  lessonTitle: string;
  courseTitle?: string;
  courseUuid?: string;
}

export function LessonBreadcrumbs({
  lessonTitle,
  courseTitle,
  courseUuid,
}: LessonBreadcrumbsProps) {
  const items = [];
  if (courseTitle && courseUuid) {
    items.push({ title: courseTitle, href: `/courses/${courseUuid}` });
  }
  items.push({ title: lessonTitle });

  return (
    <div className="bg-accent pt-4">
      <div className="container mx-auto p-2">
        <Breadcrumb items={items} />
      </div>
    </div>
  );
}
