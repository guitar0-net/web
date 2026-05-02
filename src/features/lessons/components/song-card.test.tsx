// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";

import type { SongDetail } from "../api";
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
