// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { coursesApi } from "@/features/courses";

import { MainMenu } from "./main-menu";

vi.mock("@/features/courses", () => ({
  coursesApi: { fetchCourses: vi.fn() },
}));

it("renders course titles in a dropdown when the API succeeds", async () => {
  const title = `Гитара-${Math.random().toString(36).slice(2)}`;
  vi.mocked(coursesApi.fetchCourses).mockResolvedValueOnce([
    { uuid: crypto.randomUUID(), title, lessons_count: Math.floor(Math.random() * 20) },
  ]);
  render(await MainMenu());
  await userEvent.click(screen.getByRole("button", { name: "Курсы" }));
  expect(screen.getByRole("link", { name: title })).toBeInTheDocument();
});

it("renders course link pointing to /course/:uuid", async () => {
  const uuid = crypto.randomUUID();
  const title = `Занятие-${Math.random().toString(36).slice(2)}`;
  vi.mocked(coursesApi.fetchCourses).mockResolvedValueOnce([
    { uuid, title, lessons_count: Math.floor(Math.random() * 10) },
  ]);
  render(await MainMenu());
  await userEvent.click(screen.getByRole("button", { name: "Курсы" }));
  expect(screen.getByRole("link", { name: title })).toHaveAttribute(
    "href",
    `/course/${uuid}`,
  );
});

it("renders a plain link to /courses when the API fails", async () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.mocked(coursesApi.fetchCourses).mockRejectedValueOnce(new Error());
  render(await MainMenu());
  expect(screen.getByRole("link", { name: "Курсы" })).toHaveAttribute(
    "href",
    "/courses",
  );
});

it("renders a plain link to /courses when the courses list is empty", async () => {
  vi.mocked(coursesApi.fetchCourses).mockResolvedValueOnce([]);
  render(await MainMenu());
  expect(screen.getByRole("link", { name: "Курсы" })).toHaveAttribute(
    "href",
    "/courses",
  );
});

it("renders a link to the chords page", async () => {
  vi.mocked(coursesApi.fetchCourses).mockResolvedValueOnce([]);
  render(await MainMenu());
  expect(screen.getByRole("link", { name: "Аккорды" })).toHaveAttribute(
    "href",
    "/chords",
  );
});
