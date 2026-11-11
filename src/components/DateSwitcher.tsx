import { ChevronLeft, ChevronRight } from './Icons'
import { dateOffset } from '../data/githubTrending'

interface Props {
  daysAgo: number // 0 = 今天，1 = 昨天（默认）
  maxDays: number
  onChange: (daysAgo: number) => void
}

function label(daysAgo: number): string {
  if (daysAgo === 0) return '今天'
  if (daysAgo === 1) return '昨天'
  return dateOffset(daysAgo).slice(5)
}

export function DateSwitcher({ daysAgo, maxDays, onChange }: Props) {
  return (
    <div className="flex items-center gap-1" role="group" aria-label="切换日期">
      <button
        onClick={() => onChange(Math.min(daysAgo + 1, maxDays))}
        disabled={daysAgo >= maxDays}
        aria-label="往前一天"
        className="flex h-11 w-11 items-center justify-center rounded-md border border-hairline text-ink-dim transition-colors hover:border-[rgba(236,236,240,0.16)] hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft />
      </button>
      <span
        aria-live="polite"
        className="min-w-[92px] text-center font-mono text-[14px] text-ink"
      >
        {label(daysAgo)} · {dateOffset(daysAgo)}
      </span>
      <button
        onClick={() => onChange(Math.max(daysAgo - 1, 0))}
        disabled={daysAgo <= 0}
        aria-label="往后一天"
        className="flex h-11 w-11 items-center justify-center rounded-md border border-hairline text-ink-dim transition-colors hover:border-[rgba(236,236,240,0.16)] hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight />
      </button>
    </div>
  )
}
