// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/* v8 ignore file */

"use client";

import { useEffect } from "react";

import { useSongPreferencesStore } from "@/lib/song-preferences-store";

export function SongPreferencesHydrator() {
  useEffect(() => {
    void useSongPreferencesStore.persist.rehydrate();
  }, []);

  return null;
}
