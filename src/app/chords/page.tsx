// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Metadata } from "next";
import { connection } from "next/server";

import { ChordsList } from "@/features/chords";
import { chordsApi } from "@/features/chords/api";

export function generateMetadata(): Metadata {
  return { title: "Аккорды | Гитара с нуля" };
}

export default async function ChordsPage() {
  await connection();
  const chords = await chordsApi.fetchChords();
  return (
    <section>
      <div className="bg-accent border-b py-8">
        <div className="container mx-auto">
          <h1 className="mb-4 text-5xl font-medium md:text-5xl">Аккорды</h1>
        </div>
      </div>
      <div className="container mx-auto">
        <ChordsList chords={chords} />
      </div>
    </section>
  );
}
