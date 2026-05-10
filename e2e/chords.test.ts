// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { expect, test } from "./fixtures";

test("chords page shows chords from the API", async ({ page, firstChord }) => {
  await page.goto("/chords");
  await expect(page.getByText(firstChord.title, { exact: true }).first()).toBeVisible();
});
