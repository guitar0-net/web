// SPDX-FileCopyrightText: 2026 Andrey Kotlyar <guitar0.app@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import Link from "next/link";
import { FaTelegram, FaVk, FaYoutube, FaGithub } from "react-icons/fa";
import { SiGoogleplay } from "react-icons/si";

import { Logo } from "./logo";
import { ThemeSwitcher } from "./theme-switcher";
import { Separator } from "./ui/separator";

export const START_YEAR = 2018;

const SOCIAL_LINKS = [
  { href: "https://www.youtube.com/@0guitars", icon: FaYoutube, label: "YouTube" },
  { href: "https://t.me/konograi", icon: FaTelegram, label: "Telegram" },
  { href: "https://vk.com/0guitars", icon: FaVk, label: "ВКонтакте" },
  { href: "https://github.com/guitar0-net", icon: FaGithub, label: "Github" },
] as const;

const APP_LINKS = [
  {
    href: "https://play.google.com/store/apps/details?id=com.andreykotlyar.guitar0",
    icon: SiGoogleplay,
    label: "Google Play",
  },
] as const;

export function Footer() {
  const currentYear = new Date().getFullYear();
  const displayYear =
    currentYear > START_YEAR ? `${START_YEAR}–${currentYear}` : START_YEAR;
  return (
    <footer className="border-t px-1 py-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-[3fr_2fr_2fr_1fr] items-center gap-2">
          <div>
            <Logo />
            <span className="text-muted-foreground text-sm">
              Бесплатная, open-source платформа для изучения игры на гитаре.
            </span>
          </div>

          <div className="flex flex-col gap-2 md:gap-3">
            <span>Приложения</span>
            {APP_LINKS.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Icon className="size-5" />
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2 md:gap-3">
            <span>Сообщество</span>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
                <Link
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon className="size-5" />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-end self-end">
            <ThemeSwitcher />
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between">
          <span className="text-muted-foreground text-sm">
            © {displayYear} Гитара с нуля
          </span>
          <Link href={"/privacy-policy"} className="text-muted-foreground text-sm">
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  );
}
