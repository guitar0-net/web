// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

"use client";

import { useEffect } from "react";

import { useSongPreferencesStore } from "@/features/lessons/store";

import type { ChordsListItem } from "../api";
import { ChordsSection } from "./chords-section";

const NOTES = ["C", "D", "E", "F", "G", "A", "H"] as const;

interface ChordsListProps {
  chords: ChordsListItem[];
}

export function ChordsList({ chords }: ChordsListProps) {
  useEffect(() => {
    void useSongPreferencesStore.persist.rehydrate();
  }, []);

  const {
    chordSize,
    chordOrientation,
    increaseSize,
    decreaseSize,
    toggleChordOrientation,
  } = useSongPreferencesStore();

  return (
    <>
      {NOTES.map((note) => {
        const filtered = chords.filter((c) => c.title.startsWith(note));
        return (
          <div key={note} className="mt-4">
            <ChordsSection
              chords={filtered}
              size={chordSize}
              orientation={chordOrientation}
              visible={true}
              title={note}
              onOrientationToggle={toggleChordOrientation}
              onSizeDecrease={() => decreaseSize("chordSize")}
              onSizeIncrease={() => increaseSize("chordSize")}
            />
          </div>
        );
      })}
    </>
  );
}
