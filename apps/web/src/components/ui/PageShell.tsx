import type { ReactNode } from "react";

export interface PageShellProps {
  children: ReactNode;
}

/**
 * Consistent page container: comfortable mobile padding, a sensible max
 * width on larger screens, and bottom padding that clears the mobile
 * bottom nav. Wrap every route's page content in this.
 */
export function PageShell({ children }: PageShellProps) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-24 pt-6 sm:px-6 sm:pt-8 md:pb-10">
      {children}
    </div>
  );
}
