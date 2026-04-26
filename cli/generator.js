/**
 * Universal AI Coding Agent - Project Generator
 *
 * Handles the creation of projects from ideas:
 * 1. Analyze the idea
 * 2. Determine tech stack
 * 3. Generate task.json
 * 4. Scaffold project
 * 5. Execute tasks (if requested)
 * 6. Push to GitHub
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Tech stack detection patterns
const STACK_PATTERNS = {
  flutter: ['flutter', 'dart'],
  react: ['react', 'jsx', 'tsx', 'nextjs', 'remix'],
  vue: ['vue', 'nuxt'],
  nodejs: ['node', 'express', 'fastify', 'nestjs'],
  python: ['python', 'django', 'flask', 'fastapi'],
  go: ['golang', 'go '],
  rust: ['rust', 'cargo'],
  java: ['java', 'spring'],
  dotnet: ['dotnet', 'csharp', 'asp.net'],
};

// Task category priorities
const CATEGORY_ORDER = ['infrastructure', 'feature', 'business', 'ui', 'testing', 'optimization'];

/**
 * Analyze project idea and determine tech stack
 */
function analyzeIdea(idea) {
  const ideaLower = idea.toLowerCase();

  // Detect framework/technology
  let stack = 'nodejs'; // default
  for (const [tech, patterns] of Object.entries(STACK_PATTERNS)) {
    if (patterns.some(p => ideaLower.includes(p))) {
      stack = tech;
      break;
    }
  }

  // Detect project type
  let projectType = 'web';
  if (ideaLower.includes('cli') || ideaLower.includes('command line')) {
    projectType = 'cli';
  } else if (ideaLower.includes('mobile') || ideaLower.includes('android') || ideaLower.includes('ios')) {
    projectType = 'mobile';
  } else if (ideaLower.includes('api') || ideaLower.includes('backend') || ideaLower.includes('rest')) {
    projectType = 'api';
  } else if (ideaLower.includes('desktop')) {
    projectType = 'desktop';
  }

  return { stack, projectType };
}

/**
 * Generate project name from idea
 */
function generateProjectName(idea) {
  return idea
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50);
}

/**
 * Generate task.json content based on stack and project type
 */
function generateTaskJson(projectName, stack, projectType) {
  const baseTasks = generateBaseTasks(stack, projectType);
  const featureTasks = generateFeatureTasks(stack, projectType);

  return {
    project: projectName,
    description: `Generated project: ${projectName}`,
    environment: {
      sdk: stack,
      install_cmd: getInstallCommand(stack),
      lint_cmd: getLintCommand(stack),
      test_cmd: getTestCommand(stack),
      build_cmd: getBuildCommand(stack),
    },
    tasks: [...baseTasks, ...featureTasks].map((task, index) => ({
      id: index + 1,
      ...task,
      passes: false,
    })),
  };
}

/**
 * Get install command for stack
 */
function getInstallCommand(stack) {
  const commands = {
    flutter: 'flutter pub get',
    react: 'npm install',
    vue: 'npm install',
    nodejs: 'npm install',
    python: 'pip install -r requirements.txt',
    go: 'go mod download',
    rust: 'cargo fetch',
    java: 'mvn dependency:resolve',
    dotnet: 'dotnet restore',
  };
  return commands[stack] || 'npm install';
}

/**
 * Get lint command for stack
 */
function getLintCommand(stack) {
  const commands = {
    flutter: 'flutter analyze',
    react: 'npm run lint',
    vue: 'npm run lint',
    nodejs: 'npm run lint',
    python: 'ruff check .',
    go: 'go vet ./...',
    rust: 'cargo clippy -- -D warnings',
    java: 'mvn checkstyle:check',
    dotnet: 'dotnet format --verify-no-changes',
  };
  return commands[stack] || 'npm run lint';
}

/**
 * Get test command for stack
 */
function getTestCommand(stack) {
  const commands = {
    flutter: 'flutter test',
    react: 'npm test',
    vue: 'npm test',
    nodejs: 'npm test',
    python: 'pytest',
    go: 'go test ./...',
    rust: 'cargo test',
    java: 'mvn test',
    dotnet: 'dotnet test',
  };
  return commands[stack] || 'npm test';
}

/**
 * Get build command for stack
 */
function getBuildCommand(stack) {
  const commands = {
    flutter: 'flutter build apk --debug',
    react: 'npm run build',
    vue: 'npm run build',
    nodejs: 'npm run build',
    python: 'python -m py_compile **/*.py',
    go: 'go build ./...',
    rust: 'cargo build',
    java: 'mvn package',
    dotnet: 'dotnet build',
  };
  return commands[stack] || 'npm run build';
}

/**
 * Generate base/infrastructure tasks
 */
