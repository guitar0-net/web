// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/* v8 ignore file */

import Image from "next/image";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        className="size-11 md:size-13"
        src={"/images/logo.png"}
        width={84}
        height={84}
        alt="Logo"
      />
      <span className="font-debby text-primary text-2xl md:text-3xl">
        Гитара с нуля
      </span>
    </div>
  );
}
