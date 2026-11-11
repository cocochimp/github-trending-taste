import { DOMAIN_DEFS, DOMAIN_ORDER } from './keywords'

export interface Repo {
  id: number
  name: string
  owner: string
  ownerAvatar: string
  description: string | null
  stars: number
  language: string | null
  url: string
  topics: string[]
}

/** 单个仓库归入哪个领域；命中顺序即 DOMAIN_DEFS 顺序，兜底「其它」。 */
export function classifyRepo(repo: Repo): string {
  const topics = repo.topics.map((t) => t.toLowerCase())
  const text = `${repo.name} ${repo.description ?? ''}`.toLowerCase()
  for (const def of DOMAIN_DEFS) {
    if (def.id === 'other') continue
    if (topics.some((t) => def.topics.includes(t))) return def.id
    if (def.words.some((w) => text.includes(w))) return def.id
  }
  return 'other'
}

export interface DomainGroup {
  id: string
  label: string
  color: string
  repos: Repo[]
}

/** 按固定领域顺序分组，返回有仓的组。 */
export function groupByDomain(repos: Repo[]): DomainGroup[] {
  const groups = new Map<string, Repo[]>()
  for (const r of repos) {
    const id = classifyRepo(r)
    if (!groups.has(id)) groups.set(id, [])
    groups.get(id)!.push(r)
  }
  return DOMAIN_ORDER
    .filter((id) => groups.has(id))
    .map((id) => {
      const def = DOMAIN_DEFS.find((d) => d.id === id)!
      return { id, label: def.label, color: def.color, repos: groups.get(id)! }
    })
}

export function formatStars(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k`
  return String(n)
}
