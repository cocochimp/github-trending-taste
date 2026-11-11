import type { DomainGroup } from '../domain/classify'

interface Props {
  groups: DomainGroup[]
  total: number
  selected: string | null
  onSelect: (id: string | null) => void
}

/** 顶部领域分布条：每段宽度 = 该领域仓数占比，点选下钻筛选（数据即导航） */
export function DomainBar({ groups, total, selected, onSelect }: Props) {
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="text-[16px] font-medium text-ink">领域分布</h2>
        <span className="font-mono text-[13px] text-ink-dim">{total} 个仓库</span>
      </div>
      <div
        role="group"
        aria-label="按领域筛选"
        className="flex h-12 w-full gap-1 overflow-hidden rounded-md"
      >
        {groups.map((g) => {
          const pct = Math.round((g.repos.length / total) * 100)
          const active = selected === g.id
          return (
            <button
              key={g.id}
              onClick={() => onSelect(active ? null : g.id)}
              aria-pressed={active}
              style={{
                background: g.color,
                width: `${pct}%`,
                minWidth: '44px',
                opacity: selected === null || active ? 1 : 0.45,
              }}
              className="domain-seg relative flex items-center justify-center overflow-hidden rounded-[4px]"
              title={`${g.label} ${g.repos.length} 个`}
            >
              {pct >= 12 && (
                <span className="hidden truncate px-2 text-[13px] font-medium text-[#0a0a0c] md:block">
                  {g.label} {g.repos.length}
                </span>
              )}
            </button>
          )
        })}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          {groups.map((g) => (
            <button
              key={g.id}
              onClick={() => onSelect(selected === g.id ? null : g.id)}
              aria-pressed={selected === g.id}
              className="flex min-h-[44px] items-center gap-1.5 text-[13px] text-ink-dim hover:text-ink"
            >
              <span
                aria-hidden="true"
                style={{ background: g.color }}
                className="inline-block h-2.5 w-2.5 rounded-full"
              />
              {g.label}
              <span className="font-mono">{g.repos.length}</span>
            </button>
          ))}
        </div>
        {selected && (
          <button
            onClick={() => onSelect(null)}
            className="min-h-[44px] shrink-0 text-[13px] text-ink-dim underline-offset-4 hover:text-ink hover:underline"
          >
            显示全部
          </button>
        )}
      </div>
    </div>
  )
}
