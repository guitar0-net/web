// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { AnnouncementCard } from "./announcement-card";

it("renders the announcement title", () => {
  const title = `Анонс-${Math.random().toString(36).slice(2)}`;
  const announcement = {
    uuid: crypto.randomUUID(),
    title,
    slug: "anons",
    content: "",
  };
  render(<AnnouncementCard announcement={announcement} />);
  expect(screen.getByText(title)).toBeInTheDocument();
});

it("renders the publication date when published_at is provided", () => {
  const announcement = {
    uuid: crypto.randomUUID(),
    title: `Анонс-${Math.random().toString(36).slice(2)}`,
    slug: "anons",
    content: "",
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
    content: "",
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
    content: "",
  };
  render(<AnnouncementCard announcement={announcement} />);
  expect(screen.queryByRole("mark")).not.toBeInTheDocument();
});

it("shows short content in full without ellipsis", () => {
  const content = `Короткий контент ${Math.random().toString(36).slice(2)}`;
  const announcement = {
    uuid: crypto.randomUUID(),
    title: `Анонс-${Math.random().toString(36).slice(2)}`,
    slug: "anons",
    content,
  };
  render(<AnnouncementCard announcement={announcement} />);
  expect(screen.getByText(content)).toBeInTheDocument();
});

it("truncates long content at the last paragraph boundary and appends ellipsis", () => {
  const firstParagraph = "а".repeat(100);
  const secondParagraph = "б".repeat(100);
  const announcement = {
    uuid: crypto.randomUUID(),
    title: `Анонс-${Math.random().toString(36).slice(2)}`,
    slug: "anons",
    content: `${firstParagraph}\n\n${secondParagraph}`,
  };
  render(<AnnouncementCard announcement={announcement} />);
  expect(screen.getByText(`${firstParagraph}...`)).toBeInTheDocument();
});

it("opens a dialog when the card is clicked", async () => {
  const user = userEvent.setup();
  const announcement = {
    uuid: crypto.randomUUID(),
    title: `Анонс-${Math.random().toString(36).slice(2)}`,
    slug: "anons",
    content: "д".repeat(200),
  };
  render(<AnnouncementCard announcement={announcement} />);
  await user.click(screen.getByText(announcement.title));
  expect(screen.getByRole("dialog")).toBeInTheDocument();
});

it("shows the full untruncated content in the dialog", async () => {
  const user = userEvent.setup();
  const fullContent = "е".repeat(200);
  const announcement = {
    uuid: crypto.randomUUID(),
    title: `Анонс-${Math.random().toString(36).slice(2)}`,
    slug: "anons",
    content: fullContent,
  };
  render(<AnnouncementCard announcement={announcement} />);
  await user.click(screen.getByText(announcement.title));
  expect(screen.getByRole("dialog")).toHaveTextContent(fullContent);
});
