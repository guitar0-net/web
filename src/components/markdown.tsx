// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/* v8 ignore file */

import ReactMarkdown from "react-markdown";

import { cn } from "@/lib/utils";

interface MarkdownProps {
  children: string;
  className?: string;
}

export function Markdown({ children, className }: MarkdownProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <ReactMarkdown
        components={{
          h1: ({ node: _node, ...props }) => (
            <h1 {...props} className="text-2xl font-bold" />
          ),
          h2: ({ node: _node, ...props }) => (
            <h2 {...props} className="text-xl font-semibold" />
          ),
          h3: ({ node: _node, ...props }) => (
            <h3 {...props} className="text-lg font-semibold" />
          ),
          h4: ({ node: _node, ...props }) => (
            <h4 {...props} className="text-base font-semibold" />
          ),
          h5: ({ node: _node, ...props }) => (
            <h5 {...props} className="text-sm font-semibold" />
          ),
          h6: ({ node: _node, ...props }) => (
            <h6 {...props} className="text-muted-foreground text-sm font-medium" />
          ),
          ul: ({ node: _node, ...props }) => (
            <ul {...props} className="list-disc space-y-1 pl-5" />
          ),
          ol: ({ node: _node, ...props }) => (
            <ol {...props} className="list-decimal space-y-1 pl-5" />
          ),
          blockquote: ({ node: _node, ...props }) => (
            <blockquote
              {...props}
              className="text-muted-foreground border-l-2 pl-4 italic"
            />
          ),
          code: ({ node: _node, ...props }) => (
            <code {...props} className="bg-muted rounded px-1 font-mono text-sm" />
          ),
          pre: ({ node: _node, ...props }) => (
            <pre
              {...props}
              className="bg-muted overflow-x-auto rounded p-3 font-mono text-sm"
            />
          ),
          a: ({ node: _node, ...props }) => (
            <a {...props} className="hover:text-primary underline underline-offset-2" />
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
