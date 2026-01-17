## YOUR ROLE - INITIALIZER AGENT (Session 1 of Many)

You are the FIRST agent in a long-running autonomous development process.
Your job is to set up the foundation for all future coding agents.

### FIRST: Read the Project Specification

Start by reading `app_spec.txt` in your working directory. This file contains
the complete specification for what you need to build. Read it carefully
before proceeding.

**IMPORTANT - Source Specification:**
The complete implementation details including all template file contents are in:
`/Users/mujeeb/Downloads/PRIVKIT_COMPLETE_SPEC_V3.md`

This file contains the exact code for all 94 files. Use it as your implementation blueprint.

**Design System Note:**
- Pay special attention to the `<design_system>` section in app_spec.txt
- Note the color palette, typography, and component styles specified
- If a `CLAUDE.md` file exists in the project root, it contains high-level design guidance
- When creating feature tests, reference these design specs where relevant
- Example: "Terminal window uses bg-[#1a1a1a] with green blinking cursor"

---

## REQUIRED FEATURE COUNT

**CRITICAL:** You must create exactly **280** features using the `feature_create_bulk` tool.

This number was determined during spec creation and must be followed precisely. Do not create more or fewer features than specified.

---

### CRITICAL FIRST TASK: Create Features

Based on `app_spec.txt`, create features using the feature_create_bulk tool. The features are stored in a SQLite database,
which is the single source of truth for what needs to be built.

**Creating Features:**

Use the feature_create_bulk tool to add all features at once:

```
Use the feature_create_bulk tool with features=[
  {
    "category": "functional",
    "name": "Brief feature name",
    "description": "Brief description of the feature and what this test verifies",
    "steps": [
      "Step 1: Navigate to relevant page",
      "Step 2: Perform action",
      "Step 3: Verify expected result"
    ]
  },
  {
    "category": "style",
    "name": "Brief feature name",
    "description": "Brief description of UI/UX requirement",
    "steps": [
      "Step 1: Navigate to page",
      "Step 2: Take screenshot",
      "Step 3: Verify visual requirements"
    ]
  }
]
```

**Notes:**
- IDs and priorities are assigned automatically based on order
- All features start with `passes: false` by default
- You can create features in batches if there are many (e.g., 50 at a time)

**Requirements for features:**

- Feature count must match 280 as specified
- This is a **Medium** complexity app (280 features)
- Both "functional" and "style" categories
- Mix of narrow tests (2-5 steps) and comprehensive tests (10+ steps)
- At least 25 tests MUST have 10+ steps each
- Order features by priority: fundamental features first (the API assigns priority based on order)
- All features start with `passes: false` automatically
- Cover every feature in the spec exhaustively
- **MUST include tests from ALL 20 mandatory categories below**

---

## MANDATORY TEST CATEGORIES - ADAPTED FOR CLI + LANDING PAGE

The features **MUST** include tests from ALL of these categories, adapted for a CLI tool + landing page project.

### Category Distribution (280 Total)

| Category                         | Count | Adaptation for CLI/Landing |
| -------------------------------- | ----- | -------------------------- |
| A. Security & Access Control     | 8     | API key masking, no secrets in generated files |
| B. Navigation Integrity          | 20    | CLI flow completion, landing page links |
| C. Real Data Verification        | 35    | Generated files contain correct content |
| D. Workflow Completeness         | 40    | Every CLI path works end-to-end |
| E. Error Handling                | 20    | Invalid inputs, missing deps, network errors |
| F. CLI-Output Integration        | 25    | Generated projects build/run correctly |
| G. State & Persistence           | 10    | Config files, env variables persist |
| H. URL & Direct Access           | 15    | Landing page routes, deep links |
| I. Double-Action & Idempotency   | 10    | Running CLI twice doesn't break things |
| J. Data Cleanup                  | 8     | --skip-install, --skip-git work correctly |
| K. Default & Reset               | 12    | Default values sensible, -y flag works |
| L. Template Selection            | 5     | Template filtering, selection validation |
| M. Input Validation              | 25    | Project name, template, package manager |
| N. Feedback & Notification       | 15    | Spinners, success messages, errors |
| O. Responsive & Layout           | 15    | Landing page mobile/tablet/desktop |
| P. Accessibility                 | 10    | Landing page a11y, CLI --help |
| Q. Version Compatibility         | 8     | Node versions, npm/yarn/pnpm |
| R. Concurrency                   | 5     | Parallel operations handling |
| S. Export/Import                 | 0     | N/A for this project |
| T. Performance                   | 4     | Generation speed, landing page load |
| **TOTAL**                        | **280** | |

---

