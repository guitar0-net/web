// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import Image from "next/image";

import { Size } from "@/types/ui";

import type { ImageScheme } from "../api";

interface SchemeImageProps {
  scheme: ImageScheme;
  size: Size;
}

export function SchemeImage({ scheme, size }: SchemeImageProps) {
  const width = scheme.width ?? 250;
  const height = scheme.height ?? 100;
  return (
    <div className="flex flex-col items-center gap-1">
      {scheme.inscription && (
        <span className="text-muted-foreground text-xs">{scheme.inscription}</span>
      )}
      <Image
        src={scheme.image}
        alt={scheme.inscription ?? "Схема аккорда"}
        loading="eager"
        width={Math.round((width * size) / 3)}
        height={Math.round((height * size) / 3)}
        className="transition-all"
      />
    </div>
  );
}
