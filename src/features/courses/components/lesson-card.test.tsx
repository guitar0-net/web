// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";

import type { CourseLessonDetail } from "../api";
import { LessonCard } from "./lesson-card";

function makeLessonEntry(
  overrides: {
    order?: number;
    lesson?: Partial<CourseLessonDetail["lesson"]>;
  } = {},
): CourseLessonDetail {
  return {
    order: overrides.order ?? Math.floor(Math.random() * 50) + 1,
    lesson: {
      uuid: crypto.randomUUID(),
      title: `Урок-${Math.random().toString(36).slice(2)}`,
      video_url: "https://example.com/video",
      songs: [],
      ...overrides.lesson,
    },
  };
}

it("renders the order number", () => {
  const order = Math.floor(Math.random() * 50) + 1;
  const entry = makeLessonEntry({ order });
  render(<LessonCard lesson={entry} courseId={crypto.randomUUID()} />);
  expect(screen.getByText(String(order))).toBeInTheDocument();
});

it("renders a link to the lesson page with the lesson title", () => {
  const courseId = crypto.randomUUID();
  const entry = makeLessonEntry();
  render(<LessonCard lesson={entry} courseId={courseId} />);
  expect(screen.getByRole("link", { name: entry.lesson.title })).toHaveAttribute(
    "href",
    `/lesson/${entry.lesson.uuid}?course=${courseId}`,
  );
});

it("renders description when present", () => {
  const description = `Описание-${Math.random().toString(36).slice(2)}`;
  const entry = makeLessonEntry({ lesson: { description } });
  render(<LessonCard lesson={entry} courseId={crypto.randomUUID()} />);
  expect(screen.getByText(description)).toBeInTheDocument();
});

it("does not render description element when absent", () => {
  const entry = makeLessonEntry({ lesson: { description: undefined } });
  render(<LessonCard lesson={entry} courseId={crypto.randomUUID()} />);
  expect(screen.queryByTestId("lesson-description")).not.toBeInTheDocument();
});

it("renders each song title as a badge", () => {
  const songs = [
    {
      id: Math.floor(Math.random() * 1000),
      title: `Песня-${Math.random().toString(36).slice(2)}`,
    },
    {
      id: Math.floor(Math.random() * 1000),
      title: `Песня-${Math.random().toString(36).slice(2)}`,
    },
  ];
  const entry = makeLessonEntry({ lesson: { songs } });
  render(<LessonCard lesson={entry} courseId={crypto.randomUUID()} />);
  for (const song of songs) {
    expect(screen.getByText(song.title)).toBeInTheDocument();
  }
});
