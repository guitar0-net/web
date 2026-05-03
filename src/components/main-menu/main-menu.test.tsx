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
    expect(screen.getByRole("link", { name: new RegExp(title) })).toBeInTheDocument();
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
    expect(screen.getByRole("link", { name: new RegExp(title) })).toHaveAttribute(
      "href",
      `/courses/${uuid}`,
    );
  });

  it("renders a course description when provided", async () => {
    const description = `Описание-${Math.random().toString(36).slice(2)}`;
    render(
      <MainMenu
        courses={[
          { uuid: crypto.randomUUID(), title: "Курс", description, lessons_count: 0 },
        ]}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Курсы" }));
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("does not render description block when description is absent", async () => {
    const title = `Курс-${Math.random().toString(36).slice(2)}`;
    render(
      <MainMenu courses={[{ uuid: crypto.randomUUID(), title, lessons_count: 3 }]} />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Курсы" }));
    expect(screen.queryByRole("paragraph")).not.toBeInTheDocument();
  });

  it("renders lessons count number in the counter", async () => {
    const count = Math.floor(Math.random() * 50) + 1;
    render(
      <MainMenu
        courses={[{ uuid: crypto.randomUUID(), title: "Курс", lessons_count: count }]}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Курсы" }));
    expect(screen.getByText(String(count))).toBeInTheDocument();
  });

  it("renders the pluralized lesson word in the counter", async () => {
    render(
      <MainMenu
        courses={[{ uuid: crypto.randomUUID(), title: "Курс", lessons_count: 21 }]}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Курсы" }));
    expect(screen.getByText("урок")).toBeInTheDocument();
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
