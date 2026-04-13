// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";

import { AnnouncementCard } from "./announcement-card";

it("renders the announcement title", () => {
  const title = `Анонс-${Math.random().toString(36).slice(2)}`;
  const announcement = {
    uuid: crypto.randomUUID(),
    title: title,
    slug: `anons`,
  };
  render(<AnnouncementCard announcement={announcement} />);
  expect(screen.getByText(title)).toBeInTheDocument();
});

it("renders the publication date when published_at is provided", () => {
  const announcement = {
    uuid: crypto.randomUUID(),
    title: `Анонс-${Math.random().toString(36).slice(2)}`,
    slug: "anons",
    published_at: "2026-03-15T12:00:00Z",
  };
  render(<AnnouncementCard announcement={announcement} />);
  expect(screen.getByRole("time")).toBeInTheDocument();
});
