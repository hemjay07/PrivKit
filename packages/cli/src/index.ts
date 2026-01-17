import { Command } from 'commander';
import { input, select, password, confirm } from '@inquirer/prompts';
import { createProject } from './generator.js';
import { validateProjectName } from './utils/validation.js';
import { logger } from './utils/logger.js';
import { templates } from './templates.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function getPackageVersion(): string {
  try {
    const pkgPath = join(__dirname, '..', 'package.json');
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
    return pkg.version;
  } catch {
    return '1.0.0';
  }
}

export interface ProjectConfig {
  projectName: string;
  template: 'privacy-cash' | 'light-protocol' | 'arcium' | 'full-stack';
  packageManager: 'npm' | 'yarn' | 'pnpm';
  heliusKey: string;
  skipInstall: boolean;
  skipGit: boolean;
}

export async function run(): Promise<void> {
  const program = new Command();

  program
    .name('create-solana-privacy-app')
    .description('Zero to private in one command')
    .version(getPackageVersion())
    .argument('[project-name]', 'Name of the project')
    .option('-t, --template <name>', 'Template to use')
    .option('-p, --package-manager <pm>', 'Package manager (npm/yarn/pnpm)', 'npm')
    .option('-s, --skip-install', 'Skip dependency installation', false)
    .option('--skip-git', 'Skip git initialization', false)
    .option('--helius-key <key>', 'Helius API key')
    .option('-y, --yes', 'Skip prompts, use defaults', false)
    .action(async (projectNameArg, options) => {
      try {
        logger.banner();

        let config: ProjectConfig;

        if (options.yes) {
          // Non-interactive mode
          const projectName = projectNameArg || 'my-private-app';
          const validation = validateProjectName(projectName);
          if (!validation.valid) {
            logger.error(validation.error!);
            process.exit(1);
          }

          config = {
            projectName,
            template: options.template || 'privacy-cash',
            packageManager: options.packageManager,
            heliusKey: options.heliusKey || 'YOUR_HELIUS_API_KEY',
            skipInstall: options.skipInstall,
            skipGit: options.skipGit
          };
        } else {
          // Interactive mode
          const projectName = projectNameArg || await input({
            message: 'What is your project name?',
            default: 'my-private-app',
            validate: (value) => {
              const result = validateProjectName(value);
              return result.valid || result.error!;
            }
          });

          const template = options.template || await select({
            message: 'Which privacy template would you like to use?',
            choices: templates.map(t => ({
              name: `${t.name.padEnd(18)} ${t.description}`,
              value: t.name
            }))
          });

          const packageManager = options.packageManager !== 'npm'
            ? options.packageManager
            : await select({
                message: 'Which package manager do you prefer?',
                choices: [
                  { name: 'npm', value: 'npm' },
                  { name: 'yarn', value: 'yarn' },
                  { name: 'pnpm', value: 'pnpm' }
                ]
              });

          // IMPORTANT: Using password() for masked input - this is feature #1
          const heliusKey = options.heliusKey || await password({
            message: 'Enter your Helius API key (get one free at helius.dev):',
            mask: '*'
          });

          const initGit = options.skipGit ? false : await confirm({
            message: 'Initialize a git repository?',
            default: true
          });

          config = {
            projectName,
            template: template as ProjectConfig['template'],
            packageManager: packageManager as ProjectConfig['packageManager'],
            heliusKey: heliusKey || 'YOUR_HELIUS_API_KEY',
            skipInstall: options.skipInstall,
            skipGit: !initGit
          };
        }

        // Validate template
        if (!templates.some(t => t.name === config.template)) {
          logger.error(`Invalid template: ${config.template}`);
          logger.info(`Available templates: ${templates.map(t => t.name).join(', ')}`);
          process.exit(1);
        }

        await createProject(config);
        logger.success(config.projectName, config.packageManager);

      } catch (error) {
        if (error instanceof Error && error.message.includes('User force closed')) {
          console.log('\n\nAborted.');
          process.exit(0);
        }
        logger.error(error instanceof Error ? error.message : String(error));
        process.exit(1);
      }
    });

  program.parse();
}
