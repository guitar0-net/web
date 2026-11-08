// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";

import type { Lesson } from "@/types/lesson";

import { LessonCard } from "./lesson-card";

function makeLesson(overrides: Partial<Lesson> = {}): Lesson {
  return {
    uuid: crypto.randomUUID(),
    title: `Урок-${Math.random().toString(36).slice(2)}`,
    video_url: "https://example.com/video",
    songs: [],
    ...overrides,
  };
}

function randomHref(): string {
  return `/lessons/${crypto.randomUUID()}?ключ=${Math.random().toString(36).slice(2)}`;
}

it("renders the order number when provided", () => {
  const order = Math.floor(Math.random() * 50) + 1;
  render(<LessonCard lesson={makeLesson()} href={randomHref()} order={order} />);
  expect(screen.getByText(String(order))).toBeInTheDocument();
});

it("does not render an order number when omitted", () => {
  const { container } = render(
    <LessonCard lesson={makeLesson({ title: "Урок" })} href={randomHref()} />,
  );
  expect(container).not.toHaveTextContent(/\d/);
});

it("renders a link with the lesson title pointing to the given href", () => {
  const lesson = makeLesson();
  const href = `/lessons/${lesson.uuid}?course=${crypto.randomUUID()}`;
  render(<LessonCard lesson={lesson} href={href} />);
  expect(screen.getByRole("link", { name: lesson.title })).toHaveAttribute(
    "href",
    href,
  );
});

it("renders description when present", () => {
  const description = `Описание-${Math.random().toString(36).slice(2)}`;
  render(<LessonCard lesson={makeLesson({ description })} href={randomHref()} />);
  expect(screen.getByText(description)).toBeInTheDocument();
});

it("does not render description element when absent", () => {
  render(
    <LessonCard lesson={makeLesson({ description: undefined })} href={randomHref()} />,
  );
  expect(screen.queryByTestId("lesson-description")).not.toBeInTheDocument();
});

it("renders formatted duration when present", () => {
  render(<LessonCard lesson={makeLesson({ duration: 125 })} href={randomHref()} />);
  expect(screen.getByText("2:05")).toBeInTheDocument();
});

it("does not render duration when absent", () => {
  render(
    <LessonCard lesson={makeLesson({ duration: undefined })} href={randomHref()} />,
  );
  expect(screen.queryByText(/^\d+:\d{2}/)).not.toBeInTheDocument();
});

it("does not render duration when zero", () => {
  render(<LessonCard lesson={makeLesson({ duration: 0 })} href={randomHref()} />);
  expect(screen.queryByText("0:00")).not.toBeInTheDocument();
});

it("renders each song title as a badge", () => {
  const songs = Array.from({ length: 2 }, () => ({
    uuid: crypto.randomUUID(),
    title: `Песня-${Math.random().toString(36).slice(2)}`,
  }));
  render(<LessonCard lesson={makeLesson({ songs })} href={randomHref()} />);
  expect(songs.map((song) => screen.getByText(song.title).textContent)).toEqual(
    songs.map((song) => song.title),
  );
});
