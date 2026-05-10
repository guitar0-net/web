// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { expect, test } from "./fixtures";

// Courses page is not implemented yet.
test.skip("courses page shows courses from the API", async ({ page, firstCourse }) => {
  await page.goto("/courses");
  await expect(
    page.getByRole("link", { name: firstCourse.title }).first(),
  ).toBeVisible();
});
