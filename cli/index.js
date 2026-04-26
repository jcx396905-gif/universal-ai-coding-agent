#!/usr/bin/env node
/**
 * Universal AI Coding Agent - CLI Entry Point
 *
 * Usage:
 *   universal-agent create "Project idea"     Create a new project
 *   universal-agent continue                   Continue from where left off
 *   universal-agent status                    Show project status
 *   universal-agent help                      Show help message
 */

const { program } = require('commander');
const generator = require('./generator');

program
  .name('universal-agent')
  .description('Universal AI Coding Agent - Transform ideas into complete projects')
  .version('1.0.0');

program
  .command('create')
  .description('Create a new project from an idea')
  .argument('<idea>', 'The project idea to implement')
  .option('-s, --stack <stack>', 'Technology stack (nodejs, python, go, rust, flutter, react)')
  .option('-d, --dir <directory>', 'Project directory name')
  .option('-o, --open', 'Open project in editor after creation')
  .action(async (idea, options) => {
    try {
      await generator.createProject({ idea, ...options });
    } catch (error) {
      console.error('Error creating project:', error.message);
      process.exit(1);
    }
  });

program
  .command('continue')
  .description('Continue working on existing project')
  .option('-t, --task <id>', 'Task ID to work on')
  .action(async (options) => {
    try {
      await generator.continueProject(options);
    } catch (error) {
      console.error('Error continuing project:', error.message);
      process.exit(1);
    }
  });

program
  .command('status')
  .description('Show project status')
  .action(async () => {
    try {
      await generator.showStatus();
    } catch (error) {
      console.error('Error showing status:', error.message);
      process.exit(1);
    }
  });

program
  .command('init')
  .description('Initialize environment for existing project')
  .action(async () => {
    try {
      await generator.initEnvironment();
    } catch (error) {
      console.error('Error initializing environment:', error.message);
      process.exit(1);
    }
  });

program.parse();
