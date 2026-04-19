// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { REVIEWS } from "../constants";
import { ReviewsSection } from "./reviews-section";

describe("Reviews section", () => {
  it("Displays the main heading to the user.", () => {
    render(<ReviewsSection />);
    expect(screen.getByText(/Что говорят ученики/i)).toBeDefined();
  });

  it("Displays the description of the section.", () => {
    render(<ReviewsSection />);
    expect(screen.getByText(/Реальные отзывы пользователей/i)).toBeDefined();
  });

  it("Provides a link to the application page on Google Play.", () => {
    render(<ReviewsSection />);
    const link = screen.getByRole("link", { name: /Google Play/i });
    expect(link.getAttribute("href")).toContain("play.google.com");
  });

  it("Renders the author of the first review.", () => {
    render(<ReviewsSection />);
    expect(screen.getByText(REVIEWS[0].author)).toBeDefined();
  });

  it("Renders the date of the second review.", () => {
    render(<ReviewsSection />);
    expect(screen.getByText(REVIEWS[1].date)).toBeDefined();
  });

  it("Renders a portion of the text from the third review.", () => {
    render(<ReviewsSection />);
    const snippet = REVIEWS[2].text.substring(0, 15);
    expect(screen.getByText(new RegExp(snippet))).toBeDefined();
  });
});
