// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";

import { Footer, START_YEAR } from "./footer";

vi.mock("next/cache", () => ({ cacheLife: vi.fn() }));

describe("Footer", () => {
  it("shows only the start year when the current year equals the start year", async () => {
    vi.useFakeTimers();
    const randomMonth = Math.floor(Math.random() * 12);
    vi.setSystemTime(new Date(START_YEAR, randomMonth, 1));
    try {
      render(await Footer());
      expect(
        screen.getByText(new RegExp(`© ${START_YEAR} Гитара с нуля`, "i")),
      ).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

  it("shows only the start year when the current year is before the start year", async () => {
    vi.useFakeTimers();
    const randomYear = Math.floor(Math.random() * 10) + 2000;
    vi.setSystemTime(new Date(randomYear, 0, 1));
    try {
      render(await Footer());
      expect(
        screen.getByText(new RegExp(`© ${START_YEAR} Гитара с нуля`, "i")),
      ).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

  it("shows a year range when the current year is after the start year", async () => {
    vi.useFakeTimers();
    const randomYear = Math.floor(Math.random() * 10) + 2019;
    vi.setSystemTime(new Date(randomYear, 0, 1));
    try {
      render(await Footer());
      expect(
        screen.getByText(
          new RegExp(`© ${START_YEAR}–${randomYear} Гитара с нуля`, "i"),
        ),
      ).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });
});
