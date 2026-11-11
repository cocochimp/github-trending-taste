import { Avatar } from './Avatar'
import { LinkIcon, RepoIcon, StarIcon, langColor } from './Icons'
import { formatStars, type Repo } from '../domain/classify'

export function RepoCard({ repo }: { repo: Repo }) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noreferrer"
      className="repo-card group block"
      aria-label={`查看仓库 ${repo.owner}/${repo.name}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar owner={repo.owner} />
          <div className="min-w-0">
            <h3 className="break-words text-[15px] font-medium text-ink">{repo.name}</h3>
            <p className="break-words text-[13px] text-ink-dim">{repo.owner}</p>
          </div>
        </div>
        <span className="flex shrink-0 items-center gap-1.5 font-mono text-[14px] text-star">
          <StarIcon className="text-star" />
          {formatStars(repo.stars)}
        </span>
      </div>

      {repo.description && (
        <p className="mt-3.5 text-[14px] leading-6 text-ink-dim">
          {repo.description}
        </p>
      )}

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3 text-[13px] text-ink-dim">
          {repo.language && (
            <span className="flex shrink-0 items-center gap-1.5">
              <span
                aria-hidden="true"
                style={{ background: langColor(repo.language) }}
                className="inline-block h-2.5 w-2.5 rounded-full"
              />
              {repo.language}
            </span>
          )}
          <span className="flex min-w-0 items-center gap-1.5">
            <RepoIcon />
            <span className="min-w-0 break-words font-mono">{repo.topics.slice(0, 2).join(' · ') || 'repo'}</span>
          </span>
        </div>
        <span className="flex shrink-0 items-center gap-1 text-[13px] text-ink-dim transition-colors group-hover:text-ink">
          查看仓库
          <LinkIcon />
        </span>
      </div>
    </a>
  )
}
