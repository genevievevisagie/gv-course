import { RANK_META } from "@/lib/analysis";
import type { Rank } from "@/lib/types";
import { clsx } from "@/lib/cx";

export function RankBadge({ rank, score }: { rank: Rank; score?: number }) {
  const m = RANK_META[rank];
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold",
        m.className,
      )}
    >
      <span className={clsx("h-1.5 w-1.5 rounded-full", m.dot)} />
      {m.label}
      {typeof score === "number" && (
        <span className="opacity-60">· {score}</span>
      )}
    </span>
  );
}
