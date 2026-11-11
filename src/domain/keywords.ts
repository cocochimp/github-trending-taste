// 领域关键词映射表：命中优先级即数组顺序（Agent 先于 AI/LLM，
// 使 "ai-agent" 类 topic 归入 Agent）。新增领域只需在此追加。
export interface DomainDef {
  id: string
  label: string
  /** topic 精确匹配 */
  topics: string[]
  /** 名称/描述子串匹配（小写比较） */
  words: string[]
  /** 分布条与卡片的展示色（整页唯一系统的中性系 + 强调色仅星数） */
  color: string
}

export const DOMAIN_ORDER = ['agent', 'ai', 'frontend', 'infra', 'data', 'other'] as const

export const DOMAIN_DEFS: DomainDef[] = [
  {
    id: 'agent',
    label: 'Agent',
    topics: ['agent', 'agents', 'ai-agent', 'ai-agents', 'mcp', 'mcp-server', 'mcp-client',
      'agentic', 'autonomous-agents', 'tool-calling', 'function-calling', 'a2a', 'copilot',
      'cli-agent', 'coding-agent', 'browser-agent', 'computer-use', 'swarm'],
    words: ['agent', 'mcp', 'autonomous', 'agentic', 'copilot'],
    color: '#e3b341',
  },
  {
    id: 'ai',
    label: 'AI / LLM',
    topics: ['llm', 'llms', 'ai', 'artificial-intelligence', 'openai', 'anthropic', 'claude',
      'gpt', 'chatgpt', 'llama', 'mistral', 'deepseek', 'qwen', 'transformer', 'diffusion',
      'stable-diffusion', 'text-to-image', 'text-to-speech', 'tts', 'asr', 'ocr', 'nlp',
      'rag', 'embedding', 'embeddings', 'fine-tuning', 'inference', 'inference-server',
      'vector-database', 'machine-learning', 'deep-learning', 'neural-network', 'llmops',
      'genai', 'generative-ai', 'prompt-engineering', 'speech-recognition', 'vision',
      'computer-vision', 'lora', 'quantization', 'gguf', 'vllm'],
    words: ['llm', 'gpt', 'openai', 'claude', 'llama', 'diffusion', 'transformer',
      'embedding', 'inference', '大模型', '语音', 'tts', 'ocr', 'rag'],
    color: '#d4773f',
  },
  {
    id: 'frontend',
    label: '前端工具',
    topics: ['frontend', 'frontend-framework', 'ui', 'ui-components', 'component-library',
      'design-system', 'css', 'css-framework', 'tailwind', 'tailwindcss', 'react', 'vue',
      'svelte', 'solidjs', 'angular', 'vite', 'webpack', 'rollup', 'esbuild', 'rspack',
      'nextjs', 'nuxt', 'astro', 'remix', 'storybook', 'figma', 'icons', 'icon-pack',
      'font', 'fonts', 'typography', 'web-components', 'monaco', 'codemirror', 'd3',
      'chart', 'charts', 'visualization', 'canvas', 'webgl', 'threejs', 'shaders',
      'game-engine', 'static-site-generator', 'markdown', 'browser-extension'],
    words: ['前端', 'ui 组件', '组件库', '样式', 'react', 'vue', 'svelte', 'vite',
      'webpack', '构建工具', '图表', '可视化', '浏览器插件', 'css'],
    color: '#4a8bc3',
  },
  {
    id: 'infra',
    label: '基础设施 / DevOps',
    topics: ['devops', 'infrastructure', 'kubernetes', 'k8s', 'docker', 'container',
      'containers', 'terraform', 'ansible', 'helm', 'ci-cd', 'ci', 'cd', 'github-actions',
      'observability', 'monitoring', 'logging', 'prometheus', 'grafana', 'opentelemetry',
      'service-mesh', 'istio', 'nginx', 'proxy', 'reverse-proxy', 'load-balancer',
      'database', 'postgresql', 'mysql', 'redis', 'kafka', 'rabbitmq', 'message-queue',
      'distributed-systems', 'linux', 'shell', 'zsh', 'cli', 'cli-app', 'terminal',
      'package-manager', 'runtime', 'compiler', 'language', 'networking', 'vpn',
      'self-hosted', 'homelab', 'raspberry-pi', 'serverless', 'edge', 'wasm'],
    words: ['devops', 'k8s', 'docker', '容器', '部署', '监控', '日志', '数据库',
      '终端', '命令行', '编译器', '运行时', '自托管', '代理', 'wasm'],
    color: '#5c8a5e',
  },
  {
    id: 'data',
    label: '数据 / Notebook',
    topics: ['jupyter', 'jupyter-notebook', 'notebook', 'notebooks', 'data-science',
      'data-engineering', 'data-analysis', 'analytics', 'pandas', 'polars', 'numpy',
      'spark', 'airflow', 'dbt', 'etl', 'elt', 'data-pipeline', 'dashboard',
      'business-intelligence', 'bi', 'sql', 'olap', 'duckdb', 'clickhouse',
      'dataviz', 'excel', 'spreadsheet', 'dataset', 'datasets', 'etl-pipeline'],
    words: ['jupyter', 'notebook', 'pandas', 'polars', '数据集', '数据分析',
      'etl', '数仓', '报表', 'spreadsheet', 'duckdb'],
    color: '#8a7f5c',
  },
  {
    id: 'other',
    label: '其它',
    topics: [],
    words: [],
    color: '#9a9aa3',
  },
]

export const DOMAIN_BY_ID: Record<string, DomainDef> = Object.fromEntries(
  DOMAIN_DEFS.map((d) => [d.id, d]),
)
