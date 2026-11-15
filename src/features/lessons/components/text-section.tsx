// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Text } from "lucide-react";
import ReactMarkdown, { type Components } from "react-markdown";

import { ControlGroup } from "@/components/controls/control-group";
import { SizeControl } from "@/components/controls/size-control";
import { SectionHeader } from "@/components/section-header";
import { cn } from "@/lib/utils";
import { Size } from "@/types/ui";

import { ChordLine } from "./chord-line";

const TEXT_SIZE: Record<Size, string> = {
  1: "text-xs",
  2: "text-base",
  3: "text-lg",
  4: "text-xl",
  5: "text-2xl",
};

const MARKDOWN_COMPONENTS: Components = {
  pre: ({ children, node: _node, ...props }) => (
    <pre {...props} className="overflow-x-auto font-mono whitespace-pre">
      {children}
    </pre>
  ),
  code: ({ children, node: _node, ...props }) => (
    <code {...props} className="font-mono">
      {children}
    </code>
  ),
  h4: ({ children, node: _node, ...props }) => (
    <h4 {...props} className="text-destructive font-medium">
      {children}
    </h4>
  ),
  h5: ({ children, node: _node, ...props }) => (
    <h5 {...props} className="text-destructive font-medium">
      {children}
    </h5>
  ),
  h6: ({ children, node: _node, ...props }) => (
    <h6 {...props} className="bg-muted text-muted-foreground rounded p-1 font-bold">
      {children}
    </h6>
  ),
};

interface TextSectionProps {
  chordText: string;
  size: Size;
  onSizeDecrease: () => void;
  onSizeIncrease: () => void;
}

export function TextSection({
  chordText,
  size,
  onSizeDecrease,
  onSizeIncrease,
}: TextSectionProps) {
  const TextControlGroup = (
    <ControlGroup>
      <SizeControl
        value={size}
        onDecrease={onSizeDecrease}
        onIncrease={onSizeIncrease}
      />
    </ControlGroup>
  );
  return (
    <section>
      <SectionHeader Icon={Text} title="Текст" ControlGroup={TextControlGroup} />
      <div data-testid="tab-text" className={cn(TEXT_SIZE[size], "space-y-2")}>
        {splitBlocks(chordText).map((block, index) =>
          block.kind === "chords" ? (
            <ChordLine key={index} line={block.line} />
          ) : (
            <ReactMarkdown key={index} components={MARKDOWN_COMPONENTS}>
              {block.markdown}
            </ReactMarkdown>
          ),
        )}
      </div>
    </section>
  );
}

type Block = { kind: "chords"; line: string } | { kind: "markdown"; markdown: string };

function splitBlocks(chordText: string): Block[] {
  const blocks: Block[] = [];
  let markdownLines: string[] = [];
  const flushMarkdown = (): void => {
    if (markdownLines.some((line) => line.trim())) {
      blocks.push({ kind: "markdown", markdown: markdownLines.join("\n") });
    }
    markdownLines = [];
  };
  for (const line of chordText.split(/\r?\n/)) {
    if (line.includes("[")) {
      flushMarkdown();
      blocks.push({ kind: "chords", line });
    } else {
      markdownLines.push(line);
    }
  }
  flushMarkdown();
  return blocks;
}
