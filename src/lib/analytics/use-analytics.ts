// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/* v8 ignore file */

"use client";

import { usePostHog } from "@posthog/react";

export function useAnalytics() {
  const posthog = usePostHog();

  return {
    trackVideoVisibilityToggled: (visible: boolean) =>
      posthog?.capture("lesson_video_visibility_toggled", { visible }),

    trackVideoPinToggled: (pinned: boolean) =>
      posthog?.capture("lesson_video_pin_toggled", { pinned }),

    trackChordOrientationToggled: (orientation: "horizontal" | "vertical") =>
      posthog?.capture("chord_orientation_toggled", { orientation }),

    trackChordSectionToggled: (visible: boolean) =>
      posthog?.capture("chord_section_visibility_toggled", { visible }),

    trackSchemeSectionToggled: (visible: boolean) =>
      posthog?.capture("scheme_section_visibility_toggled", { visible }),

    trackSongTabSelected: (song_id: string, song_title: string | undefined) =>
      posthog?.capture("song_tab_selected", { song_id, song_title }),
  };
}
