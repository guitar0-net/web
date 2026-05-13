// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";

import type { SongDetail } from "../api";
import { SongsSection } from "./songs-section";

function makeSong(overrides: Partial<SongDetail> = {}): SongDetail {
  return {
    id: Math.floor(Math.random() * 1000),
    title: `Песня-${Math.random().toString(36).slice(2)}`,
    text: "Текст",
    schemes: [],
    chords: [],
    ...overrides,
  };
}

it("renders nothing when songs array is empty", () => {
  const { container } = render(<SongsSection songs={[]} />);
  expect(container.firstChild).toBeNull();
});

it("renders a tab trigger for each song title", () => {
  const songs = [makeSong(), makeSong()];
  render(<SongsSection songs={songs} />);
  expect(screen.getByRole("tab", { name: songs[0].title })).toBeInTheDocument();
  expect(screen.getByRole("tab", { name: songs[1].title })).toBeInTheDocument();
});

it("renders exactly as many tab triggers as songs", () => {
  const songs = [makeSong(), makeSong(), makeSong()];
  render(<SongsSection songs={songs} />);
  expect(screen.getAllByRole("tab")).toHaveLength(3);
});
