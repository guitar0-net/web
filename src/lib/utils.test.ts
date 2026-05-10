// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { cn, pluralizeRu, secToMin } from "./utils";

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

describe("secToMin", () => {
  it("formats zero seconds as 0:00", () => {
    expect(secToMin(0)).toBe("0:00");
  });

  it("pads single-digit seconds with a leading zero", () => {
    expect(secToMin(7)).toBe("0:07");
  });

  it("formats double-digit seconds without padding", () => {
    expect(secToMin(45)).toBe("0:45");
  });

  it("formats an exact minute", () => {
    expect(secToMin(60)).toBe("1:00");
  });

  it("pads seconds when minutes are present", () => {
    expect(secToMin(65)).toBe("1:05");
  });

  it("formats minutes and seconds without leading zero on minutes", () => {
    expect(secToMin(754)).toBe("12:34");
  });

  it("formats 59:59 without hours segment", () => {
    expect(secToMin(3599)).toBe("59:59");
  });

  it("shows hours when duration reaches exactly one hour", () => {
    expect(secToMin(3600)).toBe("1:00:00");
  });

  it("pads minutes and seconds with leading zeros in hours format", () => {
    expect(secToMin(3661)).toBe("1:01:01");
  });

  it("handles multi-hour durations", () => {
    expect(secToMin(7384)).toBe("2:03:04");
  });

  it("truncates fractional seconds", () => {
    expect(secToMin(90.9)).toBe("1:30");
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
