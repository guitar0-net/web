// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Size } from "@/types/ui";

export type ChordOrientation = "horizontal" | "vertical";

const CHORD_WIDTH: Record<ChordOrientation, Record<Size, string>> = {
  vertical: {
    1: "7rem",
    2: "8rem",
    3: "9rem",
    4: "10rem",
    5: "12rem",
  },
  horizontal: {
    1: "12rem",
    2: "17rem",
    3: "22rem",
    4: "26rem",
    5: "32rem",
  },
};

interface ChordItemProps {
  title: string;
  svg: string | undefined;
  size: Size;
  orientation: ChordOrientation;
}

export function ChordItem({ title, svg, size, orientation }: ChordItemProps) {
  return (
    <div
      className="flex flex-col items-center"
      style={{ width: CHORD_WIDTH[orientation][size] }}
    >
      <span className="text-sm font-medium">{title}</span>
      {svg && (
        <div
          data-testid="chord-svg"
          className="w-full"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      )}
    </div>
  );
}
