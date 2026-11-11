// GitHub 官方 octicon 的真实路径数据（github/octicons），等比 16 视图框。
type P = { d: string }

const STAR: P = { d: 'M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.661A.75.75 0 0 1 8 .25Z' }
const REPO: P = { d: 'M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8.5ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z' }
const LINK: P = { d: 'M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 1.5 0v3.5A1.75 1.75 0 0 1 13.25 14h-8.5A1.75 1.75 0 0 1 3 12.25v-8.5A1.75 1.75 0 0 1 4.75 2Zm6.5 0h3.75a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V4.56l-4.72 4.72a.75.75 0 1 1-1.06-1.06L13.94 3.5h-2.69a.75.75 0 0 1 0-1.5Z' }
const LEFT: P = { d: 'M9.78 12.78a.75.75 0 0 1-1.06 0L4.47 8.53a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 1 1 1.06 1.06L6.06 8l3.72 3.72a.75.75 0 0 1 0 1.06Z' }
const RIGHT: P = { d: 'M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z' }

function icon(p: P, size = 16) {
  return (props: { className?: string }) => (
    <svg viewBox="0 0 16 16" width={size} height={size} aria-hidden="true" className={props.className}>
      <path fill="currentColor" d={p.d} />
    </svg>
  )
}

export const StarIcon = icon(STAR)
export const RepoIcon = icon(REPO)
export const LinkIcon = icon(LINK)
export const ChevronLeft = icon(LEFT)
export const ChevronRight = icon(RIGHT)

// GitHub Linguist 常用语言色（真实官方配色，缺省中性灰）
const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Rust: '#dea584',
  Go: '#00ADD8',
  'C++': '#f34b7d',
  C: '#555555',
  Java: '#b07219',
  Ruby: '#701516',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Zig: '#ec915c',
  Lua: '#000080',
  Shell: '#89e051',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#41b883',
  Svelte: '#ff3e00',
  MDX: '#fcb32c',
  Dockerfile: '#384d54',
}

export function langColor(language: string | null): string {
  if (!language) return '#6b6b74'
  return LANG_COLORS[language] ?? '#8b949e'
}
