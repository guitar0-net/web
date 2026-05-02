// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Music } from "lucide-react";

import { ControlGroup } from "@/components/controls/control-group";
import { SizeControl } from "@/components/controls/size-control";
import { ToggleVisibility } from "@/components/controls/toggle-visibility";
import { SectionHeader } from "@/components/section-header";
import { Size } from "@/types/ui";

import type { ChordDetail } from "../api";
import { ChordItem, type ChordOrientation } from "./chord-item";
import { ToggleOrientation } from "./toggle-orientation";

interface ChordsSectionProps {
  chords: ChordDetail[];
  size: Size;
  orientation: ChordOrientation;
  visible: boolean;
  onOrientationToggle: () => void;
  onSizeDecrease: () => void;
  onSizeIncrease: () => void;
  onVisibleToggle: () => void;
}

export function ChordsSection({
  chords,
  size,
  orientation,
  visible,
  onSizeDecrease,
  onSizeIncrease,
  onOrientationToggle,
  onVisibleToggle,
}: ChordsSectionProps) {
  const ChordControlGroup = (
    <ControlGroup>
      {visible && (
        <>
          <ToggleOrientation orientation={orientation} onToggle={onOrientationToggle} />
          <SizeControl
            value={size}
            onDecrease={onSizeDecrease}
            onIncrease={onSizeIncrease}
          />
        </>
      )}
      <ToggleVisibility visible={visible} onToggle={onVisibleToggle} />
    </ControlGroup>
  );
  return (
    <section>
      <SectionHeader title="Аккорды" Icon={Music} ControlGroup={ChordControlGroup} />
      {visible && (
        <div className="flex flex-wrap gap-4">
          {chords.map((chord) => {
            const svg =
              orientation === "vertical"
                ? (chord.svg_vertical ?? chord.svg_horizontal)
                : (chord.svg_horizontal ?? chord.svg_vertical);
            return (
              <ChordItem
                key={chord.id}
                title={chord.title}
                svg={svg}
                size={size}
                orientation={orientation}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
