"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/nav";
import { getAccentClasses } from "@/lib/accents";
import { cn } from "@/lib/cn";

/**
 * App navigation. Renders as a fixed left sidebar on desktop (`md:` and up)
 * and as a fixed, horizontally-scrollable bottom nav on mobile — so it
 * never overlaps page content on small screens.
 */
export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-stone-200 bg-white p-4 md:flex">
        <div className="mb-6 px-2">
          <span className="font-heading text-xl font-bold text-sky-600">B3 OS</span>
        </div>
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} emoji={item.emoji} accent={item.accent} active={pathname === item.href} />
          ))}
        </ul>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-30 flex overflow-x-auto border-t border-stone-200 bg-white/95 backdrop-blur md:hidden">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          const { text } = getAccentClasses(item.accent);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-0.5 px-2 py-2 text-[11px] font-semibold whitespace-nowrap",
                active ? text : "text-stone-400",
              )}
            >
              <span className="text-lg" aria-hidden>
                {item.emoji}
              </span>
              {item.short}
            </Link>
          );
        })}
      </nav>
    </>
  );
}

interface NavLinkProps {
  href: string;
  label: string;
  emoji: string;
  accent: Parameters<typeof getAccentClasses>[0];
  active: boolean;
}

function NavLink({ href, label, emoji, accent, active }: NavLinkProps) {
  const { chip } = getAccentClasses(accent);

  return (
    <li>
      <Link
        href={href}
        className={cn(
          "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold transition-colors",
          active ? chip : "text-stone-500 hover:bg-stone-100",
        )}
      >
        <span aria-hidden>{emoji}</span>
        <span>{label}</span>
      </Link>
    </li>
  );
}
