# Universal AI Coding Agent

> Transform any idea into a complete, production-ready project with AI.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

The **Universal AI Coding Agent** is a meta-project that enables AI to take **any project idea** and **fully implement it** — from concept to GitHub — without human intervention.

### What It Does

```
User: "Build a React todo app with Firebase"
        │
        ▼
AI Agent automatically:
  1. Analyzes the idea → React + Firebase
  2. Creates task.json → 25+ ordered tasks
  3. Scaffolds project → Complete directory structure
  4. Implements tasks → Quality gates (lint → test → build)
  5. Pushes to GitHub → Public repository ready
```

### Supported Technologies

| Category | Technologies |
|----------|-------------|
| **Mobile** | Flutter, React Native |
| **Web** | React, Vue, Next.js, Nuxt, Svelte |
| **Backend** | Node.js, Python (FastAPI, Django, Flask), Go, Rust, Java, .NET |
| **Database** | PostgreSQL, MongoDB, SQLite, Redis, Firebase |
| **CLI** | Python (Click), Go (Cobra), Rust (Clap), Node.js (Commander) |

---

## Quick Start

### 1. Install

```bash
git clone https://github.com/your-username/universal-ai-coding-agent.git
cd universal-ai-coding-agent
npm install  # For CLI tools
```

### 2. Create a Project

```bash
# Using the CLI
cd cli
npm link
universal-agent create "Build a Python CLI tool for task management"

# Or run the generator script directly
./run-generator.sh "Your project idea"
```

### 3. Watch AI Implement

The AI agent will:
1. Analyze your idea
2. Create a complete project structure
3. Implement all tasks with quality gates
4. Push to GitHub

---

## Project Structure

```
universal-ai-coding-agent/
├── README.md                      # This file
├── AGENT.md                       # Generic agent instructions (stack-agnostic)
├── init-template.sh               # Environment setup template
├── progress-template.txt          # Progress tracking format
├── run-loop.sh                    # Automation loop script
├── project-generator.md            # Idea-to-project AI prompt
│
├── cli/                           # CLI tools
│   ├── index.js                   # CLI entry point
│   ├── generator.js               # Project generator logic
│   └── package.json
│
├── schemas/
│   └── task-schema.json           # JSON Schema for task.json
│
└── examples/
    ├── python-cli/
    │   ├── task.json
    │   ├── AGENT.md
    │   └── init.sh
    │
    └── react-todo/
        ├── task.json
        ├── AGENT.md
        └── init.sh
```

---

## How It Works

### The Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                    AI Development Loop                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   task.json (ordered tasks)                                      │
│         │                                                        │
│         ▼                                                        │
│   ┌─────────────────┐                                           │
│   │  Read Task      │ ◄─────────────────────┐                   │
│   └────────┬────────┘                      │                    │
│            │                               │                    │
│            ▼                               │                    │
│   ┌─────────────────┐     No              │                    │
│   │  Init Env       │────Next Task───────┘                    │
│   │  (init.sh)      │                                         │
│   └────────┬────────┘                                         │
│            │                                                   │
│            ▼                                                   │
│   ┌─────────────────┐                                          │
│   │  Implement      │                                          │
│   │  (AI Agent)     │                                          │
│   └────────┬────────┘                                          │
│            │                                                    │
│            ▼                                                    │
│   ┌─────────────────┐                                          │
│   │  Quality Gates  │                                          │
│   │  lint → test → build                                       │
│   └────────┬────────┘                                          │
│            │                                                    │
│            ▼                                                    │
│   ┌─────────────────┐     Yes           ┌─────────────────┐   │
│   │  All Gates Pass? │────── ✓ ────────→ │  Update Progress │   │
│   └────────┬────────┘                  └────────┬────────┘   │
│            │ No                                │              │
│            ▼                                   ▼              │
│   ┌─────────────────┐                 ┌─────────────────┐     │
│   │  Fix Issues     │                 │  git commit     │     │
│   └────────┬────────┘                 └────────┬────────┘     │
│            │                               │                    │
│            └───────────────────────────────┘                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Task Categories

| Category | Priority | Description |
|----------|----------|-------------|
| `infrastructure` | 1 | Project setup, configs, dependencies |
| `feature` | 2 | Core functionality implementation |
| `business` | 3 | Business logic, data handling |
| `ui` | 4 | User interface development |
| `testing` | 5 | Test coverage, QA |
| `optimization` | 6 | Performance, refactoring |

### Quality Gates

Every task must pass these before completion:

