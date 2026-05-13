// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";

import type { CoursesListItem } from "../api";
import { CourseCard } from "./course-card";

function makeCourse(overrides: Partial<CoursesListItem> = {}): CoursesListItem {
  return {
    uuid: crypto.randomUUID(),
    title: `Курс-${Math.random().toString(36).slice(2)}`,
    lessons_count: Math.floor(Math.random() * 20) + 1,
    ...overrides,
  };
}

it("renders a link to the course page", () => {
  const course = makeCourse();
  render(<CourseCard course={course} />);
  expect(screen.getByRole("link")).toHaveAttribute("href", `/courses/${course.uuid}`);
});

it("renders the course title", () => {
  const course = makeCourse();
  render(<CourseCard course={course} />);
  expect(screen.getByText(course.title)).toBeInTheDocument();
});

it("renders description when present", () => {
  const description = `Описание-${Math.random().toString(36).slice(2)}`;
  const course = makeCourse({ description });
  render(<CourseCard course={course} />);
  expect(screen.getByTestId("course-description")).toHaveTextContent(description);
});

it("does not render description when absent", () => {
  const course = makeCourse({ description: undefined });
  render(<CourseCard course={course} />);
  expect(screen.queryByTestId("course-description")).not.toBeInTheDocument();
});

it("renders lessons_count", () => {
  const count = Math.floor(Math.random() * 15) + 5;
  const course = makeCourse({ lessons_count: count });
  render(<CourseCard course={course} />);
  expect(screen.getByText(String(count))).toBeInTheDocument();
});

it("uses correct plural form for lessons_count", () => {
  const course = makeCourse({ lessons_count: 1 });
  render(<CourseCard course={course} />);
  expect(screen.getByText("урок")).toBeInTheDocument();
});
