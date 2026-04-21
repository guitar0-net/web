// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { cn, pluralizeRu } from "./utils";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("resolves tailwind conflicts", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("ignores falsy values", () => {
    expect(cn("a", false, undefined, null, "b")).toBe("a b");
  });

  it("handles conditional classes", () => {
    expect(cn("base", { active: true, disabled: false })).toBe("base active");
  });
});

describe("pluralizeRu", () => {
  it.each([
    [0, "уроков"],
    [1, "урок"],
    [2, "урока"],
    [4, "урока"],
    [5, "уроков"],
    [11, "уроков"],
    [12, "уроков"],
    [14, "уроков"],
    [21, "урок"],
    [22, "урока"],
    [51, "урок"],
    [100, "уроков"],
    [101, "урок"],
    [111, "уроков"],
  ])("count %i → %s", (count, expected) => {
    expect(pluralizeRu(count, "урок", "урока", "уроков")).toBe(expected);
  });
});