| Stack | Lint | Test | Build |
|-------|------|------|-------|
| Node.js | `npm run lint` | `npm test` | `npm run build` |
| Python | `ruff check .` | `pytest` | `python -m py_compile` |
| Go | `go vet ./...` | `go test ./...` | `go build ./...` |
| Rust | `cargo clippy` | `cargo test` | `cargo build` |
| Flutter | `flutter analyze` | `flutter test` | `flutter build apk --debug` |

---

## Usage

### Command Line

```bash
# Create a new project
universal-agent create "Build a React dashboard with authentication"

# Continue working on existing project
universal-agent continue

# Show project status
universal-agent status

# Initialize environment
universal-agent init
```

### AI Agent Loop

```bash
# Run the automation loop (executes all tasks)
./run-loop.sh

# Dry run (show next task without executing)
./run-loop.sh --dry-run

# Single iteration
./run-loop.sh --single
```

### Manual Execution

```bash
# 1. Initialize environment
./init.sh

# 2. Run AI agent
claude

# 3. Agent will read task.json and implement next task
# 4. After each task, commit:
git add .
git commit -m "[Task title] - completed"
```

---

## Task Definition

Projects are defined in `task.json`:

```json
{
  "project": "my-project",
  "description": "A React app with Firebase auth",
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
      "title": "Project Setup",
      "category": "infrastructure",
      "description": "Initialize React project with Vite",
      "steps": [
        "Create project with Vite",
        "Install dependencies",
        "Configure ESLint"
      ],
      "passes": false
    }
  ]
}
```

---

## Examples

### Python CLI Tool

```bash
universal-agent create "Build a Python CLI tool for managing bookmarks"
```

Creates a Python CLI project with:
- Click for CLI framework
- SQLite for storage
- 18 tasks from setup to GitHub

### React Web App

```bash
universal-agent create "Build a React app for expense tracking with charts"
```

Creates a React + Vite project with:
- Chart.js for visualization
- React Query for data fetching
- 30 tasks from setup to deployment-ready

### Go REST API

```bash
universal-agent create "Build a Go REST API for a todo list with authentication"
```

Creates a Go project with:
- Gin/Echo framework
- JWT authentication
- PostgreSQL + GORM
- 25 tasks

### Flutter Mobile App

```bash
universal-agent create "Build a Flutter habit tracker with local notifications"
```

Creates a Flutter project with:
- Riverpod state management
- Isar local database
- flutter_local_notifications
- 35 tasks

---

## Architecture

### Generic Agent Instructions (AGENT.md)

The core of the system is a **stack-agnostic** agent instruction file that works for any technology:

- Works with any language/framework
- Configurable quality gate commands
- Standardized task format
- Blocking issue protocol
- Single-commit per task rule

### Project Generator

The `project-generator.md` is an AI prompt that:

1. Asks for a project idea
2. Determines the best tech stack
3. Generates a comprehensive `task.json`
4. Creates the project structure
5. Executes all tasks automatically

---

## Best Practices

### Writing Good Project Ideas

**Good:**
- "Build a React app for task management with drag-and-drop"
- "Create a Python CLI tool for generating random passwords"
- "Build a Go REST API for a blog with user authentication"

**Less Good:**
- "Make something cool"
- "Build an app"
- "Do a project"

### Task Size

- **CLI tool**: 15-25 tasks
- **Web app**: 25-40 tasks
- **Full-stack**: 35-50 tasks
- **Mobile app**: 30-45 tasks

### Stack Selection

The AI will auto-detect stack from your idea, but you can specify:

```bash
universal-agent create "Build a blog" --stack python
```

---

## Troubleshooting

### Agent Stops Mid-Task

1. Check `progress.txt` for last completed work
2. Run `./init.sh` to reinitialize
3. Continue with `claude`

### Quality Gates Failing

1. Read the error message
2. Fix the issue
3. Re-run the failing command
4. Commit the fix

### GitHub Push Fails

1. Authenticate: `gh auth login`
2. Check repo name availability
3. Create manually: `gh repo create username/repo --public`

---

## Extending

### Add a New Stack

1. Update `STACK_PATTERNS` in `cli/generator.js`
2. Add commands to `getInstallCommand()`, `getLintCommand()`, etc.
3. Add example in `examples/`

### Add Project Templates

1. Create `templates/[template-name]/`
2. Add `task-template.json`
3. Add `init-template.sh`
4. Update `project-generator.md`

---

## License

MIT License - See [LICENSE](LICENSE) for details.

---

*Universal AI Coding Agent - Turn Ideas into Reality*
