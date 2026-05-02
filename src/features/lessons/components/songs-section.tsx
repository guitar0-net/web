"use client";

// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useEffect } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import type { SongDetail } from "../api";
import { useSongPreferencesStore } from "../store";
import { SongCard } from "./song-card";

interface SongsSectionProps {
  songs: SongDetail[];
}

export function SongsSection({ songs }: SongsSectionProps) {
  useEffect(() => {
    void useSongPreferencesStore.persist.rehydrate();
  }, []);

  if (songs.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-8">
      <Tabs defaultValue={String(songs[0].id)}>
        <TabsList className="mb-6 flex-wrap gap-2">
          {songs.map((song) => (
            <TabsTrigger key={song.id} value={String(song.id)}>
              {song.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {songs.map((song) => (
          <TabsContent key={song.id} value={String(song.id)}>
            <SongCard song={song} />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
