// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Dot } from "lucide-react";

import { type AnnouncementsListItem, announcementsApi } from "../api";
import { AnnouncementCard } from "./announcement-card";

export async function AnnouncementsSection() {
  let results: AnnouncementsListItem[];
  try {
    const data = await announcementsApi.fetchAnnouncements({ limit: 3 });
    results = data.results;
  } catch (error) {
    console.error("[AnnouncementsSection] Failed to fetch announcements:", error);
    return null;
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-2 flex items-center justify-start gap-2">
          <div className="bg-primary h-2 w-2 animate-pulse rounded-full" />
          <h3 className="text-primary text-sm">Что нового</h3>
        </div>
        <h2 className="mb-4 text-3xl md:text-4xl">Последние обновления</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((item) => (
            <AnnouncementCard key={item.uuid} announcement={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
