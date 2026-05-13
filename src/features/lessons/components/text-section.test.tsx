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

it("renders h4 with text-destructive class", () => {
  render(
    <TextSection
      text={"#### Акцент-раздел"}
      size={3}
      onSizeDecrease={() => {}}
      onSizeIncrease={() => {}}
    />,
  );
  expect(screen.getByRole("heading", { level: 4 })).toHaveClass("text-destructive");
});

it("renders h5 with text-destructive class", () => {
  render(
    <TextSection
      text={"##### Акцент-подраздел"}
      size={3}
      onSizeDecrease={() => {}}
      onSizeIncrease={() => {}}
    />,
  );
  expect(screen.getByRole("heading", { level: 5 })).toHaveClass("text-destructive");
});

it("renders h6 with bg-muted class", () => {
  render(
    <TextSection
      text={"###### Аккорд-метка"}
      size={3}
      onSizeDecrease={() => {}}
      onSizeIncrease={() => {}}
    />,
  );
  expect(screen.getByRole("heading", { level: 6 })).toHaveClass("bg-muted");
});

it("renders inline code with font-mono class", () => {
  const { container } = render(
    <TextSection
      text={"Играй `Em7` здесь"}
      size={3}
      onSizeDecrease={() => {}}
      onSizeIncrease={() => {}}
    />,
  );
  expect(container.querySelector("code")).toHaveClass("font-mono");
});

it("renders fenced code block pre with overflow-x-auto class", () => {
  const { container } = render(
    <TextSection
      text={"```\nEm  Am\nC   G\n```"}
      size={3}
      onSizeDecrease={() => {}}
      onSizeIncrease={() => {}}
    />,
  );
  expect(container.querySelector("pre")).toHaveClass("overflow-x-auto");
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
