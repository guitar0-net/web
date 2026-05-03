// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";

import { LessonBreadcrumbs } from "./lesson-breadcrumbs";

it("renders lesson title as current page", () => {
  const lessonTitle = `Урок-${Math.random().toString(36).slice(2)}`;
  render(<LessonBreadcrumbs lessonTitle={lessonTitle} />);
  expect(screen.getByText(lessonTitle)).toHaveAttribute("aria-current", "page");
});

it("renders a link to the course page when course info is provided", () => {
  const courseTitle = `Курс-${Math.random().toString(36).slice(2)}`;
  const courseUuid = crypto.randomUUID();
  render(
    <LessonBreadcrumbs
      lessonTitle="Урок"
      courseTitle={courseTitle}
      courseUuid={courseUuid}
    />,
  );
  expect(screen.getByRole("link", { name: courseTitle })).toHaveAttribute(
    "href",
    `/course/${courseUuid}`,
  );
});

it("does not render a course link when course title is absent", () => {
  const courseUuid = crypto.randomUUID();
  const { container } = render(
    <LessonBreadcrumbs lessonTitle="Урок" courseUuid={courseUuid} />,
  );
  expect(container.querySelector(`a[href="/course/${courseUuid}"]`)).toBeNull();
});
