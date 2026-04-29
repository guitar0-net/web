// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";

import { LessonVideo } from "./lesson-video";

it("renders an iframe with the lesson video_url as src", () => {
  const url = `https://www.youtube.com/embed/${Math.random().toString(36).slice(2)}`;
  render(<LessonVideo videoUrl={url} />);
  expect(screen.getByTitle("Lesson video")).toHaveAttribute("src", url);
});
