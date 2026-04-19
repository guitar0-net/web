// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { coursesApi } from "@/features/courses";

import { MainMenuServer } from "./main-menu-server";

vi.mock("next/cache", () => ({ cacheLife: vi.fn() }));
vi.mock("@/features/courses", () => ({
  coursesApi: { fetchCourses: vi.fn() },
}));

describe("MainMenuServer", () => {
  it("renders course titles fetched from the API in the dropdown", async () => {
    const title = `Гитара-${Math.random().toString(36).slice(2)}`;
    vi.mocked(coursesApi.fetchCourses).mockResolvedValueOnce({
      count: 1,
      results: [
        {
          uuid: crypto.randomUUID(),
          title,
          lessons_count: Math.floor(Math.random() * 20),
        },
      ],
    });
    render(await MainMenuServer());
    await userEvent.click(screen.getByRole("button", { name: "Курсы" }));
    expect(screen.getByRole("link", { name: title })).toBeInTheDocument();
  });

  it("renders a server unavailability message in the courses dropdown when the API fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.mocked(coursesApi.fetchCourses).mockRejectedValueOnce(new Error());
    render(await MainMenuServer());
    await userEvent.click(screen.getByRole("button", { name: "Курсы" }));
    expect(screen.getByText("Сервер недоступен")).toBeInTheDocument();
  });
});
