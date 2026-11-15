// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

interface Segment {
  chord: string | null;
  text: string;
}

interface ChordLineProps {
  line: string;
}

export function ChordLine({ line }: ChordLineProps) {
  return (
    <div className="flex flex-wrap">
      {splitWords(line).map((word, wordIndex) => (
        <span key={wordIndex} data-testid="chord-word" className="flex">
          {word.map((segment, segmentIndex) => (
            <span key={segmentIndex} className="flex flex-col">
              <ChordLabel chord={segment.chord} />
              <span className="whitespace-pre">{segment.text}</span>
            </span>
          ))}
        </span>
      ))}
    </div>
  );
}

const NBSP = "\u00a0";

function ChordLabel({ chord }: { chord: string | null }) {
  if (chord === null) return <span>{NBSP}</span>;
  const cut = chord.search(/[\s(]/);
  const name = cut === -1 ? chord : chord.slice(0, cut);
  const note = cut === -1 ? "" : chord.slice(cut).trim();
  return (
    <span className="pr-1">
      <span className="font-semibold">{name}</span>
      {note && (
        <span className="text-muted-foreground ml-0.5 text-[0.75em]">{note}</span>
      )}
    </span>
  );
}

function splitWords(line: string): Segment[][] {
  const words = line.trim().match(/(?:\[[^\]]*\]|\S)+/g) ?? [];
  return words.map((word, index) =>
    splitSegments(index === words.length - 1 ? word : `${word} `),
  );
}

function splitSegments(word: string): Segment[] {
  const [leading, ...rest] = word.split(/\[([^\]]*)\]/);
  const segments: Segment[] = leading ? [{ chord: null, text: leading }] : [];
  for (let i = 0; i < rest.length; i += 2) {
    segments.push({ chord: rest[i], text: rest[i + 1] });
  }
  return segments;
}
