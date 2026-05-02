// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// @vitest-environment jsdom

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { SongDetail } from "../api";
import { useSongPreferencesStore } from "../store";
import { SongCard } from "./song-card";

function makeSong(overrides: Partial<SongDetail> = {}): SongDetail {
  return {
    id: Math.floor(Math.random() * 1000),
    title: `Песня-${Math.random().toString(36).slice(2)}`,
    text: "Em Am\nТекст песни",
    schemes: [],
    chords: [],
    ...overrides,
  };
}

it("renders the song title", () => {
  const song = makeSong();
  render(<SongCard song={song} />);
  expect(screen.getByText(song.title)).toBeInTheDocument();
});

it("renders metronome badge when metronome is defined", () => {
  const song = makeSong({ metronome: 120 });
  render(<SongCard song={song} />);
  expect(screen.getByText(/120/)).toBeInTheDocument();
});

it("does not render metronome badge when metronome is absent", () => {
  const song = makeSong({ metronome: undefined });
  render(<SongCard song={song} />);
  expect(screen.queryByTestId("metronome-badge")).not.toBeInTheDocument();
});

it("renders schemes section when schemes are present", () => {
  const song = makeSong({
    schemes: [{ id: 1, image: "https://example.com/a.png" }],
  });
  render(<SongCard song={song} />);
  expect(screen.getByRole("img")).toBeInTheDocument();
});

it("does not render schemes section when schemes is empty", () => {
  const song = makeSong({ schemes: [] });
  render(<SongCard song={song} />);
  expect(screen.queryByRole("img")).not.toBeInTheDocument();
});

it("renders chords section when chords are present", () => {
  const song = makeSong({
    chords: [
      {
        id: 1,
        title: "Am",
        musical_title: "A minor",
        positions: [],
      },
    ],
  });
  render(<SongCard song={song} />);
  expect(screen.getByText("Am")).toBeInTheDocument();
});

it("does not render chords section when chords is empty", () => {
  const song = makeSong({ chords: [] });
  render(<SongCard song={song} />);
  expect(screen.queryByText("Аккорды")).not.toBeInTheDocument();
});

it("always renders the tab text section", () => {
  const song = makeSong({ text: "Текст-уникальный" });
  render(<SongCard song={song} />);
  expect(screen.getByTestId("tab-text")).toBeInTheDocument();
});

const CHORD = { id: 1, title: "Dm", musical_title: "D minor", positions: [] };
const SCHEME = { id: 1, image: "https://example.com/s.png" };

function chordsSection() {
  return screen
    .getByRole("heading", { name: /аккорды/i })
    .closest("section") as HTMLElement;
}

function schemesSection() {
  return screen
    .getByRole("heading", { name: /бои/i })
    .closest("section") as HTMLElement;
}

it("clicking chord size decrease invokes decreaseSize for chordSize", async () => {
  useSongPreferencesStore.setState({ chordSize: 3, chordVisible: true });
  render(<SongCard song={makeSong({ chords: [CHORD] })} />);
  await userEvent.click(
    within(chordsSection()).getByRole("button", { name: /decrease/i }),
  );
  expect(useSongPreferencesStore.getState().chordSize).toBe(2);
});

it("clicking chord size increase invokes increaseSize for chordSize", async () => {
  useSongPreferencesStore.setState({ chordSize: 3, chordVisible: true });
  render(<SongCard song={makeSong({ chords: [CHORD] })} />);
  await userEvent.click(
    within(chordsSection()).getByRole("button", { name: /increase/i }),
  );
  expect(useSongPreferencesStore.getState().chordSize).toBe(4);
});

it("clicking chord visibility toggle invokes toggle for chordVisible", async () => {
  useSongPreferencesStore.setState({ chordVisible: true });
  render(<SongCard song={makeSong({ chords: [CHORD] })} />);
  await userEvent.click(within(chordsSection()).getByRole("button", { name: /hide/i }));
  expect(useSongPreferencesStore.getState().chordVisible).toBe(false);
});

it("clicking scheme size decrease invokes decreaseSize for schemeSize", async () => {
  useSongPreferencesStore.setState({ schemeSize: 3, schemeVisible: true });
  render(<SongCard song={makeSong({ schemes: [SCHEME] })} />);
  await userEvent.click(
    within(schemesSection()).getByRole("button", { name: /decrease/i }),
  );
  expect(useSongPreferencesStore.getState().schemeSize).toBe(2);
});

it("clicking scheme size increase invokes increaseSize for schemeSize", async () => {
  useSongPreferencesStore.setState({ schemeSize: 3, schemeVisible: true });
  render(<SongCard song={makeSong({ schemes: [SCHEME] })} />);
  await userEvent.click(
    within(schemesSection()).getByRole("button", { name: /increase/i }),
  );
  expect(useSongPreferencesStore.getState().schemeSize).toBe(4);
});

it("clicking scheme visibility toggle invokes toggle for schemeVisible", async () => {
  useSongPreferencesStore.setState({ schemeVisible: true });
  render(<SongCard song={makeSong({ schemes: [SCHEME] })} />);
  await userEvent.click(
    within(schemesSection()).getByRole("button", { name: /hide/i }),
  );
  expect(useSongPreferencesStore.getState().schemeVisible).toBe(false);
});

it("clicking text size decrease invokes decreaseSize for textSize", async () => {
  useSongPreferencesStore.setState({ textSize: 3 });
  render(<SongCard song={makeSong({ chords: [], schemes: [] })} />);
  await userEvent.click(screen.getByRole("button", { name: /decrease/i }));
  expect(useSongPreferencesStore.getState().textSize).toBe(2);
});

it("clicking text size increase invokes increaseSize for textSize", async () => {
  useSongPreferencesStore.setState({ textSize: 3 });
  render(<SongCard song={makeSong({ chords: [], schemes: [] })} />);
  await userEvent.click(screen.getByRole("button", { name: /increase/i }));
  expect(useSongPreferencesStore.getState().textSize).toBe(4);
});
