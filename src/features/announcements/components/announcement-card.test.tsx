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

it("renders product_version badge when product_version is provided", () => {
  const version = `v${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 100)}.0`;
  const announcement = {
    uuid: crypto.randomUUID(),
    title: `Анонс-${Math.random().toString(36).slice(2)}`,
    slug: "anons",
    product_version: version,
  };
  render(<AnnouncementCard announcement={announcement} />);
  expect(screen.getByText(version)).toBeInTheDocument();
});

it("does not render product_version badge when product_version is absent", () => {
  const announcement = {
    uuid: crypto.randomUUID(),
    title: `Анонс-${Math.random().toString(36).slice(2)}`,
    slug: "anons",
  };
  render(<AnnouncementCard announcement={announcement} />);
  expect(screen.queryByRole("mark")).not.toBeInTheDocument();
});
