// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import { Music } from "lucide-react";

import { SectionHeader } from "./section-header";

it("renders the title as a heading", () => {
  const title = `Секция-${Math.random().toString(36).slice(2)}`;
  render(<SectionHeader title={title} />);
  expect(screen.getByRole("heading", { name: new RegExp(title) })).toBeInTheDocument();
});

it("renders the Icon when provided", () => {
  render(<SectionHeader title="Тест" Icon={Music} />);
  expect(document.querySelector("svg")).toBeInTheDocument();
});

it("renders ControlGroup when provided", () => {
  render(
    <SectionHeader
      title="Тест"
      ControlGroup={<div data-testid="controls">controls</div>}
    />,
  );
  expect(screen.getByTestId("controls")).toBeInTheDocument();
});

it("does not render ControlGroup slot when absent", () => {
  render(<SectionHeader title="Тест" />);
  expect(screen.queryByTestId("controls")).not.toBeInTheDocument();
});
