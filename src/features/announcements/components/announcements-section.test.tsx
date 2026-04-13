// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { announcementsApi } from "../api";
import { AnnouncementsSection } from "./announcements-section";

vi.mock("../api", () => ({
  announcementsApi: { fetchAnnouncements: vi.fn() },
}));

it("renders nothing when the API returns an empty list", async () => {
  vi.mocked(announcementsApi.fetchAnnouncements).mockResolvedValueOnce({
    count: 0,
    results: [],
  });
  const { container } = render(await AnnouncementsSection());
  expect(container.querySelectorAll('[data-slot="card"]').length).toBe(0);
});

it("renders announcement cards from API data", async () => {
  const results = Array.from({ length: 3 }, (_, i) => ({
    uuid: crypto.randomUUID(),
    title: `Анонс-${i}-${Math.random().toString(36).slice(2)}`,
    slug: `anons-${i}`,
  }));
  vi.mocked(announcementsApi.fetchAnnouncements).mockResolvedValueOnce({
    count: results.length,
    results,
  });
  render(await AnnouncementsSection());
  expect(screen.getAllByRole("heading").length).toBe(results.length + 2);
});
