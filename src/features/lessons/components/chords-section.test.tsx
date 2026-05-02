// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { ChordDetail } from "../api";
import { ChordsSection } from "./chords-section";

function makeChord(overrides: Partial<ChordDetail> = {}): ChordDetail {
  return {
    id: Math.floor(Math.random() * 1000),
    title: `Am-${Math.random().toString(36).slice(2)}`,
    musical_title: "A minor",
    positions: [],
    svg_vertical: "<svg><rect/></svg>",
    svg_horizontal: "<svg><circle/></svg>",
    ...overrides,
  };
}

it("renders each chord title", () => {
  const chords = [makeChord(), makeChord()];
  render(
    <ChordsSection
      chords={chords}
      size={3}
      orientation="vertical"
      visible={true}
      onOrientationToggle={() => {}}
      onSizeDecrease={() => {}}
      onSizeIncrease={() => {}}
      onVisibleToggle={() => {}}
    />,
  );
  expect(screen.getByText(chords[0].title)).toBeInTheDocument();
  expect(screen.getByText(chords[1].title)).toBeInTheDocument();
});

it("calls onOrientationToggle when orientation button is clicked", async () => {
  const onOrientationToggle = vi.fn();
  render(
    <ChordsSection
      chords={[makeChord()]}
      size={3}
      orientation="vertical"
      visible={true}
      onOrientationToggle={onOrientationToggle}
      onSizeDecrease={() => {}}
      onSizeIncrease={() => {}}
      onVisibleToggle={() => {}}
    />,
  );
  await userEvent.click(screen.getByRole("button", { name: /orientation/i }));
  expect(onOrientationToggle).toHaveBeenCalledOnce();
});

it("uses vertical svg when orientation is vertical", () => {
  const chord = makeChord({
    svg_vertical: "<svg><rect/></svg>",
    svg_horizontal: "<svg><circle/></svg>",
  });
  const { container } = render(
    <ChordsSection
      chords={[chord]}
      size={3}
      orientation="vertical"
      visible={true}
      onOrientationToggle={() => {}}
      onSizeDecrease={() => {}}
      onSizeIncrease={() => {}}
      onVisibleToggle={() => {}}
    />,
  );
  const chordSvg = container.querySelector("[data-testid='chord-svg']");
  expect(chordSvg?.querySelector("rect")).toBeInTheDocument();
  expect(chordSvg?.querySelector("circle")).not.toBeInTheDocument();
});

it("uses horizontal svg when orientation is horizontal", () => {
  const chord = makeChord({
    svg_vertical: "<svg><rect/></svg>",
    svg_horizontal: "<svg><circle/></svg>",
  });
  const { container } = render(
    <ChordsSection
      chords={[chord]}
      size={3}
      orientation="horizontal"
      visible={true}
      onOrientationToggle={() => {}}
      onSizeDecrease={() => {}}
      onSizeIncrease={() => {}}
      onVisibleToggle={() => {}}
    />,
  );
  const chordSvg = container.querySelector("[data-testid='chord-svg']");
  expect(chordSvg?.querySelector("circle")).toBeInTheDocument();
  expect(chordSvg?.querySelector("rect")).not.toBeInTheDocument();
});

it("calls onSizeDecrease when decrease button is clicked", async () => {
  const onSizeDecrease = vi.fn();
  render(
    <ChordsSection
      chords={[makeChord()]}
      size={3}
      orientation="vertical"
      visible={true}
      onOrientationToggle={() => {}}
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
    <ChordsSection
      chords={[makeChord()]}
      size={3}
      orientation="vertical"
      visible={true}
      onOrientationToggle={() => {}}
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
    <ChordsSection
      chords={[makeChord()]}
      size={3}
      orientation="vertical"
      visible={true}
      onOrientationToggle={() => {}}
      onSizeDecrease={() => {}}
      onSizeIncrease={() => {}}
      onVisibleToggle={onVisibleToggle}
    />,
  );
  await userEvent.click(screen.getByRole("button", { name: /hide/i }));
  expect(onVisibleToggle).toHaveBeenCalledOnce();
});

it("falls back to svg_horizontal when svg_vertical is absent in vertical mode", () => {
  const chord = makeChord({
    svg_vertical: undefined,
    svg_horizontal: "<svg><circle/></svg>",
  });
  const { container } = render(
    <ChordsSection
      chords={[chord]}
      size={3}
      orientation="vertical"
      visible={true}
      onOrientationToggle={() => {}}
      onSizeDecrease={() => {}}
      onSizeIncrease={() => {}}
      onVisibleToggle={() => {}}
    />,
  );
  const chordSvg = container.querySelector("[data-testid='chord-svg']");
  expect(chordSvg?.querySelector("circle")).toBeInTheDocument();
});

it("falls back to svg_vertical when svg_horizontal is absent in horizontal mode", () => {
  const chord = makeChord({
    svg_vertical: "<svg><rect/></svg>",
    svg_horizontal: undefined,
  });
  const { container } = render(
    <ChordsSection
      chords={[chord]}
      size={3}
      orientation="horizontal"
      visible={true}
      onOrientationToggle={() => {}}
      onSizeDecrease={() => {}}
      onSizeIncrease={() => {}}
      onVisibleToggle={() => {}}
    />,
  );
  const chordSvg = container.querySelector("[data-testid='chord-svg']");
  expect(chordSvg?.querySelector("rect")).toBeInTheDocument();
});

it("hides chord items when visible is false", () => {
  const chord = makeChord();
  render(
    <ChordsSection
      chords={[chord]}
      size={3}
      orientation="vertical"
      visible={false}
      onOrientationToggle={() => {}}
      onSizeDecrease={() => {}}
      onSizeIncrease={() => {}}
      onVisibleToggle={() => {}}
    />,
  );
  expect(screen.queryByText(chord.title)).not.toBeInTheDocument();
});
