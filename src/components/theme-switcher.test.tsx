// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useTheme } from "next-themes";
import { renderToString } from "react-dom/server";

import { ThemeSwitcher } from "./theme-switcher";

vi.mock("next-themes", () => ({ useTheme: vi.fn() }));

type UseThemeReturn = ReturnType<typeof useTheme>;

function mockTheme(
  theme: UseThemeReturn["theme"],
  setTheme: UseThemeReturn["setTheme"] = vi.fn(),
) {
  const value: Partial<UseThemeReturn> = {
    theme,
    setTheme,
  };
  vi.mocked(useTheme).mockReturnValue(value as UseThemeReturn);
}

describe("ThemeSwitcher", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders nothing on the server", () => {
    mockTheme("light");
    expect(renderToString(<ThemeSwitcher />)).toBeFalsy();
  });

  it.each([
    ["system", "System"],
    ["light", "Light"],
    ["dark", "Dark"],
  ] as const)(
    "marks the %s button as pressed when the active theme is %s",
    (theme, buttonName) => {
      mockTheme(theme);
      render(<ThemeSwitcher />);
      expect(screen.getByRole("button", { name: buttonName })).toHaveAttribute(
        "aria-pressed",
        "true",
      );
    },
  );

  it("does not mark inactive buttons as pressed", () => {
    mockTheme("dark");
    render(<ThemeSwitcher />);
    expect(screen.getByRole("button", { name: "Light" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it.each([
    ["system", "System"],
    ["light", "Light"],
    ["dark", "Dark"],
  ] as const)(
    "calls setTheme with '%s' when the %s button is clicked",
    async (themeValue, buttonName) => {
      const setTheme = vi.fn();
      mockTheme("light", setTheme);
      render(<ThemeSwitcher />);
      await userEvent.click(screen.getByRole("button", { name: buttonName }));
      expect(setTheme).toHaveBeenCalledWith(themeValue);
    },
  );

  it("renders three buttons", () => {
    mockTheme("light");
    render(<ThemeSwitcher />);
    expect(screen.getAllByRole("button")).toHaveLength(3);
  });
});
