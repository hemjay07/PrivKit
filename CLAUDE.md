# PrivKit - Solana Privacy CLI Scaffolding Tool

## Credentials & Links

- **GitHub Repository:** https://github.com/hemjay07/PrivKit.git
- **Helius API Key:** 31474b23-3342-4b2b-9b01-d66d18b74bb4
- **npm:** Logged in and ready to publish

## Project Overview

PrivKit is a CLI tool for scaffolding Solana privacy-focused applications, similar to create-react-app but for blockchain privacy development.

**Tagline:** "Zero to private in one command"

**Target:** $25,500 in hackathon prizes (Privacy Tooling $15k, Quicknode $3k, Helius $5k, Aztec $2.5k)

## Source Specification

**IMPORTANT:** The complete implementation details are in:
`/Users/mujeeb/Downloads/PRIVKIT_COMPLETE_SPEC_V3.md`

This file contains:
- Exact code for all 94 files
- Package.json contents with correct versions
- All template files (Privacy Cash, Light Protocol, Arcium, Full-Stack)
- CLI source code
- Landing page components
- Tests and CI/CD workflows

**Use this as your primary implementation reference.**

## Project Type

This is a **monorepo** with two packages:

1. **CLI Package** (`packages/cli/`)
   - npm package: `create-solana-privacy-app`
   - TypeScript, ESM, Commander.js
   - 4 templates for different privacy SDKs
   - Published to npm

2. **Landing Page** (`apps/web/`)
   - Next.js 14 marketing site
   - Animated terminal demo
   - Template showcase
   - Deployed to Vercel

## Tech Stack

### CLI Package
- Node.js 18+ (ESM)
- TypeScript 5.x
- Commander.js 12.x (CLI framework)
- @inquirer/prompts 7.x (interactive prompts)
- chalk 5.x (colored output)
- ora 8.x (spinners)
- Handlebars 4.x (templating)
- zod 3.x (validation)
- tsup (build)
- vitest (testing)

### Landing Page
- Next.js 14 (App Router)
- Tailwind CSS 3.4
- Framer Motion (animations)
- JetBrains Mono (terminal font)

## Design System

### Colors (Dark Theme)
```css
--background: #0a0a0b
--surface: #18181b
--border: #27272a
--text-primary: #fafafa
--text-secondary: #a1a1aa

--primary-blue: #3b82f6
--primary-purple: #8b5cf6
--accent-orange: #f97316
--success: #10b981
--error: #ef4444
--terminal-green: #22c55e
```

### Typography
- Headings: Inter, font-bold
- Body: Inter, font-normal
- Code/Terminal: JetBrains Mono

### Components
- Buttons: rounded-lg, transitions 200ms
- Cards: rounded-xl, border-border, hover:border-primary/50
- Terminal: bg-[#1a1a1a], green blinking cursor
- Copy button: icon with checkmark feedback

## Implementation Notes

### CLI Development
1. Use YOLO mode (no browser testing needed)
2. Test by running CLI locally with `npm link`
3. Verify generated projects actually build

### Landing Page Development
1. Use standard mode (needs visual verification)
2. Test responsive on 375px, 768px, 1440px
3. Verify terminal animation is smooth

### Template Testing
Each generated project should:
1. `npm install` without errors
2. `npm run build` without errors
3. `npm run dev` starts server
4. `npm run test` passes

## Key Files to Reference

From the spec (`/Users/mujeeb/Downloads/PRIVKIT_COMPLETE_SPEC_V3.md`):
- Section 6: CLI Core Implementation
- Section 7: Privacy Cash Template
- Section 8: Light Protocol Template
- Section 9: Arcium Template
- Section 10: Full-Stack Template
- Section 11: Shared Template Files
- Section 13: Testing Implementation
- Section 14: CI/CD Workflows
- Section 15: Documentation

## Quality Standards

- TypeScript strict mode
- ESM only (no CommonJS)
- All tests passing
- No console errors
- Responsive landing page
- Accessible (WCAG AA)
- Fast load times (<2s)

## Hackathon Focus Areas

1. **Privacy Tooling Track** - Core value proposition
2. **Helius Integration** - All templates use Helius RPC
3. **Open Source** - MIT license, public repo
4. **Developer Experience** - Clean CLI, great docs

## Commands

### CLI Package
```bash
cd packages/cli
npm install
npm run build
npm link
create-solana-privacy-app test-project -t privacy-cash
```

### Landing Page
```bash
cd apps/web
npm install
npm run dev
```

### Testing
```bash
npm run test        # Run tests
npm run test:run    # Single run
npm run lint        # Lint check
npm run typecheck   # Type check
```
