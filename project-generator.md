# Project Generator - Universal AI Coding Agent

> Transform any idea into a complete, production-ready project.

---

## Overview

The **Project Generator** is an AI-powered system that takes a project idea and **fully implements it** from scratch — including:

1. **Tech Stack Selection** - Choose best technologies for the idea
2. **Task Planning** - Create comprehensive task.json with ordered tasks
3. **Project Structure** - Scaffold complete project directory
4. **Full Implementation** - Execute all tasks automatically
5. **GitHub Upload** - Create repo and push code

---

## How It Works

```
User Idea → AI Analysis → task.json Created → Project Scaffolded → Tasks Executed → GitHub Push
     │              │              │                 │                    │              │
     ▼              ▼              ▼                 ▼                    ▼              ▼
 "Build a     [AI decides  [AI generates   [AI creates    [AI implements  [gh repo create
  React app     stack]       20-50 tasks]   directories]    each task]       + git push]
  with Firebase]"
```

---

## Usage

### Interactive Mode

```bash
# Start the project generator
claude -p project-generator.md

# Or use the CLI (if installed)
universal-agent create "Build a React todo app with Firebase"
```

### Programmatic Mode

```bash
# Execute with predefined idea
./run-generator.sh "Build a Python CLI tool for task management"
```

---

## The Generator Workflow

### Step 1: Analyze the Idea

When you provide an idea, the AI analyzes:

| Question | Purpose |
|----------|---------|
| What type of application? | Web, Mobile, CLI, API, Desktop |
| What is the core function? | CRUD, Real-time, Analytics, Automation |
| What technologies fit best? | Framework, Database, Libraries |
| What is the scope? | MVP, Full Product, Prototype |

### Step 2: Design the Tech Stack

Based on the analysis, select technologies:

**For Web Applications:**
- React / Vue / Angular / Svelte
- Next.js / Nuxt.js / Remix
- Tailwind CSS / Styled Components
- Node.js / Deno / Bun

**For Mobile:**
- Flutter / React Native
- iOS / Android specific

**For APIs:**
- Express / Fastify / NestJS (Node.js)
- FastAPI / Django / Flask (Python)
- Gin / Echo (Go)
- Actix / Axum (Rust)

**For Data:**
- PostgreSQL / MongoDB / SQLite
- Redis / Memcached
- Prisma / Drizzle / SQLAlchemy

### Step 3: Create task.json

Generate a comprehensive task list organized by dependency:

```json
{
  "project": "my-awesome-app",
  "description": "A React todo app with Firebase backend",
  "environment": {
    "sdk": "node",
    "build_cmd": "npm run build",
    "test_cmd": "npm test",
    "lint_cmd": "npm run lint",
    "install_cmd": "npm install"
  },
  "tasks": [
    {
      "id": 1,
      "title": "Project Setup",
      "category": "infrastructure",
      "description": "Initialize project with Vite + React + TypeScript",
      "steps": [
        "Create project directory",
        "Initialize npm package",
        "Install React, TypeScript, Vite",
        "Configure build tools"
      ],
      "passes": false
    },
    // ... more tasks ordered by dependency
  ]
}
```

### Task Categories

| Category | Priority | Description |
|----------|----------|-------------|
| `infrastructure` | 1 | Project setup, configs, dependencies |
| `feature` | 2 | Core functionality |
| `business` | 3 | Business logic, data handling |
| `ui` | 4 | User interface |
| `testing` | 5 | Tests, QA |
| `optimization` | 6 | Performance, polish |

### Step 4: Scaffold the Project

Create the complete directory structure:

```
my-awesome-app/
├── AGENT.md           # Agent instructions (copy from template)
├── task.json          # Task definitions
├── progress.txt       # Progress tracking
├── init.sh            # Environment setup
├── README.md          # Project documentation
├── src/               # Source code
├── tests/             # Tests
├── docs/              # Documentation
└── scripts/           # Build/utility scripts
```

### Step 5: Execute Tasks

For each task (in order):

1. **Read** task description and steps
2. **Implement** the functionality
3. **Test** with quality gates:
   - Lint (eslint, ruff, clippy, etc.)
   - Test (jest, pytest, cargo test, etc.)
   - Build (npm build, python -m compile, cargo build, etc.)
4. **Update** progress.txt
5. **Commit** all changes

### Step 6: Create GitHub Repository

