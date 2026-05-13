// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ToggleOrientation } from "./toggle-orientation";

it("renders a button with aria-label toggle orientation", () => {
  render(<ToggleOrientation orientation="vertical" onToggle={() => {}} />);
  expect(
    screen.getByRole("button", { name: "toggle orientation" }),
  ).toBeInTheDocument();
});

it("calls onToggle when button is clicked", async () => {
  const onToggle = vi.fn();
  render(<ToggleOrientation orientation="horizontal" onToggle={onToggle} />);
  await userEvent.click(screen.getByRole("button", { name: "toggle orientation" }));
  expect(onToggle).toHaveBeenCalledOnce();
});
