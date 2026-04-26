#!/bin/bash
# ============================================================
# Universal AI Coding Agent - Automation Loop
# ============================================================
# This script runs the AI agent loop until all tasks are complete.
#
# Usage: ./run-loop.sh
#        ./run-loop.sh --dry-run    # Show next task without executing
#        ./run-loop.sh --single     # Run only one iteration
# ============================================================

set -e

# Configuration
DRY_RUN=false
SINGLE_RUN=false
MAX_ITERATIONS=1000

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --dry-run)
      DRY_RUN=true
      shift
      ;;
    --single)
      SINGLE_RUN=true
      shift
      ;;
    --help|-h)
      echo "Usage: $0 [options]"
      echo ""
      echo "Options:"
      echo "  --dry-run    Show next task without executing"
      echo "  --single     Run only one iteration"
      echo "  --help, -h   Show this help message"
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
done

# Check for required files
if [ ! -f "task.json" ]; then
  echo "Error: task.json not found in current directory"
  exit 1
fi

if [ ! -f "AGENT.md" ]; then
  echo "Error: AGENT.md not found in current directory"
  exit 1
fi

# Count remaining tasks
count_remaining() {
  grep -c '"passes": false' task.json 2>/dev/null || echo "0"
}

# Get next task ID
get_next_task_id() {
  grep -A 5 '"passes": false' task.json | grep '"id":' | head -1 | sed 's/[^0-9]//g'
}

# Get next task title
get_next_task_title() {
  local id=$(get_next_task_id)
  if [ -n "$id" ]; then
    grep -A 10 "\"id\": $id," task.json | grep '"title":' | sed 's/[^:]*: *"\([^"]*\)"/\1/' | tr -d ' '
  fi
}

# Display header
echo "============================================================"
echo "  Universal AI Coding Agent - Automation Loop"
echo "============================================================"
echo ""
echo "  Project: $(grep '"project":' task.json | sed 's/[^:]*: *"\([^"]*\)"/\1/')"
echo "  Description: $(grep '"description":' task.json | head -1 | sed 's/[^:]*: *"\([^"]*\)"/\1/')"
echo ""

# Initialize progress file if it doesn't exist
if [ ! -f "progress.txt" ]; then
  if [ -f "progress-template.txt" ]; then
    cp progress-template.txt progress.txt
  else
    echo "# Progress Log" > progress.txt
  fi
fi

# Main loop
ITERATION=0
REMAINING=$(count_remaining)

while [ "$REMAINING" -gt 0 ] && [ $ITERATION -lt $MAX_ITERATIONS ]; do
  ITERATION=$((ITERATION + 1))

  echo "============================================================"
  echo "  Iteration: $ITERATION | Remaining Tasks: $REMAINING"
  echo "============================================================"
  echo ""

  NEXT_ID=$(get_next_task_id)
  NEXT_TITLE=$(get_next_task_title)

  if [ -z "$NEXT_ID" ]; then
    echo "Error: Could not determine next task"
    exit 1
  fi

  echo "  Next Task: #$NEXT_ID - $NEXT_TITLE"
  echo ""

  if [ "$DRY_RUN" = true ]; then
    echo "  [Dry Run] Would execute task: $NEXT_TITLE"
    echo ""
    echo "  To execute, run without --dry-run flag"
    exit 0
  fi

  # Check for init script and run it
  if [ -f "init.sh" ]; then
    echo "  Running init.sh..."
    ./init.sh
    echo ""
  fi

  # Run the AI agent for this task
  echo "  Executing AI agent..."
  echo ""

  # Method 1: If claude CLI is available
  if command -v claude &> /dev/null; then
    claude --print << 'AGENT_PROMPT'
Read task.json and implement the next incomplete task (where passes: false).

Follow the AGENT.md instructions:
1. Read the task description and steps
2. Implement the functionality
3. Test with lint → test → build quality gates
4. Update progress.txt with your work
5. Commit with git add . && git commit

IMPORTANT:
- Complete ONE task per iteration
- All quality gates must pass before marking task complete
- Update task.json passes to true only after verification
- If blocked, write to progress.txt and stop with clear explanation
AGENT_PROMPT

  # Method 2: Fallback to claude-code
  elif command -v claude-code &> /dev/null; then
    claude-code << 'AGENT_PROMPT'
Read task.json and implement the next incomplete task (where passes: false).

Follow the AGENT.md instructions:
1. Read the task description and steps
2. Implement the functionality
3. Test with lint → test → build quality gates
4. Update progress.txt with your work
5. Commit with git add . && git commit
AGENT_PROMPT

  else
    echo "Error: Neither claude nor claude-code CLI found"
    echo ""
    echo "Please ensure your AI agent CLI is installed and in PATH"
    echo "Or run the agent manually with: claude (or claude-code)"
    exit 1
  fi

  echo ""
  REMAINING=$(count_remaining)

  if [ "$SINGLE_RUN" = true ]; then
    echo "  [Single Run Mode] Stopping after one iteration"
    exit 0
  fi

  echo ""
done

# Summary
echo "============================================================"
echo "  All Tasks Complete!"
echo "============================================================"
echo ""
echo "  Total Iterations: $ITERATION"
echo "  Tasks Completed: All"
echo ""

# Final git status
if command -v git &> /dev/null; then
  echo "  Git Status:"
  git log --oneline -5 2>/dev/null || echo "  No commits yet"
  echo ""
fi

echo "============================================================"
echo "  Project Complete!"
echo "============================================================"

exit 0
