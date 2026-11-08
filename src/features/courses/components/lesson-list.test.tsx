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
  render(<LessonList lessons={lessons} courseId={crypto.randomUUID()} />);
  expect(screen.getAllByRole("listitem")).toHaveLength(count);
});

it("preserves the order in which lessons are provided", () => {
  const lessons = [makeLessonEntry(3), makeLessonEntry(1), makeLessonEntry(2)];
  render(<LessonList lessons={lessons} courseId={crypto.randomUUID()} />);
  const items = screen.getAllByRole("listitem");
  expect(items[0]).toHaveTextContent(lessons[0].lesson.title);
  expect(items[1]).toHaveTextContent(lessons[1].lesson.title);
  expect(items[2]).toHaveTextContent(lessons[2].lesson.title);
});

it("links each lesson to its page within the course context", () => {
  const courseId = crypto.randomUUID();
  const entry = makeLessonEntry(Math.floor(Math.random() * 50) + 1);
  render(<LessonList lessons={[entry]} courseId={courseId} />);
  expect(screen.getByRole("link", { name: entry.lesson.title })).toHaveAttribute(
    "href",
    `/lessons/${entry.lesson.uuid}?course=${courseId}`,
  );
});

it("shows the lesson order number", () => {
  const order = Math.floor(Math.random() * 50) + 1;
  render(
    <LessonList lessons={[makeLessonEntry(order)]} courseId={crypto.randomUUID()} />,
  );
  expect(screen.getByText(String(order))).toBeInTheDocument();
});
