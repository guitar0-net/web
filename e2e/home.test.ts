// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { expect, test } from "./fixtures";

test("home page shows announcement from the API", async ({
  page,
  firstAnnouncement,
}) => {
  await page.goto("/");
  await expect(
    page.getByText(firstAnnouncement.title, { exact: true }).first(),
  ).toBeVisible();
});

test("clicking an announcement card opens a dialog with the full content", async ({
  page,
  firstAnnouncement,
}) => {
  await page.goto("/");
  await page.getByText(firstAnnouncement.title, { exact: true }).first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
});
