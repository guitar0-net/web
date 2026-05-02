// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { LessonVideo } from "./lesson-video";

const noop = () => {};

it("renders an iframe with the lesson video_url as src", () => {
  const url = `https://www.youtube.com/embed/${Math.random().toString(36).slice(2)}`;
  render(
    <LessonVideo
      videoUrl={url}
      size={3}
      visible={true}
      pinned={false}
      onSizeDecrease={noop}
      onSizeIncrease={noop}
      onVisibleToggle={noop}
      onPinToggle={noop}
    />,
  );
  expect(screen.getByTitle("Lesson video")).toHaveAttribute("src", url);
});

it("hides the iframe when visible is false", () => {
  const url = `https://www.youtube.com/embed/${Math.random().toString(36).slice(2)}`;
  render(
    <LessonVideo
      videoUrl={url}
      size={3}
      visible={false}
      pinned={false}
      onSizeDecrease={noop}
      onSizeIncrease={noop}
      onVisibleToggle={noop}
      onPinToggle={noop}
    />,
  );
  expect(screen.queryByTitle("Lesson video")).not.toBeInTheDocument();
});

it("calls onVisibleToggle when visibility button is clicked", async () => {
  const onVisibleToggle = vi.fn();
  render(
    <LessonVideo
      videoUrl="https://example.com/embed/abc"
      size={3}
      visible={true}
      pinned={false}
      onSizeDecrease={noop}
      onSizeIncrease={noop}
      onVisibleToggle={onVisibleToggle}
      onPinToggle={noop}
    />,
  );
  await userEvent.click(screen.getByRole("button", { name: /hide/i }));
  expect(onVisibleToggle).toHaveBeenCalledOnce();
});

it("calls onSizeDecrease when decrease button is clicked", async () => {
  const onSizeDecrease = vi.fn();
  render(
    <LessonVideo
      videoUrl="https://example.com/embed/abc"
      size={3}
      visible={true}
      pinned={false}
      onSizeDecrease={onSizeDecrease}
      onSizeIncrease={noop}
      onVisibleToggle={noop}
      onPinToggle={noop}
    />,
  );
  await userEvent.click(screen.getByRole("button", { name: /decrease/i }));
  expect(onSizeDecrease).toHaveBeenCalledOnce();
});

it("calls onSizeIncrease when increase button is clicked", async () => {
  const onSizeIncrease = vi.fn();
  render(
    <LessonVideo
      videoUrl="https://example.com/embed/abc"
      size={3}
      visible={true}
      pinned={false}
      onSizeDecrease={noop}
      onSizeIncrease={onSizeIncrease}
      onVisibleToggle={noop}
      onPinToggle={noop}
    />,
  );
  await userEvent.click(screen.getByRole("button", { name: /increase/i }));
  expect(onSizeIncrease).toHaveBeenCalledOnce();
});

it("calls onPinToggle when pin button is clicked", async () => {
  const onPinToggle = vi.fn();
  render(
    <LessonVideo
      videoUrl="https://example.com/embed/abc"
      size={3}
      visible={true}
      pinned={false}
      onSizeDecrease={noop}
      onSizeIncrease={noop}
      onVisibleToggle={noop}
      onPinToggle={onPinToggle}
    />,
  );
  await userEvent.click(screen.getByRole("button", { name: /pin/i }));
  expect(onPinToggle).toHaveBeenCalledOnce();
});

it("calls onPinToggle when unpin button is clicked", async () => {
  const onPinToggle = vi.fn();
  render(
    <LessonVideo
      videoUrl="https://example.com/embed/abc"
      size={3}
      visible={true}
      pinned={true}
      onSizeDecrease={noop}
      onSizeIncrease={noop}
      onVisibleToggle={noop}
      onPinToggle={onPinToggle}
    />,
  );
  await userEvent.click(screen.getByRole("button", { name: /unpin/i }));
  expect(onPinToggle).toHaveBeenCalledOnce();
});
