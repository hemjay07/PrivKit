# PrivKit

```
  ██████╗ ██████╗ ██╗██╗   ██╗██╗  ██╗██╗████████╗
  ██╔══██╗██╔══██╗██║██║   ██║██║ ██╔╝██║╚══██╔══╝
  ██████╔╝██████╔╝██║██║   ██║█████╔╝ ██║   ██║
  ██╔═══╝ ██╔══██╗██║╚██╗ ██╔╝██╔═██╗ ██║   ██║
  ██║     ██║  ██║██║ ╚████╔╝ ██║  ██╗██║   ██║
  ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═══╝  ╚═╝  ╚═╝╚═╝   ╚═╝

  Zero to private in one command
```

**PrivKit** is the create-react-app for Solana privacy development. One command scaffolds a complete project with Privacy Cash, Light Protocol, or Arcium — pre-configured for devnet deployment with built-in privacy testing

## Quick Start

```bash
npx create-solana-privacy-app my-app
```

That's it! Your privacy-focused Solana app is ready.

## Features

- **Zero Config** - Get started immediately, no configuration needed
- **4 Templates** - Choose the right privacy SDK for your use case
- **Helius Integration** - Pre-configured with Helius RPC for optimal performance
- **TypeScript** - Full type safety out of the box
- **Testing Included** - Vitest setup with privacy-focused tests
- **Dark Theme** - Beautiful dark UI ready for your app

## Templates

| Template | Description | Node Version |
|----------|-------------|--------------|
| `privacy-cash` | Private transfers with Privacy Cash SDK | Node 24+ |
| `light-protocol` | ZK compression with Light Protocol | Node 18+ |
| `arcium` | MPC computation with Arcium | Node 18+ |
| `full-stack` | All privacy integrations combined | Node 18+ |

## Usage

### Interactive Mode (Recommended)

```bash
npx create-solana-privacy-app
```

Follow the prompts to:
1. Enter your project name
2. Choose a template
3. Select your package manager (npm/yarn/pnpm)
4. Enter your Helius API key (get one free at [helius.dev](https://helius.dev))

### Command Line Options

```bash
npx create-solana-privacy-app [project-name] [options]

Options:
  -t, --template <name>       Template: privacy-cash, light-protocol, arcium, full-stack
  -p, --package-manager <pm>  Package manager: npm, yarn, pnpm (default: npm)
  -s, --skip-install          Skip dependency installation
  --skip-git                  Skip git initialization
  --helius-key <key>          Helius API key
  -y, --yes                   Skip all prompts, use defaults
  -h, --help                  Show help
  -v, --version               Show version
```

### Examples

```bash
# Create with specific template
npx create-solana-privacy-app my-app -t privacy-cash

# Use yarn instead of npm
npx create-solana-privacy-app my-app -t light-protocol -p yarn

# Non-interactive with all defaults
npx create-solana-privacy-app my-app -y

# Skip installation (run npm install later)
npx create-solana-privacy-app my-app -t arcium -s
```

## Generated Project Structure

```
my-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout with providers
│   │   ├── page.tsx        # Demo page
│   │   ├── providers.tsx   # Client-side providers
│   │   └── globals.css     # Global styles (dark theme)
│   ├── components/         # UI components
│   ├── lib/
│   │   ├── solana.ts       # Solana connection (Helius)
│   │   └── privacy/        # SDK integration code
│   └── tests/              # Privacy tests
├── scripts/
│   └── deploy.ts           # Devnet deployment script
├── .env.example            # Environment template
├── package.json
└── README.md
```

## Available Scripts (Generated Project)

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run test     # Run privacy tests
npm run deploy   # Deploy to devnet
npm run lint     # Lint code
```

## Requirements

- **Node.js 18+** (Node 24+ for Privacy Cash template)
- **npm, yarn, or pnpm**
- **Helius API Key** - Get one free at [helius.dev](https://helius.dev)

## Project Structure (Monorepo)

```
privkit/
├── packages/
│   └── cli/                # npm package: create-solana-privacy-app
│       ├── src/            # CLI source code
│       ├── templates/      # Project templates
│       └── tests/          # CLI tests
└── apps/
    └── web/                # Marketing landing page
```

## Development

```bash
# Clone the repo
git clone https://github.com/hemjay07/PrivKit.git
cd privkit

# Run setup script
./init.sh

# Or manually:
npm install
cd packages/cli && npm install && npm run build && npm link
cd ../../apps/web && npm install
```

### CLI Development

```bash
cd packages/cli
npm run dev      # Watch mode
npm run build    # Build
npm run test     # Test
npm link         # Link for local testing

# Test locally
create-solana-privacy-app test-project
```

### Landing Page Development

```bash
cd apps/web
npm run dev      # localhost:3000
npm run build    # Production build
```

## Roadmap

- **Elusiv template** - Adding support once their SDK stabilizes
- **Dry-run mode** - Preview generated files before committing with `--dry-run`
- **Template versioning** - Pull updates into existing projects without re-scaffolding
- **`privkit doctor`** - Validate local dev setup (Solana CLI, Anchor, Node version) before scaffolding

## Contributing

Contributions are welcome! Please read our contributing guidelines.

## License

MIT License - see [LICENSE](LICENSE) for details.