function generateBaseTasks(stack, projectType) {
  const tasks = [
    {
      title: 'Project Setup',
      category: 'infrastructure',
      description: 'Initialize project with basic structure and configuration',
      steps: [
        'Create project directory structure',
        'Initialize package manager (npm, pip, cargo, etc.)',
        'Create basic configuration files',
        'Set up version control (.gitignore)',
      ],
    },
    {
      title: 'Environment Configuration',
      category: 'infrastructure',
      description: 'Configure development environment and dependencies',
      steps: [
        'Install core dependencies',
        'Configure build tools',
        'Set up linting/formatting',
        'Verify environment works',
      ],
    },
    {
      title: 'Data Models',
      category: 'infrastructure',
      description: 'Define data structures and models',
      steps: [
        'Define entity models',
        'Set up database schema (if applicable)',
        'Create data validation',
        'Write model tests',
      ],
    },
    {
      title: 'Core Architecture',
      category: 'infrastructure',
      description: 'Set up application architecture',
      steps: [
        'Set up routing/navigation',
        'Configure dependency injection',
        'Create base components/services',
        'Implement error handling',
      ],
    },
  ];

  return tasks;
}

/**
 * Generate feature tasks based on project type
 */
function generateFeatureTasks(stack, projectType) {
  const tasks = [
    {
      title: 'User Authentication',
      category: 'feature',
      description: 'Implement user authentication system',
      steps: [
        'Create auth models/tables',
        'Implement registration',
        'Implement login/logout',
        'Add auth middleware/guards',
      ],
    },
    {
      title: 'Core Feature Implementation',
      category: 'feature',
      description: 'Implement main application functionality',
      steps: [
        'Implement core business logic',
        'Create API endpoints or UI',
        'Add data persistence',
        'Implement state management',
      ],
    },
    {
      title: 'User Interface',
      category: 'ui',
      description: 'Build user interface',
      steps: [
        'Create main layout/navigation',
        'Build core UI components',
        'Implement responsive design',
        'Add loading and error states',
      ],
    },
    {
      title: 'Testing & QA',
      category: 'testing',
      description: 'Write tests and verify functionality',
      steps: [
        'Write unit tests',
        'Write integration tests',
        'Verify all quality gates pass',
        'Fix any issues found',
      ],
    },
    {
      title: 'Documentation',
      category: 'infrastructure',
      description: 'Create project documentation',
      steps: [
        'Write README.md',
        'Add code documentation',
        'Create usage examples',
        'Document API (if applicable)',
      ],
    },
    {
      title: 'GitHub Upload',
      category: 'optimization',
      description: 'Upload project to GitHub',
      steps: [
        'Initialize git repository',
        'Create GitHub repository',
        'Push code to GitHub',
        'Add repo description',
      ],
    },
  ];

  return tasks;
}

/**
 * Create project directory structure
 */
function scaffoldProject(dir, projectName) {
  console.log(`Scaffolding project: ${projectName}`);

  // Create directories
  const dirs = [
    'src',
    'tests',
    'docs',
    'scripts',
  ];

  dirs.forEach(d => {
    const fullPath = path.join(dir, d);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
  });

  console.log('  ✓ Directory structure created');
}

/**
 * Create essential files from templates
 */
function createEssentialFiles(dir, projectName, stack) {
  console.log('Creating essential files...');

  // Copy AGENT.md from template
  const agentTemplate = path.join(__dirname, '..', 'AGENT.md');
  if (fs.existsSync(agentTemplate)) {
    fs.copyFileSync(agentTemplate, path.join(dir, 'AGENT.md'));
  }

  // Create init.sh
  const initSh = path.join(dir, 'init.sh');
  const initTemplate = path.join(__dirname, '..', 'init-template.sh');
  if (fs.existsSync(initTemplate)) {
    fs.copyFileSync(initTemplate, initSh);
    fs.chmodSync(initSh, '755');
  }

  // Create progress.txt
  const progressTemplate = path.join(__dirname, '..', 'progress-template.txt');
  if (fs.existsSync(progressTemplate)) {
    fs.copyFileSync(progressTemplate, path.join(dir, 'progress.txt'));
  }

  // Create .gitignore
  const gitignore = path.join(dir, '.gitignore');
  if (!fs.existsSync(gitignore)) {
    fs.writeFileSync(gitignore, getGitignoreContent(stack));
  }

  console.log('  ✓ Essential files created');
}

/**
 * Get .gitignore content for stack
 */
function getGitignoreContent(stack) {
  const base = `
# Dependencies
node_modules/
__pycache__/
*.pyc
.env

# Build outputs
dist/
build/
*.egg-info/

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
`;

  return base;
}

/**
 * Create GitHub repository and push
 */
async function pushToGitHub(dir, projectName) {
  console.log('Pushing to GitHub...');

  // Check if gh CLI is authenticated
  try {
    execSync('gh auth status', { stdio: 'pipe' });
  } catch {
    console.log('  ⚠ GitHub CLI not authenticated. Run: gh auth login');
    return false;
  }

  // Get GitHub username
  let username;
  try {
    username = execSync('gh api user --jq .login', { encoding: 'utf8' }).trim();
  } catch {
    console.log('  ⚠ Could not get GitHub username');
    return false;
  }

  const repoName = projectName.toLowerCase().replace(/[^a-z0-9-]/g, '-');

  try {
    // Create repo
    execSync(`gh repo create ${username}/${repoName} --public --push`, {
      cwd: dir,
      stdio: 'inherit',
    });
    console.log(`  ✓ Repository created: https://github.com/${username}/${repoName}`);
    return true;
  } catch {
    console.log('  ⚠ Could not create repository');
    return false;
  }
}

