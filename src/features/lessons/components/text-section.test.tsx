// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TextSection } from "./text-section";

it("renders the text content", () => {
  const text = `Em  Am\nСлова текста-${Math.random().toString(36).slice(2)}`;
  render(
    <TextSection
      text={text}
      size={3}
      onSizeDecrease={() => {}}
      onSizeIncrease={() => {}}
    />,
  );
  expect(screen.getByTestId("tab-text")).toHaveTextContent("Слова текста");
});

it("applies text-xs class when size is 1", () => {
  render(
    <TextSection
      text="some text"
      size={1}
      onSizeDecrease={() => {}}
      onSizeIncrease={() => {}}
    />,
  );
  expect(screen.getByTestId("tab-text")).toHaveClass("text-xs");
});

it("applies text-2xl class when size is 5", () => {
  render(
    <TextSection
      text="some text"
      size={5}
      onSizeDecrease={() => {}}
      onSizeIncrease={() => {}}
    />,
  );
  expect(screen.getByTestId("tab-text")).toHaveClass("text-2xl");
});

it("calls onSizeDecrease when decrease button is clicked", async () => {
  const onSizeDecrease = vi.fn();
  render(
    <TextSection
      text="text"
      size={3}
      onSizeDecrease={onSizeDecrease}
      onSizeIncrease={() => {}}
    />,
  );
  await userEvent.click(screen.getByRole("button", { name: /decrease/i }));
  expect(onSizeDecrease).toHaveBeenCalledOnce();
});

it("calls onSizeIncrease when increase button is clicked", async () => {
  const onSizeIncrease = vi.fn();
  render(
    <TextSection
      text="text"
      size={3}
      onSizeDecrease={() => {}}
      onSizeIncrease={onSizeIncrease}
    />,
  );
  await userEvent.click(screen.getByRole("button", { name: /increase/i }));
  expect(onSizeIncrease).toHaveBeenCalledOnce();
});
