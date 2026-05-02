// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TogglePin } from "./toggle-pin";

it("has aria-label pin when pinned is false", () => {
  render(<TogglePin pinned={false} onToggle={() => {}} />);
  expect(screen.getByRole("button", { name: "pin" })).toBeInTheDocument();
});

it("has aria-label unpin when pinned is true", () => {
  render(<TogglePin pinned={true} onToggle={() => {}} />);
  expect(screen.getByRole("button", { name: "unpin" })).toBeInTheDocument();
});

it("calls onToggle when button is clicked", async () => {
  const onToggle = vi.fn();
  render(<TogglePin pinned={false} onToggle={onToggle} />);
  await userEvent.click(screen.getByRole("button", { name: "pin" }));
  expect(onToggle).toHaveBeenCalledOnce();
});
