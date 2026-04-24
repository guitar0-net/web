// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";

import type { CourseLessonDetail } from "../api";
import { LessonList } from "./lesson-list";

function makeLessonEntry(order: number): CourseLessonDetail {
  return {
    order,
    lesson: {
      uuid: crypto.randomUUID(),
      title: `Урок-${Math.random().toString(36).slice(2)}`,
      video_url: "https://example.com/video",
      songs: [],
    },
  };
}

it("renders a card for each lesson", () => {
  const count = Math.floor(Math.random() * 4) + 2;
  const lessons = Array.from({ length: count }, (_, i) => makeLessonEntry(i + 1));
  render(<LessonList lessons={lessons} />);
  expect(screen.getAllByRole("listitem")).toHaveLength(count);
});

it("preserves the order in which lessons are provided", () => {
  const lessons = [makeLessonEntry(3), makeLessonEntry(1), makeLessonEntry(2)];
  render(<LessonList lessons={lessons} />);
  const items = screen.getAllByRole("listitem");
  expect(items[0]).toHaveTextContent(lessons[0].lesson.title);
  expect(items[1]).toHaveTextContent(lessons[1].lesson.title);
  expect(items[2]).toHaveTextContent(lessons[2].lesson.title);
});
