// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// @vitest-environment jsdom

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TextSection } from "./text-section";

it("renders the text content", () => {
  const text = `Em  Am\nСлова текста-${Math.random().toString(36).slice(2)}`;
  render(
    <TextSection
      chordText={text}
      size={3}
      onSizeDecrease={() => {}}
      onSizeIncrease={() => {}}
    />,
  );
  expect(screen.getByTestId("tab-text")).toHaveTextContent("Слова текста");
});

it("applies text-xs class when size is 1", () => {
  render(
    <TextSection
      chordText="some text"
      size={1}
      onSizeDecrease={() => {}}
      onSizeIncrease={() => {}}
    />,
  );
  expect(screen.getByTestId("tab-text")).toHaveClass("text-xs");
});

it("applies text-2xl class when size is 5", () => {
  render(
    <TextSection
      chordText="some text"
      size={5}
      onSizeDecrease={() => {}}
      onSizeIncrease={() => {}}
    />,
  );
  expect(screen.getByTestId("tab-text")).toHaveClass("text-2xl");
});

it("calls onSizeDecrease when decrease button is clicked", async () => {
  const onSizeDecrease = vi.fn();
  render(
    <TextSection
      chordText="text"
      size={3}
      onSizeDecrease={onSizeDecrease}
      onSizeIncrease={() => {}}
    />,
  );
  await userEvent.click(screen.getByRole("button", { name: /decrease/i }));
  expect(onSizeDecrease).toHaveBeenCalledOnce();
});

it("renders h4 with text-destructive class", () => {
  render(
    <TextSection
      chordText={"#### Акцент-раздел"}
      size={3}
      onSizeDecrease={() => {}}
      onSizeIncrease={() => {}}
    />,
  );
  expect(screen.getByRole("heading", { level: 4 })).toHaveClass("text-destructive");
});

it("renders h5 with text-destructive class", () => {
  render(
    <TextSection
      chordText={"##### Акцент-подраздел"}
      size={3}
      onSizeDecrease={() => {}}
      onSizeIncrease={() => {}}
    />,
  );
  expect(screen.getByRole("heading", { level: 5 })).toHaveClass("text-destructive");
});

it("renders h6 with bg-muted class", () => {
  render(
    <TextSection
      chordText={"###### Аккорд-метка"}
      size={3}
      onSizeDecrease={() => {}}
      onSizeIncrease={() => {}}
    />,
  );
  expect(screen.getByRole("heading", { level: 6 })).toHaveClass("bg-muted");
});

it("renders inline code with font-mono class", () => {
  const { container } = render(
    <TextSection
      chordText={"Играй `Em7` здесь"}
      size={3}
      onSizeDecrease={() => {}}
      onSizeIncrease={() => {}}
    />,
  );
  expect(container.querySelector("code")).toHaveClass("font-mono");
});

it("renders fenced code block pre with overflow-x-auto class", () => {
  const { container } = render(
    <TextSection
      chordText={"```\nEm  Am\nC   G\n```"}
      size={3}
      onSizeDecrease={() => {}}
      onSizeIncrease={() => {}}
    />,
  );
  expect(container.querySelector("pre")).toHaveClass("overflow-x-auto");
});

it("calls onSizeIncrease when increase button is clicked", async () => {
  const onSizeIncrease = vi.fn();
  render(
    <TextSection
      chordText="text"
      size={3}
      onSizeDecrease={() => {}}
      onSizeIncrease={onSizeIncrease}
    />,
  );
  await userEvent.click(screen.getByRole("button", { name: /increase/i }));
  expect(onSizeIncrease).toHaveBeenCalledOnce();
});

function randomChord(): string {
  const chords = ["Am", "F#m", "Hm7", "Dsus2", "C#dim"];
  return chords[Math.floor(Math.random() * chords.length)];
}

function renderChordText(chordText: string): HTMLElement {
  render(
    <TextSection
      chordText={chordText}
      size={3}
      onSizeDecrease={() => {}}
      onSizeIncrease={() => {}}
    />,
  );
  return screen.getByTestId("tab-text");
}

it("renders an inline chord as its own element without brackets", () => {
  const chord = randomChord();
  const tab = renderChordText(`Мы не [${chord}]знали`);
  expect(within(tab).getByText(chord)).toBeInTheDocument();
});

it("renders a performance note glued to the chord apart from the chord name", () => {
  const chord = randomChord();
  const note = `(${Math.floor(Math.random() * 8) + 1})`;
  const tab = renderChordText(`Белый [${chord}${note}]снег`);
  expect(within(tab).getByText(chord)).toBeInTheDocument();
});

it("renders a space-separated performance note as its own element", () => {
  const note = `(${Math.floor(Math.random() * 8) + 1})`;
  const tab = renderChordText(`По имени [${randomChord()} ${note}]Солнце`);
  expect(within(tab).getByText(note)).toBeInTheDocument();
});

it("keeps a chord and its syllable inside one unbreakable word", () => {
  const chord = randomChord();
  const tab = renderChordText(`Мы не ё[${chord}]лка`);
  expect(within(tab).getAllByTestId("chord-word").at(-1)).toHaveTextContent(
    `ё${chord}лка`,
  );
});

it("renders a trailing chord after the last word as a separate word", () => {
  const chord = randomChord();
  const tab = renderChordText(`Друг [Am]друга [${chord}]`);
  expect(within(tab).getAllByTestId("chord-word").at(-1)).toHaveTextContent(chord);
});
