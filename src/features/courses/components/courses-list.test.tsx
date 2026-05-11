// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";

import type { CoursesListItem } from "../api";
import { CoursesList } from "./courses-list";

function makeCourse(): CoursesListItem {
  return {
    uuid: crypto.randomUUID(),
    title: `Курс-${Math.random().toString(36).slice(2)}`,
    lessons_count: Math.floor(Math.random() * 20) + 1,
  };
}

it("renders a list item for each course", () => {
  const count = Math.floor(Math.random() * 4) + 2;
  const courses = Array.from({ length: count }, makeCourse);
  render(<CoursesList courses={courses} />);
  expect(screen.getAllByRole("listitem")).toHaveLength(count);
});

it("renders first course as first list item", () => {
  const courses = [makeCourse(), makeCourse(), makeCourse()];
  render(<CoursesList courses={courses} />);
  expect(screen.getAllByRole("listitem")[0]).toHaveTextContent(courses[0].title);
});

it("renders second course as second list item", () => {
  const courses = [makeCourse(), makeCourse(), makeCourse()];
  render(<CoursesList courses={courses} />);
  expect(screen.getAllByRole("listitem")[1]).toHaveTextContent(courses[1].title);
});

it("renders third course as third list item", () => {
  const courses = [makeCourse(), makeCourse(), makeCourse()];
  render(<CoursesList courses={courses} />);
  expect(screen.getAllByRole("listitem")[2]).toHaveTextContent(courses[2].title);
});

it("renders empty state when no courses are provided", () => {
  render(<CoursesList courses={[]} />);
  expect(screen.getByText("Курсы пока не добавлены.")).toBeInTheDocument();
});
