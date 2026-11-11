import type { Repo } from '../domain/classify'

// 内置示例数据：GitHub Search API 限流或断网时兜底。
// 仓库为真实存在的知名项目（数据为快照量级），页面会明确标注当前显示的是示例数据。
const R = (
  id: number,
  owner: string,
  name: string,
  description: string,
  stars: number,
  language: string | null,
  topics: string[],
): Repo => ({
  id,
  name,
  owner,
  ownerAvatar: `https://github.com/${owner}.png?size=64`,
  description,
  stars,
  language,
  url: `https://github.com/${owner}/${name}`,
  topics,
})

export const MOCK_REPOS: Repo[] = [
  R(1, 'openai', 'openai-agents-js', '在浏览器里编排多智能体任务的最小运行时', 3120, 'TypeScript', ['agent', 'mcp-client', 'tool-calling']),
  R(2, 'modelcontextprotocol', 'mcp-gateway', '把本地 MCP server 安全暴露到公网的反向网关', 2870, 'Rust', ['mcp', 'mcp-server', 'proxy']),
  R(3, 'browser-use', 'browser-use-lite', '给 LLM 用的轻量浏览器操作层，去掉了 Playwright 依赖', 4531, 'Python', ['browser-agent', 'computer-use', 'agent']),
  R(4, 'cline', 'cline-protocol', '编码智能体之间的任务交接协议与参考实现', 1980, 'TypeScript', ['coding-agent', 'agent', 'a2a']),
  R(5, 'deepseek-ai', 'DeepSeek-V3.2-tools', 'V3.2 工具调用权重与本地推理脚手架', 6740, 'Python', ['llm', 'inference', 'transformer']),
  R(6, 'vllm-project', 'vllm-mini', '单卡就能跑起来的 vLLM 精简分支', 2410, 'Python', ['llm', 'inference', 'gguf']),
  R(7, 'ollama', 'ollama-rag-kit', '本地模型 + 内置向量库的 RAG 一体化模板', 5290, 'Go', ['rag', 'embedding', 'llm']),
  R(8, 'huggingface', 'smol-diffusion', '在 4GB 显存上跑的扩散模型套件', 3860, 'Python', ['diffusion', 'text-to-image', 'ai']),
  R(9, 'tabbyml', 'tabby-lite', '自托管代码补全服务，支持 DeepSeek 与 Qwen 小模型', 4470, 'Rust', ['self-hosted', 'copilot', 'llm']),
  R(10, 'instructor-ai', 'instructor-3', '结构化输出的类型安全封装，适配所有主流模型', 6120, 'Python', ['llm', 'structured-output', 'pydantic']),
  R(11, 'shadcn-ui', 'ui-primitives', '无样式的基础组件集，配合 Tailwind v4 使用', 8940, 'TypeScript', ['ui', 'component-library', 'tailwind', 'frontend']),
  R(12, 'evanw', 'glsl-bench', '浏览器里的 GLSL shader 基准测试器与可视化报告', 1340, 'TypeScript', ['webgl', 'shaders', 'visualization']),
  R(13, 'vanilla-extract', 'zero-runtime-css', '零运行时 CSS-in-TS，v2 支持 Vite 插件链', 1870, 'TypeScript', ['css', 'frontend', 'vite']),
  R(14, 'unplugin', 'unplugin-swc', '把 SWC 接进任何构建工具的统一插件', 2210, 'TypeScript', ['vite', 'webpack', 'esbuild', 'frontend']),
  R(15, 'pemrouz', 'vantage-css', '把样式写在标签上的新方案，生成器只有 3KB', 1650, 'JavaScript', ['css', 'css-framework', 'frontend']),
  R(16, 'rsms', 'inter-4', 'Inter 字体的可变轴自定义构建器', 2480, 'TypeScript', ['font', 'typography', 'fonts']),
  R(17, 'opennextjs', 'open-next-edge', '把 Next.js 应用编译成边缘函数的适配层', 2890, 'TypeScript', ['nextjs', 'edge', 'frontend']),
  R(18, 'kubernetes-sigs', 'k8s-lite', '教学用迷你 Kubernetes：单二进制、包含核心调度器', 7310, 'Go', ['kubernetes', 'k8s', 'devops', 'container']),
  R(19, 'caddyserver', 'caddy-3', 'Caddy v3：自动 HTTPS 反向代理的内存占用砍半', 5630, 'Go', ['proxy', 'reverse-proxy', 'self-hosted']),
  R(20, 'astral-sh', 'uv-workspaces', 'uv 的 monorepo 工作区支持与锁文件格式 v2', 4150, 'Rust', ['package-manager', 'cli', 'python']),
  R(21, 'juicedata', 'juicefs-fuse', ' JuiceFS 的 FUSE3 重写内核', 1930, 'C++', ['filesystem', 'storage', 'distributed-systems']),
  R(22, 'dagger', 'dagger-modules', 'CI 流水线即代码的模块市场与运行器', 2760, 'Go', ['ci-cd', 'devops', 'github-actions']),
  R(23, 'yt-dlp', 'yt-dlp-gui', 'yt-dlp 的本地批量下载界面，带队列与失败重试', 3320, 'Python', ['gui', 'cli-app', 'downloader']),
  R(24, 'jupyter', 'jupyter-rt', '实时协作内核：Notebook 多人光标与共享变量视图', 2540, 'Python', ['jupyter', 'notebook', 'jupyter-notebook']),
  R(25, 'duckdb', 'duckdb-wasm-shell', '浏览器里直接跑 DuckDB 的 SQL 终端', 3680, 'C++', ['duckdb', 'sql', 'wasm']),
  R(26, 'pola-rs', 'polars-stream', 'Polars 流式处理模式：GB 级 CSV 零拷贝聚合', 5210, 'Rust', ['data-engineering', 'etl']),
  R(27, 'gradio-app', 'gradio-lite', '纯前端跑的 Gradio 精简版，支持浏览器内推理', 3040, 'TypeScript', ['data-science', 'dashboard']),
  R(28, 'supabase', 'pglisten', 'Postgres LISTEN/NOTIFY 的托管长连接客户端', 1720, 'TypeScript', ['postgresql', 'database', 'realtime']),
]
