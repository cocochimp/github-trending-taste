import type { Repo } from '../domain/classify'
import { MOCK_REPOS } from './mockRepos'

export interface TrendingResult {
  repos: Repo[]
  /** live = 来自 GitHub API；mock = 内置示例数据（限流/断网） */
  source: 'live' | 'mock'
}

const API_URL = 'https://api.github.com/search/repositories'
const CACHE_PREFIX = 'ghtrending:'
/** 逐日缓存 6 小时，同一天内不重复打接口 */
const CACHE_TTL_MS = 6 * 60 * 60 * 1000

export function toISODate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function dateOffset(daysAgo: number): string {
  const d = new Date()
  d.setDate(d.getDate() - daysAgo)
  return toISODate(d)
}

interface CacheEntry {
  savedAt: number
  repos: Repo[]
}

function readCache(date: string): Repo[] | null {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + date)
    if (!raw) return null
    const entry = JSON.parse(raw) as CacheEntry
    if (Date.now() - entry.savedAt > CACHE_TTL_MS) return null
    if (!Array.isArray(entry.repos)) return null
    return entry.repos
  } catch {
    return null
  }
}

function writeCache(date: string, repos: Repo[]): void {
  try {
    localStorage.setItem(CACHE_PREFIX + date, JSON.stringify({ savedAt: Date.now(), repos }))
  } catch {
    // localStorage 满或被禁用：放弃缓存即可
  }
}

interface GhRepo {
  id: number
  name: string
  html_url: string
  description: string | null
  stargazers_count: number
  language: string | null
  topics?: string[]
  owner: { login: string; avatar_url: string }
}

function mapRepo(r: GhRepo): Repo {
  return {
    id: r.id,
    name: r.name,
    owner: r.owner.login,
    ownerAvatar: r.owner.avatar_url,
    description: r.description,
    stars: r.stargazers_count,
    language: r.language,
    url: r.html_url,
    topics: r.topics ?? [],
  }
}

/** 免 token 调 GitHub Search API：新建于指定日期之后、按 star 降序的前 25 个。 */
export async function fetchTrending(date: string): Promise<TrendingResult> {
  const cached = readCache(date)
  if (cached) return { repos: cached, source: 'live' }

  const url = `${API_URL}?q=${encodeURIComponent(`created:>${date}`)}&sort=stars&order=desc&per_page=25`
  try {
    const res = await fetch(url, {
      headers: { Accept: 'application/vnd.github+json' },
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = (await res.json()) as { items?: GhRepo[] }
    if (!Array.isArray(data.items) || data.items.length === 0) throw new Error('empty result')
    const repos = data.items.map(mapRepo)
    writeCache(date, repos)
    return { repos, source: 'live' }
  } catch {
    return { repos: MOCK_REPOS, source: 'mock' }
  }
}
