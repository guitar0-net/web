// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";

import { Breadcrumb } from "./breadcrumb";

it("renders a navigation landmark with breadcrumb label", () => {
  render(<Breadcrumb items={[{ title: "Страница" }]} />);
  expect(screen.getByRole("navigation", { name: "breadcrumb" })).toBeInTheDocument();
});

it("renders the last item as current page", () => {
  const title = `Страница-${Math.random().toString(36).slice(2)}`;
  render(<Breadcrumb items={[{ title }]} />);
  expect(screen.getByText(title)).toHaveAttribute("aria-current", "page");
});

it("renders intermediate items with href as links", () => {
  const sectionTitle = `Раздел-${Math.random().toString(36).slice(2)}`;
  const href = `/section/${Math.random().toString(36).slice(2)}`;
  render(
    <Breadcrumb items={[{ title: sectionTitle, href }, { title: "Финальная" }]} />,
  );
  expect(screen.getByRole("link", { name: sectionTitle })).toHaveAttribute(
    "href",
    href,
  );
});

it("renders last item as current page even when href is provided", () => {
  const title = `Страница-${Math.random().toString(36).slice(2)}`;
  render(<Breadcrumb items={[{ title, href: "/some-href" }]} />);
  expect(screen.getByText(title)).toHaveAttribute("aria-current", "page");
});

it("does not render intermediate item as current page", () => {
  const sectionTitle = `Раздел-${Math.random().toString(36).slice(2)}`;
  render(
    <Breadcrumb
      items={[{ title: sectionTitle, href: "/section" }, { title: "Финальная" }]}
    />,
  );
  expect(screen.getByRole("link", { name: sectionTitle })).not.toHaveAttribute(
    "aria-current",
  );
});
