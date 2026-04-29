// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/* v8 ignore file */

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { coursesApi } from "@/features/courses";
import { CourseHeader } from "@/features/courses/components/course-header";
import { LessonList } from "@/features/courses/components/lesson-list";
import { NotFoundError } from "@/lib/api";

interface Props {
  params: Promise<{ uuid: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { uuid } = await params;
  try {
    const course = await coursesApi.fetchCourse(uuid);
    return { title: course.title };
  } catch (err) {
    if (err instanceof NotFoundError) return {};
    throw err;
  }
}

export default async function CoursePage({ params }: Props) {
  const { uuid } = await params;
  let course;
  try {
    course = await coursesApi.fetchCourse(uuid);
  } catch (err) {
    if (err instanceof NotFoundError) notFound();
    throw err;
  }
  return (
    <>
      <CourseHeader course={course} />
      <main className="container mx-auto px-4 py-8">
        <LessonList lessons={course.lessons} />
      </main>
    </>
  );
}
