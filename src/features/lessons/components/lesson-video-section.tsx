"use client";

// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useSongPreferencesStore } from "../store";
import { LessonVideo } from "./lesson-video";

interface LessonVideoSectionProps {
  videoUrl: string;
}

export function LessonVideoSection({ videoUrl }: LessonVideoSectionProps) {
  const { videoSize, videoVisible, videoPinned, decreaseSize, increaseSize, toggle } =
    useSongPreferencesStore();

  return (
    <LessonVideo
      videoUrl={videoUrl}
      size={videoSize}
      visible={videoVisible}
      pinned={videoPinned}
      onSizeDecrease={() => decreaseSize("videoSize")}
      onSizeIncrease={() => increaseSize("videoSize")}
      onVisibleToggle={() => toggle("videoVisible")}
      onPinToggle={() => toggle("videoPinned")}
    />
  );
}
