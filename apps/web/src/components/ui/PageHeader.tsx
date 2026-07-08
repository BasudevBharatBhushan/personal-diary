import { getAccentClasses, type Accent } from "@/lib/accents";

export interface PageHeaderProps {
  emoji: string;
  title: string;
  subtitle?: string;
  accent: Accent;
}

/**
 * Big friendly page title with an emoji and optional subtitle, tinted with
 * the page's accent color. Place at the top of each page's `PageShell`.
 */
export function PageHeader({ emoji, title, subtitle, accent }: PageHeaderProps) {
  const { text, chip } = getAccentClasses(accent);

  return (
    <header className="mb-6 flex flex-col gap-2 sm:mb-8">
      <div className="flex items-center gap-3">
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl sm:h-14 sm:w-14 sm:text-3xl ${chip}`}
          aria-hidden
        >
          {emoji}
        </span>
        <h1 className={`font-heading text-2xl font-bold sm:text-3xl ${text}`}>{title}</h1>
      </div>
      {subtitle ? <p className="text-sm text-stone-500 sm:text-base">{subtitle}</p> : null}
    </header>
  );
}
