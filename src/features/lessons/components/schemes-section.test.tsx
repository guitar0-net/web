// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { ImageScheme } from "../api";
import { SchemesSection } from "./schemes-section";

function makeScheme(overrides: Partial<ImageScheme> = {}): ImageScheme {
  return {
    id: Math.floor(Math.random() * 1000),
    image: `https://example.com/${Math.random().toString(36).slice(2)}.png`,
    ...overrides,
  };
}

it("renders one image per scheme", () => {
  const schemes = [makeScheme(), makeScheme(), makeScheme()];
  render(
    <SchemesSection
      schemes={schemes}
      size={3}
      visible={true}
      onSizeDecrease={() => {}}
      onSizeIncrease={() => {}}
      onVisibleToggle={() => {}}
    />,
  );
  expect(screen.getAllByRole("img")).toHaveLength(3);
});

it("calls onSizeDecrease when decrease button is clicked", async () => {
  const onSizeDecrease = vi.fn();
  render(
    <SchemesSection
      schemes={[makeScheme()]}
      size={3}
      visible={true}
      onSizeDecrease={onSizeDecrease}
      onSizeIncrease={() => {}}
      onVisibleToggle={() => {}}
    />,
  );
  await userEvent.click(screen.getByRole("button", { name: /decrease/i }));
  expect(onSizeDecrease).toHaveBeenCalledOnce();
});

it("calls onSizeIncrease when increase button is clicked", async () => {
  const onSizeIncrease = vi.fn();
  render(
    <SchemesSection
      schemes={[makeScheme()]}
      size={3}
      visible={true}
      onSizeDecrease={() => {}}
      onSizeIncrease={onSizeIncrease}
      onVisibleToggle={() => {}}
    />,
  );
  await userEvent.click(screen.getByRole("button", { name: /increase/i }));
  expect(onSizeIncrease).toHaveBeenCalledOnce();
});

it("calls onVisibleToggle when visibility button is clicked", async () => {
  const onVisibleToggle = vi.fn();
  render(
    <SchemesSection
      schemes={[makeScheme()]}
      size={3}
      visible={true}
      onSizeDecrease={() => {}}
      onSizeIncrease={() => {}}
      onVisibleToggle={onVisibleToggle}
    />,
  );
  await userEvent.click(screen.getByRole("button", { name: /hide/i }));
  expect(onVisibleToggle).toHaveBeenCalledOnce();
});

it("hides images when visible is false", () => {
  render(
    <SchemesSection
      schemes={[makeScheme()]}
      size={3}
      visible={false}
      onSizeDecrease={() => {}}
      onSizeIncrease={() => {}}
      onVisibleToggle={() => {}}
    />,
  );
  expect(screen.queryByRole("img")).not.toBeInTheDocument();
});
