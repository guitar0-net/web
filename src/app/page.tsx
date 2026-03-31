// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ThemeSwitcher } from "@/components/theme-switcher";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col font-sans">
      <main className="flex-1"></main>
      <footer className="flex justify-end p-1">
        <ThemeSwitcher />
      </footer>
    </div>
  );
}
