// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// @vitest-environment jsdom

import { render } from "@testing-library/react";

import { ReviewCard } from "./review-card";

it("renders filled stars equal to rating", () => {
  const rating = 3;
  const { container } = render(
    <ReviewCard
      review={{
        id: crypto.randomUUID(),
        author: "Автор",
        date: "2026-01-01",
        text: "Текст",
        rating,
      }}
    />,
  );
  expect(container.querySelectorAll(".fill-primary").length).toBe(rating);
});

it("renders empty stars for positions above rating", () => {
  const rating = 3;
  const { container } = render(
    <ReviewCard
      review={{
        id: crypto.randomUUID(),
        author: "Автор",
        date: "2026-01-01",
        text: "Текст",
        rating,
      }}
    />,
  );
  expect(container.querySelectorAll(".fill-muted").length).toBe(5 - rating);
});
