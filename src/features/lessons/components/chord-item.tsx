// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Size } from "@/types/ui";

export type ChordOrientation = "horizontal" | "vertical";

const CHORD_WIDTH: Record<ChordOrientation, Record<Size, string>> = {
  vertical: {
    1: "5rem",
    2: "6rem",
    3: "7rem",
    4: "8rem",
    5: "10rem",
  },
  horizontal: {
    1: "10rem",
    2: "14rem",
    3: "18rem",
    4: "24rem",
    5: "28rem",
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
      className="flex flex-col items-center transition-all"
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
