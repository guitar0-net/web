"use client";

// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Music3 } from "lucide-react";

import type { SongDetail } from "../api";
import { useSongPreferencesStore } from "../store";
import { ChordsSection } from "./chords-section";
import { SchemesSection } from "./schemes-section";
import { TextSection } from "./text-section";

interface SongCardProps {
  song: SongDetail;
}

export function SongCard({ song }: SongCardProps) {
  const {
    schemeSize,
    chordSize,
    textSize,
    chordOrientation,
    schemeVisible,
    chordVisible,
    increaseSize,
    decreaseSize,
    toggle,
    toggleChordOrientation,
  } = useSongPreferencesStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold">{song.title}</h2>
        {song.metronome !== undefined && (
          <div
            data-testid="metronome-badge"
            className="bg-primary/10 flex items-center gap-2 rounded-l-2xl rounded-r-2xl p-2 px-4"
          >
            <div
              className="bg-primary animate-blink h-2 w-2 rounded-full"
              style={{ animationDuration: `${60 / song.metronome}s` }}
            />
            <Music3 className="text-primary size-4" />
            <span className="text-primary text-sm">=</span>
            <span className="text-primary text-sm"> {song.metronome}</span>
          </div>
        )}
      </div>

      {song.chords.length > 0 && (
        <ChordsSection
          chords={song.chords}
          size={chordSize}
          orientation={chordOrientation}
          visible={chordVisible}
          onOrientationToggle={toggleChordOrientation}
          onSizeDecrease={() => decreaseSize("chordSize")}
          onSizeIncrease={() => increaseSize("chordSize")}
          onVisibleToggle={() => toggle("chordVisible")}
        />
      )}

      {song.schemes.length > 0 && (
        <SchemesSection
          schemes={song.schemes}
          size={schemeSize}
          visible={schemeVisible}
          onSizeDecrease={() => decreaseSize("schemeSize")}
          onSizeIncrease={() => increaseSize("schemeSize")}
          onVisibleToggle={() => toggle("schemeVisible")}
        />
      )}

      <TextSection
        text={song.text}
        size={textSize}
        onSizeDecrease={() => decreaseSize("textSize")}
        onSizeIncrease={() => increaseSize("textSize")}
      />
    </div>
  );
}
