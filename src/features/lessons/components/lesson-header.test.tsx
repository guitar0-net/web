// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";

import { LessonHeader } from "./lesson-header";

it("renders the lesson title as a heading", () => {
  const title = `Урок-${Math.random().toString(36).slice(2)}`;
  render(<LessonHeader title={title} />);
  expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
});

it("renders the description when provided", () => {
  const description = `Описание-${Math.random().toString(36).slice(2)}`;
  render(<LessonHeader title="Урок" description={description} />);
  expect(screen.getByText(description)).toBeInTheDocument();
});

it("does not render description element when absent", () => {
  render(<LessonHeader title="Урок" />);
  expect(screen.queryByTestId("lesson-description")).not.toBeInTheDocument();
});
