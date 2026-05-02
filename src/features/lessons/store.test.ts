// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { createSongPreferencesStore } from "./store";

vi.stubGlobal("window", {
  localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
});

it("has default schemeSize of 3", () => {
  const store = createSongPreferencesStore();
  expect(store.getState().schemeSize).toBe(3);
});

it("has default chordSize of 3", () => {
  const store = createSongPreferencesStore();
  expect(store.getState().chordSize).toBe(3);
});

it("has default textSize of 3", () => {
  const store = createSongPreferencesStore();
  expect(store.getState().textSize).toBe(3);
});

it("has default videoSize of 3", () => {
  const store = createSongPreferencesStore();
  expect(store.getState().videoSize).toBe(3);
});

it("has default videoVisible of true", () => {
  const store = createSongPreferencesStore();
  expect(store.getState().videoVisible).toBe(true);
});

it("has default videoPinned of false", () => {
  const store = createSongPreferencesStore();
  expect(store.getState().videoPinned).toBe(false);
});

it("has default chordOrientation of vertical", () => {
  const store = createSongPreferencesStore();
  expect(store.getState().chordOrientation).toBe("vertical");
});

it("increaseSize increases schemeSize by 1", () => {
  const store = createSongPreferencesStore();
  store.getState().increaseSize("schemeSize");
  expect(store.getState().schemeSize).toBe(4);
});

it("increaseSize clamps schemeSize at 5", () => {
  const store = createSongPreferencesStore();
  const { increaseSize } = store.getState();
  increaseSize("schemeSize");
  increaseSize("schemeSize");
  increaseSize("schemeSize");
  expect(store.getState().schemeSize).toBe(5);
});

it("decreaseSize decreases chordSize by 1", () => {
  const store = createSongPreferencesStore();
  store.getState().decreaseSize("chordSize");
  expect(store.getState().chordSize).toBe(2);
});

it("decreaseSize clamps chordSize at 1", () => {
  const store = createSongPreferencesStore();
  const { decreaseSize } = store.getState();
  decreaseSize("chordSize");
  decreaseSize("chordSize");
  decreaseSize("chordSize");
  expect(store.getState().chordSize).toBe(1);
});

it("decreaseSize clamps textSize at 1", () => {
  const store = createSongPreferencesStore();
  const { decreaseSize } = store.getState();
  decreaseSize("textSize");
  decreaseSize("textSize");
  decreaseSize("textSize");
  expect(store.getState().textSize).toBe(1);
});

it("increaseSize clamps videoSize at 5", () => {
  const store = createSongPreferencesStore();
  const { increaseSize } = store.getState();
  increaseSize("videoSize");
  increaseSize("videoSize");
  increaseSize("videoSize");
  expect(store.getState().videoSize).toBe(5);
});

it("toggle flips schemeVisible from true to false", () => {
  const store = createSongPreferencesStore();
  store.getState().toggle("schemeVisible");
  expect(store.getState().schemeVisible).toBe(false);
});

it("toggle flips chordVisible back to true", () => {
  const store = createSongPreferencesStore();
  store.getState().toggle("chordVisible");
  store.getState().toggle("chordVisible");
  expect(store.getState().chordVisible).toBe(true);
});

it("toggle flips videoPinned from false to true", () => {
  const store = createSongPreferencesStore();
  store.getState().toggle("videoPinned");
  expect(store.getState().videoPinned).toBe(true);
});

it("toggleChordOrientation flips from vertical to horizontal", () => {
  const store = createSongPreferencesStore();
  store.getState().toggleChordOrientation();
  expect(store.getState().chordOrientation).toBe("horizontal");
});

it("toggleChordOrientation flips back from horizontal to vertical", () => {
  const store = createSongPreferencesStore();
  store.getState().toggleChordOrientation();
  store.getState().toggleChordOrientation();
  expect(store.getState().chordOrientation).toBe("vertical");
});
