// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { expect, test } from "./fixtures";

test("user navigates from home to a course and then to a lesson", async ({
  page,
  firstCourse,
}) => {
  const firstLesson = firstCourse.lessons[0].lesson;

  await page.goto("/");
  await page.getByRole("link", { name: firstCourse.title }).first().click();

  await expect(page).toHaveURL(new RegExp(`/courses/${firstCourse.uuid}`));
  await expect(page.getByRole("heading", { name: firstCourse.title })).toBeVisible();

  await page.getByRole("link", { name: firstLesson.title }).click();

  await expect(page).toHaveURL(new RegExp(`/lessons/${firstLesson.uuid}`));
  await expect(page.getByRole("heading", { name: firstLesson.title })).toBeVisible();
});

test("lesson page shows course title in breadcrumbs", async ({ page, firstCourse }) => {
  const firstLesson = firstCourse.lessons[0].lesson;

  await page.goto(`/lessons/${firstLesson.uuid}?course=${firstCourse.uuid}`);

  const breadcrumb = page.getByRole("navigation", { name: "breadcrumb" });
  await expect(breadcrumb.getByRole("link", { name: firstCourse.title })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Видео" })).toBeVisible();
});
