// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";

import { MainMenuInline } from "./main-menu-inline";

it("renders a course title as a link", () => {
  const title = `Курс-${Math.random().toString(36).slice(2)}`;
  render(
    <MainMenuInline
      courses={[{ uuid: crypto.randomUUID(), title, lessons_count: 0 }]}
    />,
  );
  expect(screen.getByRole("link", { name: title })).toBeInTheDocument();
});

it("renders a course link pointing to the course uuid path", () => {
  const uuid = crypto.randomUUID();
  const title = `Занятие-${Math.random().toString(36).slice(2)}`;
  render(<MainMenuInline courses={[{ uuid, title, lessons_count: 0 }]} />);
  expect(screen.getByRole("link", { name: title })).toHaveAttribute(
    "href",
    `/courses/${uuid}`,
  );
});

it("renders all courses when multiple are provided", () => {
  const courses = Array.from({ length: 3 }, () => ({
    uuid: crypto.randomUUID(),
    title: `Курс-${Math.random().toString(36).slice(2)}`,
    lessons_count: 0,
  }));
  render(<MainMenuInline courses={courses} />);
  expect(
    screen
      .getAllByRole("link")
      .filter((l) => l.getAttribute("href")?.startsWith("/courses")),
  ).toHaveLength(3);
});

it("renders no course links when courses is null", () => {
  render(<MainMenuInline courses={null} />);
  expect(screen.queryByRole("link", { name: /Курс/ })).not.toBeInTheDocument();
});

it("renders a link to the chords page", () => {
  render(<MainMenuInline courses={null} />);
  expect(screen.getByRole("link", { name: "Аккорды" })).toHaveAttribute(
    "href",
    "/chords",
  );
});
