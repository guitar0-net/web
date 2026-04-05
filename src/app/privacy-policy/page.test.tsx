// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";

import PrivacyPolicy from "./page";

describe("Privacy policy", () => {
  it("contain email", () => {
    render(<PrivacyPolicy />);
    expect(screen.getByText(/guitar0\.app@gmail\.com/i)).toBeInTheDocument();
  });
});
