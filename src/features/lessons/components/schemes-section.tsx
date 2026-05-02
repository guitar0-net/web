// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { AudioLines } from "lucide-react";

import { ControlGroup } from "@/components/controls/control-group";
import { SizeControl } from "@/components/controls/size-control";
import { ToggleVisibility } from "@/components/controls/toggle-visibility";
import { SectionHeader } from "@/components/section-header";
import { Size } from "@/types/ui";

import type { ImageScheme } from "../api";
import { SchemeImage } from "./scheme-image";

interface SchemesSectionProps {
  schemes: ImageScheme[];
  size: Size;
  visible: boolean;
  onSizeDecrease: () => void;
  onSizeIncrease: () => void;
  onVisibleToggle: () => void;
}

export function SchemesSection({
  schemes,
  size,
  visible,
  onSizeDecrease,
  onSizeIncrease,
  onVisibleToggle,
}: SchemesSectionProps) {
  const SchemeControlGroup = (
    <ControlGroup>
      {visible && (
        <SizeControl
          value={size}
          onDecrease={onSizeDecrease}
          onIncrease={onSizeIncrease}
        />
      )}
      <ToggleVisibility visible={visible} onToggle={onVisibleToggle} />
    </ControlGroup>
  );
  return (
    <section>
      <SectionHeader
        title="Бои и ритмические рисунки"
        ControlGroup={SchemeControlGroup}
        Icon={AudioLines}
      />
      {visible && (
        <div className="flex flex-wrap gap-4 overflow-x-auto">
          {schemes.map((scheme) => (
            <SchemeImage key={scheme.id} scheme={scheme} size={size} />
          ))}
        </div>
      )}
    </section>
  );
}
