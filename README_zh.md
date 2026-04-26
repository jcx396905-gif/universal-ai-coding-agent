# Universal AI Coding Agent - 通用 AI 自动化编程框架

[English](./README.md) | 中文

> 将任何想法转化为完整的、可上线运行的项目。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 项目简介

**Universal AI Coding Agent（通用 AI 编程代理）** 是一个元项目，使 AI 能够将**任何项目想法**完整实现——从概念到 GitHub——无需人工干预。

### 工作原理

```
用户: "Build a React todo app with Firebase"
        │
        ▼
AI 自动完成:
  1. 分析想法 → React + Firebase
  2. 创建 task.json → 25+ 有序任务
  3. 搭建项目结构 → 完整目录结构
  4. 执行任务 → 质量门禁 (lint → test → build)
  5. 推送到 GitHub → 公开仓库就绪
```

### 支持的技术

| 类别 | 技术 |
|------|------|
| **移动端** | Flutter, React Native |
| **前端** | React, Vue, Next.js, Nuxt, Svelte |
| **后端** | Node.js, Python (FastAPI, Django, Flask), Go, Rust, Java, .NET |
| **数据库** | PostgreSQL, MongoDB, SQLite, Redis, Firebase |
| **命令行** | Python (Click), Go (Cobra), Rust (Clap), Node.js (Commander) |

---

## 快速开始

### 1. 安装

```bash
git clone https://github.com/your-username/universal-ai-coding-agent.git
cd universal-ai-coding-agent
npm install  # 安装 CLI 工具依赖
```

### 2. 创建项目

```bash
# 使用 CLI
cd cli
npm link
universal-agent create "构建一个 Python CLI 任务管理工具"

# 或直接运行生成器脚本
./run-generator.sh "你的项目想法"
```

### 3. 看 AI 实现

AI 将自动：
1. 分析你的想法
2. 创建完整的项目结构
3. 执行所有质量门禁
4. 推送到 GitHub

---

## 项目结构

```
universal-ai-coding-agent/
├── README.md                      # 英文文档
├── README_zh.md                   # 中文文档
├── AGENT.md                       # 通用代理指令（与栈无关）
├── init-template.sh               # 环境设置模板
├── progress-template.txt           # 进度跟踪格式
├── run-loop.sh                    # 自动化循环脚本
├── project-generator.md            # 想法转项目 AI 提示词
│
├── cli/                           # CLI 工具
│   ├── index.js                   # CLI 入口
│   ├── generator.js                # 项目生成器逻辑
│   └── package.json
│
├── schemas/
│   └── task-schema.json           # task.json JSON Schema
│
└── examples/
    ├── python-cli/                # Python CLI 示例
    │   ├── task.json
    │   ├── AGENT.md
    │   └── init.sh
    │
    └── react-todo/                # React Todo 示例
        ├── task.json
        ├── AGENT.md
        └── init.sh
```

---

## 工作流程

```
┌─────────────────────────────────────────────────────────────────┐
│                    AI 开发循环流程                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   task.json (有序任务列表)                                        │
│         │                                                        │
│         ▼                                                        │
│   ┌─────────────────┐                                           │
│   │  读取任务       │ ◄─────────────────────┐                   │
│   └────────┬────────┘                      │                    │
│            │                               │                    │
│            ▼                               │                    │
│   ┌─────────────────┐     否             │                    │
│   │  初始化环境      │────进入下一步──────┘                    │
│   │  (init.sh)      │                                         │
│   └────────┬────────┘                                         │
│            │                                                   │
│            ▼                                                   │
│   ┌─────────────────┐                                          │
│   │  实现功能       │                                          │
│   │  (AI Agent)    │                                          │
│   └────────┬────────┘                                          │
│            │                                                    │
│            ▼                                                    │
│   ┌─────────────────┐                                          │
│   │  质量门禁        │                                          │
│   │  lint → test → build                                      │
│   └────────┬────────┘                                          │
│            │                                                    │
│            ▼                                                    │
│   ┌─────────────────┐     是           ┌─────────────────┐   │
│   │  所有门禁通过?  │────── ✓ ────────→ │  更新进度       │   │
│   └────────┬────────┘                  └────────┬────────┘   │
│            │ 否                                │              │
│            ▼                                   ▼              │
│   ┌─────────────────┐                 ┌─────────────────┐     │
│   │  修复问题        │                 │  git commit     │     │
│   └────────┬────────┘                 └────────┬────────┘     │
│            │                               │                    │
│            └───────────────────────────────┘                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 任务分类

| 类别 | 优先级 | 描述 |
|------|--------|------|
| `infrastructure` | 1 | 项目设置、配置、依赖 |
| `feature` | 2 | 核心功能实现 |
| `business` | 3 | 业务逻辑、数据处理 |
| `ui` | 4 | 用户界面开发 |
| `testing` | 5 | 测试覆盖、质量保证 |
| `optimization` | 6 | 性能优化、重构 |

### 质量门禁

每个任务完成前必须通过：

| 技术栈 | Lint | Test | Build |
|--------|------|------|-------|
| Node.js | `npm run lint` | `npm test` | `npm run build` |
| Python | `ruff check .` | `pytest` | `python -m py_compile` |
| Go | `go vet ./...` | `go test ./...` | `go build ./...` |
| Rust | `cargo clippy` | `cargo test` | `cargo build` |
| Flutter | `flutter analyze` | `flutter test` | `flutter build apk --debug` |

---

## 使用方法

### 命令行

```bash
# 创建新项目
universal-agent create "构建一个带认证的 React 仪表盘"

