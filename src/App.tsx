import { useEffect, useMemo, useState } from 'react'
import { fetchTrending, dateOffset } from './data/githubTrending'
import { groupByDomain, type DomainGroup } from './domain/classify'
import { DomainBar } from './components/DomainBar'
import { RepoList } from './components/RepoList'
import { DateSwitcher } from './components/DateSwitcher'
import { StarIcon } from './components/Icons'

const MAX_DAYS = 6 // 最近 7 天可选

export default function App() {
  const [daysAgo, setDaysAgo] = useState(1) // 默认昨天
  const [selected, setSelected] = useState<string | null>(null)
  const [repos, setRepos] = useState<DomainGroup[]>([])
  const [source, setSource] = useState<'live' | 'mock' | null>(null)
  const [totalStars, setTotalStars] = useState(0)
  const [loading, setLoading] = useState(true)

  const date = dateOffset(daysAgo)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetchTrending(date).then((r) => {
      if (cancelled) return
      setRepos(groupByDomain(r.repos))
      setSource(r.source)
      setTotalStars(r.repos.reduce((s, x) => s + x.stars, 0))
      setLoading(false)
    })
    return () => {
      cancelled = true
    }
  }, [date])

  const filtered = useMemo(
    () => (selected ? repos.filter((g) => g.id === selected) : repos),
    [repos, selected],
  )
  const total = useMemo(() => repos.reduce((s, g) => s + g.repos.length, 0), [repos])

  return (
    <div className="min-h-screen bg-page">
      {/* 一个 wrap 通到页脚：左右等边距 */}
      <a
        href="#main"
        className="absolute left-4 top-2 z-50 -translate-y-20 rounded bg-ink px-3 py-2 text-[13px] text-page transition-transform focus-visible:translate-y-0"
      >
        跳到榜单
      </a>
      <div className="mx-auto max-w-wrap px-6 pb-24 md:px-10">
        <header className="flex flex-col gap-6 pt-10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-[24px] font-semibold tracking-tight text-ink md:text-[28px]">
              GitHub 每日热门
            </h1>
            <p className="mt-2 text-[14px] leading-6 text-ink-dim">
              {date} 之后新建的仓库，按 star 排序的前 {total} 个。
            </p>
            <p className="mt-1.5 flex items-center gap-1.5 font-mono text-[13px] text-ink-dim">
              <StarIcon className="text-star" />
              共 {totalStars.toLocaleString()} star，数据来自 GitHub Search API。
            </p>
          </div>
          <DateSwitcher daysAgo={daysAgo} maxDays={MAX_DAYS} onChange={setDaysAgo} />
        </header>

        {source === 'mock' && (
          <p className="mb-6 rounded-md border border-star/30 bg-star/10 px-4 py-3 text-[14px] text-ink">
            接口被限流或当前断网，下面是内置的示例数据，不是实时的 star 榜。
          </p>
        )}

        <main id="main">
          {loading ? (
            <p className="py-20 text-center text-[14px] text-ink-dim">正在读取 {date} 的榜单…</p>
          ) : repos.length === 0 ? (
            <p className="py-20 text-center text-[14px] text-ink-dim">
              {date} 之后没有拿到任何仓库。
            </p>
          ) : (
            <>
              <section className="mb-10">
                <DomainBar
                  groups={repos}
                  total={total}
                  selected={selected}
                  onSelect={setSelected}
                />
              </section>
              <RepoList groups={filtered} />
            </>
          )}
        </main>

        <footer className="mt-16 border-t border-hairline pt-6 text-[13px] text-ink-dim">
          逐日数据缓存在浏览器里，6 小时后自动过期重取。
        </footer>
      </div>
    </div>
  )
}
