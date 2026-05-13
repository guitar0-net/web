// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { expect, test } from "./fixtures";

test("navigates from home to courses to course detail", async ({
  page,
  firstCourse,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Начать обучение" }).click();
  await expect(page).toHaveURL("/courses");
  await page.getByRole("link", { name: firstCourse.title }).first().click();
  await expect(page).toHaveURL(`/courses/${firstCourse.uuid}`);
  await expect(page.getByRole("heading", { name: firstCourse.title })).toBeVisible();
});