# 继续完成现有项目
universal-agent continue

# 查看项目状态
universal-agent status

# 初始化环境
universal-agent init
```

### AI 循环

```bash
# 运行自动化循环（执行所有任务）
./run-loop.sh

# 预览模式（显示下一个任务但不执行）
./run-loop.sh --dry-run

# 单次执行
./run-loop.sh --single
```

### 手动执行

```bash
# 1. 初始化环境
./init.sh

# 2. 运行 AI
claude

# 3. AI 将读取 task.json 并实现下一个任务
# 4. 每个任务完成后提交:
git add .
git commit -m "[任务标题] - completed"
```

---

## 任务定义

项目在 `task.json` 中定义：

```json
{
  "project": "my-project",
  "description": "一个带 Firebase 认证的 React 应用",
  "environment": {
    "sdk": "nodejs",
    "install_cmd": "npm install",
    "lint_cmd": "npm run lint",
    "test_cmd": "npm test",
    "build_cmd": "npm run build"
  },
  "tasks": [
    {
      "id": 1,
      "title": "项目初始化",
      "category": "infrastructure",
      "description": "使用 Vite 初始化 React 项目",
      "steps": [
        "使用 Vite 创建项目",
        "安装依赖",
        "配置 ESLint"
      ],
      "passes": false
    }
  ]
}
```

---

## 示例

### Python CLI 工具

```bash
universal-agent create "构建一个用 SQLite 管理书签的 Python CLI 工具"
```

创建 Python CLI 项目，包含：
- Click CLI 框架
- SQLite 存储
- 从搭建到 GitHub 的 18 个任务

### React Web 应用

```bash
universal-agent create "构建一个带图表的 React 支出追踪应用"
```

创建 React + Vite 项目，包含：
- Chart.js 可视化
- React Query 数据获取
- 从搭建到可部署的 30 个任务

### Go REST API

```bash
universal-agent create "构建一个带用户认证的 Go TODO REST API"
```

创建 Go 项目，包含：
- Gin/Echo 框架
- JWT 认证
- PostgreSQL + GORM
- 25 个任务

### Flutter 移动应用

```bash
universal-agent create "构建一个带本地通知的 Flutter 习惯追踪应用"
```

创建 Flutter 项目，包含：
- Riverpod 状态管理
- Isar 本地数据库
- flutter_local_notifications
- 35 个任务

---

## 架构

### 通用代理指令 (AGENT.md)

系统的核心是**与栈无关的**代理指令文件：

- 适用于任何语言/框架
- 可配置的质量门禁命令
- 标准化的任务格式
- 阻塞问题协议
- 单次提交规则

### 项目生成器

`project-generator.md` 是 AI 提示词，可以：

1. 询问项目想法
2. 确定最佳技术栈
3. 生成全面的 `task.json`
4. 创建项目结构
5. 自动执行所有任务

---

## 最佳实践

### 写出好的项目想法

**好的：**
- "构建一个支持拖拽的任务管理 React 应用"
- "创建一个生成随机密码的 Python CLI 工具"
- "构建一个带用户认证的博客 Go REST API"

**不够好的：**
- "做个很酷的东西"
- "用 React 做个应用"
- "搞个项目"

### 任务规模

- **CLI 工具**: 15-25 个任务
- **Web 应用**: 25-40 个任务
- **全栈应用**: 35-50 个任务
- **移动应用**: 30-45 个任务

### 技术栈选择

AI 会从你的想法中自动检测技术栈，但也可以指定：

```bash
universal-agent create "构建一个博客" --stack python
```

---

## 故障排除

### AI 中途停止

如果 AI 意外停止：
1. 检查 `progress.txt` 了解最后完成的工作
2. 运行 `./init.sh` 重新初始化
3. 使用 `claude` 继续

### 质量门禁失败

如果 lint/test/build 失败：
1. 阅读错误信息
2. 修复问题
3. 重新运行失败命令
4. 单独提交修复

### GitHub 推送失败

如果 `gh repo create` 失败：
1. 认证: `gh auth login`
2. 检查仓库名是否可用
3. 手动创建: `gh repo create username/repo --public`

---

## 扩展

### 添加新语言栈

1. 在 `cli/generator.js` 中更新 `STACK_PATTERNS`
2. 在 `getInstallCommand()`、`getLintCommand()` 等中添加命令
3. 在 `examples/` 中添加示例

### 添加项目模板

1. 创建 `templates/[模板名]/`
2. 添加 `task-template.json`
3. 添加 `init-template.sh`
4. 更新 `project-generator.md`

---

## License

MIT License - 详见 [LICENSE](LICENSE)。

---

*Universal AI Coding Agent - 将想法变为现实*