/**
 * Main: Create a new project
 */
async function createProject({ idea, stack, dir }) {
  console.log('\n============================================================');
  console.log('  Universal AI Coding Agent - Project Generator');
  console.log('============================================================\n');

  // Analyze idea
  const { stack: detectedStack, projectType } = analyzeIdea(idea);
  stack = stack || detectedStack;
  console.log(`  Stack: ${stack}`);
  console.log(`  Type: ${projectType}`);
  console.log('');

  // Generate project name
  const projectName = dir || generateProjectName(idea);
  console.log(`  Project: ${projectName}`);
  console.log('');

  // Create project directory
  const projectDir = path.join(process.cwd(), projectName);
  if (fs.existsSync(projectDir)) {
    console.error(`  ✗ Directory ${projectName} already exists`);
    process.exit(1);
  }
  fs.mkdirSync(projectDir);

  // Scaffold project
  scaffoldProject(projectDir, projectName);
  createEssentialFiles(projectDir, projectName, stack);

  // Generate task.json
  console.log('Generating task.json...');
  const taskJson = generateTaskJson(projectName, stack, projectType);
  fs.writeFileSync(
    path.join(projectDir, 'task.json'),
    JSON.stringify(taskJson, null, 2)
  );
  console.log(`  ✓ Created task.json with ${taskJson.tasks.length} tasks`);

  // Create README
  console.log('Creating README.md...');
  const readmeContent = `# ${projectName}\n\n${idea}\n\n## Stack\n\n- ${stack}\n\n## Getting Started\n\n\`\`\`bash\n# Install dependencies\n${taskJson.environment.install_cmd}\n\n# Run development server\n${stack === 'flutter' ? 'flutter run' : stack === 'python' ? 'python main.py' : 'npm run dev'}\n\n# Run tests\n${taskJson.environment.test_cmd}\n\`\`\`\n\n## Project Structure\n\n\`\`\`\n${projectName}/\n├── src/           # Source code\n├── tests/         # Tests\n├── docs/          # Documentation\n└── scripts/       # Build scripts\n\`\`\`\n\n---\n\n*Generated by Universal AI Coding Agent*\n`;
  fs.writeFileSync(path.join(projectDir, 'README.md'), readmeContent);
  console.log('  ✓ Created README.md');

  console.log('\n============================================================');
  console.log('  Project Created Successfully!');
  console.log('============================================================\n');

  console.log('  Next steps:');
  console.log(`    cd ${projectName}`);
  console.log('    ./init.sh');
  console.log('    claude (to implement tasks)\n');
}

/**
 * Continue working on existing project
 */
async function continueProject({ task }) {
  console.log('\n============================================================');
  console.log('  Universal AI Coding Agent - Continue');
  console.log('============================================================\n');

  // Check for task.json
  if (!fs.existsSync('task.json')) {
    console.error('  ✗ task.json not found. Are you in a project directory?');
    process.exit(1);
  }

  console.log('  Ready to continue. Run: claude');
  console.log('  Agent will read task.json and implement the next task.\n');
}

/**
 * Show project status
 */
async function showStatus() {
  console.log('\n============================================================');
  console.log('  Project Status');
  console.log('============================================================\n');

  // Check for task.json
  if (!fs.existsSync('task.json')) {
    console.error('  ✗ task.json not found. Are you in a project directory?');
    process.exit(1);
  }

  const taskJson = JSON.parse(fs.readFileSync('task.json', 'utf8'));
  const total = taskJson.tasks.length;
  const completed = taskJson.tasks.filter(t => t.passes).length;
  const remaining = total - completed;
  const percent = Math.round((completed / total) * 100);

  console.log(`  Project: ${taskJson.project}`);
  console.log(`  Description: ${taskJson.description}`);
  console.log(`  Stack: ${taskJson.environment.sdk}`);
  console.log('');
  console.log(`  Progress: ${completed}/${total} tasks (${percent}%)`);
  console.log(`  Remaining: ${remaining} tasks`);
  console.log('');

  if (remaining > 0) {
    const nextTask = taskJson.tasks.find(t => !t.passes);
    if (nextTask) {
      console.log(`  Next Task: #${nextTask.id} - ${nextTask.title}`);
      console.log(`  Category: ${nextTask.category}`);
      console.log('');
    }
  } else {
    console.log('  ✓ All tasks complete!');
    console.log('  Run ./run-loop.sh to push to GitHub.\n');
  }
}

/**
 * Initialize environment
 */
async function initEnvironment() {
  console.log('\n============================================================');
  console.log('  Universal AI Coding Agent - Init');
  console.log('============================================================\n');

  const initSh = './init.sh';
  if (fs.existsSync(initSh)) {
    console.log('  Running init.sh...\n');
    execSync(`bash ${initSh}`, { stdio: 'inherit' });
  } else {
    console.error('  ✗ init.sh not found');
    process.exit(1);
  }
}

module.exports = {
  createProject,
  continueProject,
  showStatus,
  initEnvironment,
};