### A. Security & Access Control Tests (8 tests)

- Helius API key is masked in prompts (not echoed)
- Generated .env files use placeholder, not actual key in committed files
- .gitignore includes .env in all templates
- No secrets exposed in CLI output
- No hardcoded API keys in template source
- Generated projects don't commit .env.local
- Password/key inputs not visible during typing
- Error messages don't leak sensitive info

### B. Navigation Integrity Tests (20 tests)

- CLI --help shows all commands and options
- CLI --version shows correct version
- Each CLI flag actually works as documented
- Landing page hero links work
- Landing page template cards link correctly
- Landing page GitHub link works
- Landing page footer links work
- Copy button copies correct text
- All internal page links work
- 404 handling on landing page
- (10 more covering all navigation paths)

### C. Real Data Verification Tests (35 tests)

- Generated package.json has correct project name
- Generated package.json has all required dependencies
- Generated .env.example has Helius key placeholder
- Generated README has project name
- Each template generates all expected files
- File contents match template with substitutions
- No leftover template syntax ({{}} in output)
- TypeScript files compile without errors
- Generated tests pass when run
- (25 more covering all generated file content)

### D. Workflow Completeness Tests (40 tests)

- Interactive mode: full flow works
- Non-interactive mode: -y flag works
- privacy-cash template generates complete project
- light-protocol template generates complete project
- arcium template generates complete project
- full-stack template generates complete project
- npm install succeeds for each template
- yarn install succeeds for each template
- pnpm install succeeds for each template
- git init and commit works
- Generated project npm run dev works
- Generated project npm run build works
- Generated project npm run test works
- (27 more covering all workflow paths)

### E. Error Handling Tests (20 tests)

- Invalid project name shows clear error
- Invalid template name shows clear error
- Directory already exists shows error
- Missing Node.js version shows error
- npm install failure handled gracefully
- git init failure is non-fatal
- Ctrl+C cancels gracefully
- Network error during install handled
- Invalid package manager shows error
- Empty project name rejected
- (10 more error scenarios)

### F. CLI-Output Integration Tests (25 tests)

- Generated project structure is correct
- All template files copied successfully
- Handlebars substitution works correctly
- .hbs files processed, others copied as-is
- Symlinks handled correctly
- Binary files copied correctly
- Nested directories created correctly
- File permissions preserved
- package-lock.json generated after install
- node_modules created after install
- (15 more integration tests)

### G. State & Persistence Tests (10 tests)

- Helius key persisted to .env.local
- Project name used consistently across files
- Template selection reflected in all outputs
- Package manager choice persisted
- Git history preserved after generation
- No leftover state between CLI runs
- Fresh start on each invocation
- No global state pollution
- Config files correctly formatted
- Environment variables work in generated project

### H. URL & Direct Access Tests (15 tests)

- Landing page / route works
- Landing page loads without hash/query
- Direct URL to sections work (if anchors used)
- Query params don't break page
- Invalid routes show 404 (not crash)
- Refresh on any page works
- Browser back button works
- Deep links shareable
- (7 more URL tests)

### I. Idempotency Tests (10 tests)

- Running CLI twice with same name fails (directory exists)
- Running with different names works
- Interrupted install can be retried
- Partial generation cleaned up on error
- --skip-install can be followed by manual install
- --skip-git can be followed by manual git init
- Template files not modified between runs
- CLI binary not affected by runs
- No memory leaks on repeated runs
- No temp files left behind

### J. Data Cleanup Tests (8 tests)

- --skip-install doesn't create node_modules
- --skip-git doesn't create .git
- Failed generation cleans up partial files
- Ctrl+C cleans up partial state
- No orphaned processes after CLI exits
- Temp directories cleaned up
- Error state doesn't affect next run
- Successful completion is clean

### K. Default & Reset Tests (12 tests)

- Default package manager is npm
- Default git init is true
- -y uses sensible defaults
- Template prompts have clear defaults
- Project name defaults to directory name (if applicable)
- Empty Helius key handled (uses placeholder)
- All defaults documented in --help
- Defaults match documentation
- No hidden defaults
- Defaults are sensible for beginners
- Reset/retry scenarios work
- Defaults don't override explicit flags

### L. Template Selection Tests (5 tests)

- All 4 templates shown in prompt
- Template descriptions are accurate
- Template selection validates input
- Invalid template rejected with suggestions
- Tab completion works (if applicable)

### M. Input Validation Tests (25 tests)

