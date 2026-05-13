// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { expect, test } from "@playwright/test";

test("unknown course shows 404 page", async ({ page }) => {
  await page.goto("/courses/00000000-0000-0000-0000-000000000000");
  await expect(
    page.getByRole("heading", { name: "Страница не найдена" }),
  ).toBeVisible();
});

test("unknown lesson shows 404 page", async ({ page }) => {
  await page.goto("/lessons/00000000-0000-0000-0000-000000000000");
  await expect(
    page.getByRole("heading", { name: "Страница не найдена" }),
  ).toBeVisible();
});
