// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Size } from "@/types/ui";

type ChordOrientation = "horizontal" | "vertical";

export type SizeKey = "schemeSize" | "chordSize" | "textSize" | "videoSize";
export type ToggleKey =
  | "schemeVisible"
  | "chordVisible"
  | "videoVisible"
  | "videoPinned";

interface SongPreferencesState {
  schemeSize: Size;
  chordSize: Size;
  textSize: Size;
  videoSize: Size;
  chordOrientation: ChordOrientation;
  schemeVisible: boolean;
  chordVisible: boolean;
  videoVisible: boolean;
  videoPinned: boolean;
  increaseSize: (key: SizeKey) => void;
  decreaseSize: (key: SizeKey) => void;
  toggle: (key: ToggleKey) => void;
  toggleChordOrientation: () => void;
}

export function createSongPreferencesStore() {
  return create<SongPreferencesState>()(
    persist(
      (set) => ({
        schemeSize: 3,
        chordSize: 3,
        textSize: 3,
        videoSize: 3,
        chordOrientation: "vertical",
        schemeVisible: true,
        chordVisible: true,
        videoVisible: true,
        videoPinned: false,
        increaseSize: (key) => set((s) => ({ [key]: Math.min(5, s[key] + 1) as Size })),
        decreaseSize: (key) => set((s) => ({ [key]: Math.max(1, s[key] - 1) as Size })),
        toggle: (key) => set((s) => ({ [key]: !s[key] })),
        toggleChordOrientation: () =>
          set((s) => ({
            chordOrientation:
              s.chordOrientation === "vertical" ? "horizontal" : "vertical",
          })),
      }),
      { name: "song-preferences", skipHydration: true },
    ),
  );
}

export const useSongPreferencesStore = createSongPreferencesStore();
