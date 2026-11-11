# github-trending-taste

GitHub 每日热门趋势面板：按主题领域聚类展示每天新建的热门仓库。

- 数据源：GitHub Search API（`created:>日期` + 按 star 排序，前 25 条），免 token
- 交互：顶部分布条（每段宽度 = 该领域仓数，点选下钻）+ 按领域分组的项目卡片 + 日期切换
- 兜底：限流 / 断网时自动切换内置 mock 数据，页面明确标注数据来源
- 工程结构：`src/data`（API 客户端 + localStorage 逐日缓存 + mock）、`src/domain`（主题聚类关键词映射，可拓展新领域）、`src/components`（UI 组件）

在线访问：https://cocochimp.github.io/github-trending-taste/

## 本地开发

```bash
npm install
npm run dev
```

## 设计

UI 由 tasteskill（github.com/leonxlnx/taste-skill）方法论生成：深色单系统，唯一强调色为 GitHub star 黄，octicon 真实图标，克制的微交互。
