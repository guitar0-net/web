// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/* v8 ignore file */

import { Suspense } from "react";

import { HeroSection } from "@/components/hero-section";
import { AnnouncementsSection } from "@/features/announcements";
import { ReviewsSection } from "@/features/reviews";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col font-sans">
      <main className="flex-1">
        <HeroSection />
        <Suspense>
          <AnnouncementsSection />
        </Suspense>
        <ReviewsSection />
      </main>
    </div>
  );
}
