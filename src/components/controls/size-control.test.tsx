// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SizeControl } from "./size-control";

it("decrease button is disabled when value equals min", () => {
  render(<SizeControl value={1} onDecrease={() => {}} onIncrease={() => {}} />);
  expect(screen.getByRole("button", { name: /decrease/i })).toBeDisabled();
});

it("increase button is disabled when value equals max", () => {
  render(<SizeControl value={5} onDecrease={() => {}} onIncrease={() => {}} />);
  expect(screen.getByRole("button", { name: /increase/i })).toBeDisabled();
});

it("decrease button is enabled when value is above min", () => {
  render(<SizeControl value={3} onDecrease={() => {}} onIncrease={() => {}} />);
  expect(screen.getByRole("button", { name: /decrease/i })).toBeEnabled();
});

it("calls onDecrease when decrease button is clicked", async () => {
  const onDecrease = vi.fn();
  render(<SizeControl value={3} onDecrease={onDecrease} onIncrease={() => {}} />);
  await userEvent.click(screen.getByRole("button", { name: /decrease/i }));
  expect(onDecrease).toHaveBeenCalledOnce();
});

it("calls onIncrease when increase button is clicked", async () => {
  const onIncrease = vi.fn();
  render(<SizeControl value={3} onDecrease={() => {}} onIncrease={onIncrease} />);
  await userEvent.click(screen.getByRole("button", { name: /increase/i }));
  expect(onIncrease).toHaveBeenCalledOnce();
});
