// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { MainMenu } from "./main-menu";

describe("MainMenu", () => {
  it("renders a course title as a link after opening the dropdown", async () => {
    const title = `Курс-${Math.random().toString(36).slice(2)}`;
    render(
      <MainMenu courses={[{ uuid: crypto.randomUUID(), title, lessons_count: 0 }]} />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Курсы" }));
    expect(screen.getByRole("link", { name: title })).toBeInTheDocument();
  });

  it("renders a course link pointing to the course uuid path", async () => {
    const uuid = crypto.randomUUID();
    const title = `Занятие-${Math.random().toString(36).slice(2)}`;
    render(
      <MainMenu
        courses={[{ uuid, title, lessons_count: Math.floor(Math.random() * 10) }]}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Курсы" }));
    expect(screen.getByRole("link", { name: title })).toHaveAttribute(
      "href",
      `/course/${uuid}`,
    );
  });

  it("renders a link to the chords page", () => {
    render(<MainMenu courses={[]} />);
    expect(screen.getByRole("link", { name: "Аккорды" })).toHaveAttribute(
      "href",
      "/chords",
    );
  });

  it("renders an unavailability message in the courses dropdown when courses is null", async () => {
    render(<MainMenu courses={null} />);
    await userEvent.click(screen.getByRole("button", { name: "Курсы" }));
    expect(screen.getByText("Сервер недоступен")).toBeInTheDocument();
  });
});
