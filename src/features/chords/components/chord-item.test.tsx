// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";

import { ChordItem } from "./chord-item";

it("renders the chord title as a label", () => {
  const title = `Аккорд-${Math.random().toString(36).slice(2)}`;
  render(<ChordItem title={title} svg={undefined} size={3} orientation="vertical" />);
  expect(screen.getByText(title)).toBeInTheDocument();
});

it("renders SVG content when svg is provided", () => {
  const { container } = render(
    <ChordItem
      title="Am"
      svg='<svg><circle cx="5" cy="5" r="3"/></svg>'
      size={3}
      orientation="vertical"
    />,
  );
  expect(container.querySelector("svg")).toBeInTheDocument();
});

it("does not render svg element when svg is undefined", () => {
  const { container } = render(
    <ChordItem title="Am" svg={undefined} size={3} orientation="vertical" />,
  );
  expect(container.querySelector("svg")).not.toBeInTheDocument();
});

it("applies vertical width based on size", () => {
  const { container } = render(
    <ChordItem title="Am" svg="<svg><rect/></svg>" size={1} orientation="vertical" />,
  );
  expect((container.firstChild as HTMLElement).style.width).toBe("7rem");
});

it("applies horizontal width based on size", () => {
  const { container } = render(
    <ChordItem title="Am" svg="<svg><rect/></svg>" size={1} orientation="horizontal" />,
  );
  expect((container.firstChild as HTMLElement).style.width).toBe("12rem");
});
