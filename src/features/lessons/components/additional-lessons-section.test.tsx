// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";

import type { Lesson } from "@/types/lesson";

import { AdditionalLessonsSection } from "./additional-lessons-section";

function makeLesson(): Lesson {
  return {
    uuid: crypto.randomUUID(),
    title: `Урок-${Math.random().toString(36).slice(2)}`,
    video_url: "https://example.com/video",
    songs: [],
  };
}

it("renders nothing when there are no additional lessons", () => {
  const { container } = render(<AdditionalLessonsSection lessons={[]} />);
  expect(container.firstChild).toBeNull();
});

it("renders the section heading when lessons are present", () => {
  render(<AdditionalLessonsSection lessons={[makeLesson()]} />);
  expect(
    screen.getByRole("heading", { name: "Дополнительные уроки" }),
  ).toBeInTheDocument();
});

it("renders a card for each additional lesson", () => {
  const count = Math.floor(Math.random() * 4) + 2;
  const lessons = Array.from({ length: count }, makeLesson);
  render(<AdditionalLessonsSection lessons={lessons} />);
  expect(screen.getAllByRole("listitem")).toHaveLength(count);
});

it("links to the lesson page without course context", () => {
  const lesson = makeLesson();
  render(<AdditionalLessonsSection lessons={[lesson]} />);
  expect(screen.getByRole("link", { name: lesson.title })).toHaveAttribute(
    "href",
    `/lessons/${lesson.uuid}`,
  );
});
