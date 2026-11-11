import type { DomainGroup } from '../domain/classify'
import { RepoCard } from './RepoCard'

export function RepoList({ groups }: { groups: DomainGroup[] }) {
  return (
    <>
      {groups.map((g) => (
        <section key={g.id} aria-labelledby={`domain-${g.id}`} className="pt-6 pb-2 first:pt-0">
          <h2 id={`domain-${g.id}`} className="mb-4 flex items-baseline gap-2.5">
            <span className="text-[16px] font-medium text-ink">{g.label}</span>
          </h2>
          <p className="mb-4 font-mono text-[13px] text-ink-dim">{g.repos.length} 个仓库</p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {g.repos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        </section>
      ))}
    </>
  )
}