```bash
# Create GitHub repo
gh repo create username/my-awesome-app --public --push

# Or with description
gh repo create username/my-awesome-app \
  --public \
  --description "A React todo app with Firebase" \
  --push
```

---

## Project Types & Templates

### Web Application (React/Next.js)

```
Stack: React/Next.js + TypeScript + Tailwind + Firebase
Tasks: 25-35
Timeline: 1-2 hours (AI time)
```

### REST API (Python/Go/Rust)

```
Stack: FastAPI/Go/Rust + PostgreSQL + Redis
Tasks: 20-30
Timeline: 1-2 hours (AI time)
```

### CLI Tool (Python/Go/Rust)

```
Stack: Python/Go/Rust + Click/Cobra/Clap
Tasks: 15-25
Timeline: 30-60 min (AI time)
```

### Mobile App (Flutter/React Native)

```
Stack: Flutter + Riverpod + Isar
Tasks: 25-40
Timeline: 1-3 hours (AI time)
```

### Full-Stack Monolith

```
Stack: Next.js + Prisma + PostgreSQL + Tailwind
Tasks: 35-50
Timeline: 2-4 hours (AI time)
```

---

## Generator Output

### What You Get

| Output | Description |
|--------|-------------|
| Complete Source Code | Full implementation of all features |
| task.json | Task definitions for future work |
| AGENT.md | Agent instructions for continuation |
| README.md | Project documentation |
| init.sh | Environment setup script |
| GitHub Repo | Public repository with all code |

### What You Don't Get (Yet)

- Custom branding/logo design
- Content (copy, images, etc.)
- Hosting setup
- CI/CD configuration (can be added as task)

---

## Examples

### Example 1: Simple CLI Tool

**User Input:**
```
Build a Python CLI tool that manages a todo list using SQLite
```

**AI Output:**
- Stack: Python 3 + Click + SQLite
- Tasks: 18 tasks
- Time: ~30 min
- Repo: `username/python-todo-cli`

### Example 2: Web Application

**User Input:**
```
Build a React app with authentication and a dashboard
```

**AI Output:**
- Stack: React + Vite + TypeScript + Firebase Auth
- Tasks: 28 tasks
- Time: ~1.5 hours
- Repo: `username/react-dashboard`

### Example 3: Full-Stack Application

**User Input:**
```
Build a blog platform with user auth, markdown posts, and comments
```

**AI Output:**
- Stack: Next.js + Prisma + PostgreSQL + NextAuth
- Tasks: 42 tasks
- Time: ~2.5 hours
- Repo: `username/blog-platform`

---

## CLI Reference

### universal-agent create

```bash
# Create a new project
universal-agent create "Your project idea here"

# With options
universal-agent create "Your idea" --stack nodejs --dir ./my-project

# Interactive mode
universal-agent interactive
```

### universal-agent continue

```bash
# Continue from where left off
universal-agent continue

# With specific task
universal-agent continue --task 15
```

### universal-agent status

```bash
# Show project status
universal-agent status

# Output:
# Project: my-app
# Progress: 12/35 tasks complete (34%)
# Current: Task #13 - Implement user authentication
```

---

## Best Practices

1. **Be Specific in Ideas**
   - Good: "Build a React app for tracking habits with daily reminders"
   - Bad: "Build something with React"

2. **Start Small**
   - MVP first, add features later
   - Core functionality in 20-30 tasks

3. **Use Appropriate Scope**
   - CLI tool: 15-25 tasks
   - Web app: 25-40 tasks
   - Full-stack: 35-50 tasks

4. **Review Generated task.json**
   - Check task order makes sense
   - Ensure no critical tasks missing

---

## Troubleshooting

### Agent Stops Mid-Task

If the AI agent stops unexpectedly:
1. Check `progress.txt` for last completed work
2. Run `./init.sh` to reinitialize
3. Run `claude` manually to continue

### Tasks Failing Quality Gates

If lint/test/build fails:
1. Check error messages
2. Fix the issues
3. Re-run the failing quality gate
4. Commit fix separately

### GitHub Push Fails

If `gh repo create` fails:
1. Ensure `gh` CLI is authenticated: `gh auth status`
2. Check repo name is available
3. Try manually: `gh repo create username/repo --public`

---

## Contributing

To add a new project template:

1. Create `templates/[template-name]/`
2. Add `task-template.json`
3. Add `init-template.sh`
4. Add `README-template.md`
5. Update this generator with the new template

---

*Universal AI Coding Agent - Turn Ideas into Reality*
