// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/* v8 ignore file */

import type { Metadata } from "next";

import { coursesApi, CoursesList } from "@/features/courses";

export function generateMetadata(): Metadata {
  return { title: "Курсы | Гитара с нуля" };
}

export default async function CoursesPage() {
  const data = await coursesApi.fetchCourses();
  return (
    <section>
      <div className="bg-accent border-b py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-medium">Курсы</h1>
        </div>
      </div>
      <main className="container mx-auto px-4 py-8">
        <CoursesList courses={data.results} />
      </main>
    </section>
  );
}
