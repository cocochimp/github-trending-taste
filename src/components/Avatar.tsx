import { useState } from 'react'

/** owner 头像：真实 GitHub 头像，加载失败退为首字母圆盘（mock/断网时不留空位） */
export function Avatar({ owner, size = 40 }: { owner: string; size?: number }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <span
        aria-hidden="true"
        style={{ width: size, height: size, fontSize: size * 0.42 }}
        className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#24242a] font-mono text-ink-dim"
      >
        {owner.slice(0, 1).toUpperCase()}
      </span>
    )
  }
  return (
    <img
      src={`https://github.com/${owner}.png?size=${size * 2}`}
      alt={`${owner} 的头像`}
      width={size}
      height={size}
      loading="lazy"
      onError={() => setFailed(true)}
      className="shrink-0 rounded-full border border-hairline"
    />
  )
}
