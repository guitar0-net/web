// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";

import type { CourseDetail } from "../api";
import { CourseHeader } from "./course-header";

function makeCourse(overrides: Partial<CourseDetail> = {}): CourseDetail {
  return {
    uuid: crypto.randomUUID(),
    title: `Курс-${Math.random().toString(36).slice(2)}`,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
    lessons: [],
    ...overrides,
  };
}

it("renders the course title", () => {
  const course = makeCourse();
  render(<CourseHeader course={course} />);
  expect(screen.getByRole("heading", { name: course.title })).toBeInTheDocument();
});

it("renders the description when provided", () => {
  const description = `Описание-${Math.random().toString(36).slice(2)}`;
  const course = makeCourse({ description });
  render(<CourseHeader course={course} />);
  expect(screen.getByText(description)).toBeInTheDocument();
});

it("does not render description when absent", () => {
  const course = makeCourse({ description: undefined });
  render(<CourseHeader course={course} />);
  expect(screen.queryByTestId("course-description")).not.toBeInTheDocument();
});
