"use client";

/* v8 ignore file */

// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useAnalytics } from "@/lib/analytics/use-analytics";
import { useSongPreferencesStore } from "@/lib/song-preferences-store";

import { LessonVideo } from "./lesson-video";

interface LessonVideoSectionProps {
  videoUrl: string;
}

export function LessonVideoSection({ videoUrl }: LessonVideoSectionProps) {
  const { videoSize, videoVisible, videoPinned, decreaseSize, increaseSize, toggle } =
    useSongPreferencesStore();
  const { trackVideoVisibilityToggled, trackVideoPinToggled } = useAnalytics();

  return (
    <LessonVideo
      videoUrl={videoUrl}
      size={videoSize}
      visible={videoVisible}
      pinned={videoPinned}
      onSizeDecrease={() => decreaseSize("videoSize")}
      onSizeIncrease={() => increaseSize("videoSize")}
      onVisibleToggle={() => {
        toggle("videoVisible");
        trackVideoVisibilityToggled(!videoVisible);
      }}
      onPinToggle={() => {
        toggle("videoPinned");
        trackVideoPinToggled(!videoPinned);
      }}
    />
  );
}
