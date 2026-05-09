// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { useSongPreferencesStore } from "@/lib/song-preferences-store";

import type { ChordsListItem } from "../api";
import { ChordsList } from "./chords-list";

function makeChord(overrides: Partial<ChordsListItem> = {}): ChordsListItem {
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

it("renders all seven note section headings", () => {
  render(<ChordsList chords={[]} />);
  for (const note of ["C", "D", "E", "F", "G", "A", "H"]) {
    expect(screen.getByRole("heading", { name: note })).toBeInTheDocument();
  }
});

it("renders a chord whose title starts with a known note", () => {
  const chord = makeChord({ title: `G${Math.random().toString(36).slice(2)}` });
  render(<ChordsList chords={[chord]} />);
  expect(screen.getByText(chord.title)).toBeInTheDocument();
});

it("does not render a chord whose prefix matches no note", () => {
  const chord = makeChord({ title: `X${Math.random().toString(36).slice(2)}` });
  render(<ChordsList chords={[chord]} />);
  expect(screen.queryByText(chord.title)).not.toBeInTheDocument();
});

it("renders chords for different notes independently", () => {
  const chordA = makeChord({ title: `Am${Math.random().toString(36).slice(2)}` });
  const chordC = makeChord({ title: `Cm${Math.random().toString(36).slice(2)}` });
  render(<ChordsList chords={[chordA, chordC]} />);
  expect(screen.getByText(chordA.title)).toBeInTheDocument();
  expect(screen.getByText(chordC.title)).toBeInTheDocument();
});

it("disables the increase button when max size is reached", async () => {
  useSongPreferencesStore.setState({ chordSize: 4 });
  render(<ChordsList chords={[]} />);
  await userEvent.click(screen.getAllByRole("button", { name: /increase/i })[0]);
  expect(screen.getAllByRole("button", { name: /increase/i })[0]).toBeDisabled();
});

it("disables the decrease button when min size is reached", async () => {
  useSongPreferencesStore.setState({ chordSize: 2 });
  render(<ChordsList chords={[]} />);
  await userEvent.click(screen.getAllByRole("button", { name: /decrease/i })[0]);
  expect(screen.getAllByRole("button", { name: /decrease/i })[0]).toBeDisabled();
});