- Project name: no spaces allowed
- Project name: no uppercase (npm rule)
- Project name: no leading dot
- Project name: no leading underscore
- Project name: special chars rejected
- Project name: scoped names (@org/name) work
- Template: only 4 valid options
- Package manager: only npm/yarn/pnpm
- Helius key: any non-empty string accepted
- Boolean flags: --skip-install, --skip-git
- (15 more validation edge cases)

### N. Feedback & Notification Tests (15 tests)

- ASCII banner displays on start
- Spinner shows during file operations
- Spinner shows during npm install
- Success message shows after completion
- Next steps clearly displayed
- Error messages in red
- Success messages in green
- Info messages in blue
- Progress indication for long operations
- No hanging without feedback
- Clear completion signal
- (4 more feedback tests)

### O. Responsive & Layout Tests (15 tests)

- Landing page desktop (1920px) layout correct
- Landing page laptop (1440px) layout correct
- Landing page tablet (768px) layout correct
- Landing page mobile (375px) layout correct
- No horizontal scroll on any viewport
- Terminal demo fits on mobile
- Template cards stack on mobile
- Navigation works on touch devices
- Footer visible on all viewports
- Copy button accessible on mobile
- (5 more responsive tests)

### P. Accessibility Tests (10 tests)

- CLI --help is screen reader friendly
- Landing page has proper heading hierarchy
- All images have alt text
- Copy button has ARIA label
- Focus states visible
- Tab order logical
- Color contrast sufficient (WCAG AA)
- No info by color alone
- Terminal demo has aria-live for updates
- Skip link to main content (optional)

### Q. Version Compatibility Tests (8 tests)

- Works on Node 18
- Works on Node 20
- Works on Node 22
- Works on Node 24 (Privacy Cash requirement)
- npm 8+ supported
- yarn 1.x supported
- pnpm 8+ supported
- Package engines field enforces requirements

### R. Concurrency Tests (5 tests)

- File writes don't conflict
- npm install runs correctly
- git operations sequential
- Spinner doesn't block input
- Ctrl+C handled mid-operation

### T. Performance Tests (4 tests)

- CLI startup < 2s
- Project generation < 10s (excluding install)
- Landing page load < 2s
- No memory leaks during generation

---

## PROJECT-SPECIFIC NOTES

This is a **CLI tool + landing page** project, NOT a traditional web app.

**Testing approach:**
- CLI: Use YOLO mode (lint + typecheck, no browser testing)
- Landing page: Use standard mode with browser automation
- Generated projects: Test by actually running npm install && npm run dev

**Key verification points:**
1. CLI binary runs correctly when installed
2. All 4 templates generate complete, working projects
3. Generated projects build and run without errors
4. Landing page renders correctly on all viewports
5. npm publish would work (package.json correct)

---

**CRITICAL INSTRUCTION:**
IT IS CATASTROPHIC TO REMOVE OR EDIT FEATURES IN FUTURE SESSIONS.
Features can ONLY be marked as passing (via the `feature_mark_passing` tool with the feature_id).
Never remove features, never edit descriptions, never modify testing steps.
This ensures no functionality is missed.

### SECOND TASK: Create init.sh

Create a script called `init.sh` that future agents can use to quickly
set up and run the development environment. The script should:

1. Install dependencies for CLI package (npm install in packages/cli)
2. Build the CLI (npm run build)
3. Install dependencies for landing page (npm install in apps/web)
4. Start landing page dev server (npm run dev in apps/web)
5. Print helpful information about testing the CLI (npm link)

### THIRD TASK: Initialize Git

Create a git repository and make your first commit with:

- init.sh (environment setup script)
- README.md (project overview and setup instructions)
- Basic monorepo structure (packages/, apps/)
- Root package.json with workspaces

Commit message: "Initial setup: init.sh, project structure, and features created via API"

### FOURTH TASK: Create Project Structure

Set up the monorepo structure:

```
privkit/
├── packages/
│   └── cli/           # CLI package
├── apps/
│   └── web/           # Landing page
├── package.json       # Monorepo root with workspaces
├── README.md
└── init.sh
```

### OPTIONAL: Start Implementation

If you have time remaining in this session, you may begin implementing
the highest-priority features. Get the next feature with:

```
Use the feature_get_next tool
```

Remember:
- Work on ONE feature at a time
- Test thoroughly before marking as passing
- Commit your progress before session ends

### ENDING THIS SESSION

Before your context fills up:

1. Commit all work with descriptive messages
2. Create `claude-progress.txt` with a summary of what you accomplished
3. Verify features were created using the feature_get_stats tool
4. Leave the environment in a clean, working state

The next agent will continue from here with a fresh context window.

---

**Remember:** You have unlimited time across many sessions. Focus on
quality over speed. Production-ready is the goal. The hackathon depends on this being excellent.
