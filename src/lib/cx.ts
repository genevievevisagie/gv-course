// Tiny classnames helper (no dependency) used across components.
export function clsx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
