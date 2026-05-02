// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";

import { SchemeImage } from "./scheme-image";

it("renders an img with the scheme image src", () => {
  const src = `https://example.com/${Math.random().toString(36).slice(2)}.png`;
  render(<SchemeImage scheme={{ id: 1, image: src }} size={3} />);
  const imgSrc = screen.getByRole("img").getAttribute("src") ?? "";
  expect(decodeURIComponent(imgSrc)).toContain(src);
});

it("renders inscription as caption when provided", () => {
  const inscription = `Схема-${Math.random().toString(36).slice(2)}`;
  render(
    <SchemeImage
      scheme={{ id: 1, image: "https://example.com/a.png", inscription }}
      size={3}
    />,
  );
  expect(screen.getByText(inscription)).toBeInTheDocument();
});

it("does not render caption when inscription is absent", () => {
  render(
    <SchemeImage scheme={{ id: 1, image: "https://example.com/a.png" }} size={3} />,
  );
  expect(screen.queryByRole("figure")).not.toBeInTheDocument();
});

it("applies scaled width attribute based on size and scheme width", () => {
  render(
    <SchemeImage
      scheme={{ id: 1, image: "https://example.com/a.png", width: 150 }}
      size={3}
    />,
  );
  expect(screen.getByRole("img")).toHaveAttribute("width", "150");
});
