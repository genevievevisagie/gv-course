import { clsx } from "@/lib/cx";

/**
 * Dexy logo — a maroon circular badge with a serif "D" monogram, paired with
 * the Fraunces wordmark. `size` controls the badge; `wordmark` toggles the text.
 */
export function Logo({
  size = 28,
  wordmark = true,
  className,
}: {
  size?: number;
  wordmark?: boolean;
  className?: string;
}) {
  return (
    <span className={clsx("inline-flex items-center gap-2", className)}>
      <span
        aria-hidden
        className="relative grid place-items-center rounded-full bg-maroon ring-1 ring-black/20"
        style={{ width: size, height: size }}
      >
        <span
          className="font-serif font-semibold leading-none text-cream"
          style={{ fontSize: size * 0.58 }}
        >
          D
        </span>
        <span
          className="absolute rounded-full ring-1 ring-cream/25"
          style={{ inset: size * 0.13 }}
        />
      </span>
      {wordmark && (
        <span
          className="font-serif font-medium tracking-wide text-cream"
          style={{ fontSize: size * 0.82 }}
        >
          DEXY
        </span>
      )}
    </span>
  );
}
