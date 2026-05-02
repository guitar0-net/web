// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Play } from "lucide-react";

import { ControlGroup } from "@/components/controls/control-group";
import { SizeControl } from "@/components/controls/size-control";
import { ToggleVisibility } from "@/components/controls/toggle-visibility";
import { SectionHeader } from "@/components/section-header";
import { cn } from "@/lib/utils";
import { Size } from "@/types/ui";

import { TogglePin } from "./toggle-pin";

const VIDEO_MAX_WIDTH: Record<Size, string> = {
  1: "40%",
  2: "60%",
  3: "80%",
  4: "90%",
  5: "100%",
};

interface LessonVideoProps {
  videoUrl: string;
  size: Size;
  visible: boolean;
  pinned: boolean;
  onSizeDecrease: () => void;
  onSizeIncrease: () => void;
  onVisibleToggle: () => void;
  onPinToggle: () => void;
}

export function LessonVideo({
  videoUrl,
  size,
  visible,
  pinned,
  onSizeDecrease,
  onSizeIncrease,
  onVisibleToggle,
  onPinToggle,
}: LessonVideoProps) {
  const VideoControlGroup = (
    <ControlGroup>
      <TogglePin pinned={pinned} onToggle={onPinToggle} />
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
    <section
      className={cn(
        "container mx-auto px-4",
        pinned && "bg-background sticky top-11 z-10 md:top-13",
      )}
    >
      <SectionHeader title="Видео" Icon={Play} ControlGroup={VideoControlGroup} />
      {visible && (
        <div
          className="mx-auto aspect-video transition-all"
          style={{ maxWidth: VIDEO_MAX_WIDTH[size] }}
        >
          <iframe
            src={videoUrl}
            title="Lesson video"
            className="h-full w-full"
            allowFullScreen
          />
        </div>
      )}
    </section>
  );
}
