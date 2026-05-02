// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ToggleVisibility } from "./toggle-visibility";

it("has aria-label hide when visible is true", () => {
  render(<ToggleVisibility visible={true} onToggle={() => {}} />);
  expect(screen.getByRole("button", { name: "hide" })).toBeInTheDocument();
});

it("has aria-label show when visible is false", () => {
  render(<ToggleVisibility visible={false} onToggle={() => {}} />);
  expect(screen.getByRole("button", { name: "show" })).toBeInTheDocument();
});

it("calls onToggle when button is clicked", async () => {
  const onToggle = vi.fn();
  render(<ToggleVisibility visible={true} onToggle={onToggle} />);
  await userEvent.click(screen.getByRole("button", { name: "hide" }));
  expect(onToggle).toHaveBeenCalledOnce();
});
