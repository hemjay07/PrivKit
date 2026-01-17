import path from 'path';
import fs from 'fs-extra';
import Handlebars from 'handlebars';
import { execSync } from 'child_process';
import { logger } from './utils/logger.js';
import { getTemplateDir } from './templates.js';
import type { ProjectConfig } from './index.js';

export async function createProject(config: ProjectConfig): Promise<void> {
  const targetDir = path.resolve(process.cwd(), config.projectName);
  const templateDir = getTemplateDir(config.template);
  const filesDir = path.join(templateDir, 'files');

  // Check if directory exists
  if (fs.existsSync(targetDir)) {
    throw new Error(`Directory "${config.projectName}" already exists`);
  }

  // Check if template exists
  if (!fs.existsSync(filesDir)) {
    throw new Error(`Template "${config.template}" not found at ${filesDir}`);
  }

  const spinner = logger.spinner('Creating project structure');

  try {
    // Copy and process template files
    await processDirectory(filesDir, targetDir, {
      projectName: config.projectName,
      heliusApiKey: config.heliusKey
    });
    spinner.succeed('Created project structure');

    // Create .env.local with actual Helius key
    const envLocalPath = path.join(targetDir, '.env.local');
    const envContent = `# Solana Network
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_URL=https://devnet.helius-rpc.com/?api-key=${config.heliusKey}

# Helius API Key
HELIUS_API_KEY=${config.heliusKey}
`;
    await fs.writeFile(envLocalPath, envContent, 'utf-8');

    // Install dependencies
    if (!config.skipInstall) {
      spinner.start('Installing dependencies (this may take a minute)');
      await installDependencies(targetDir, config.packageManager);
      spinner.succeed('Installed dependencies');
    }

    // Initialize git
    if (!config.skipGit) {
      spinner.start('Initializing git repository');
      initGit(targetDir);
      spinner.succeed('Initialized git repository');
    }

  } catch (error) {
    spinner.fail('Failed');
    // Clean up partial directory on error
    if (fs.existsSync(targetDir)) {
      try {
        await fs.remove(targetDir);
      } catch {
        // Ignore cleanup errors
      }
    }
    throw error;
  }
}

async function processDirectory(
  srcDir: string,
  destDir: string,
  variables: Record<string, string>
): Promise<void> {
  await fs.ensureDir(destDir);

  const entries = await fs.readdir(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);

    // Remove .hbs extension for destination
    const destName = entry.name.replace(/\.hbs$/, '');
    const destPath = path.join(destDir, destName);

    if (entry.isDirectory()) {
      await processDirectory(srcPath, destPath, variables);
    } else if (entry.name.endsWith('.hbs')) {
      // Process Handlebars template
      const content = await fs.readFile(srcPath, 'utf-8');
      const template = Handlebars.compile(content);
      const processed = template(variables);
      await fs.writeFile(destPath, processed, 'utf-8');
    } else {
      // Copy file as-is
      await fs.copy(srcPath, destPath);
    }
  }
}

async function installDependencies(
  targetDir: string,
  packageManager: string
): Promise<void> {
  const commands: Record<string, string> = {
    npm: 'npm install',
    yarn: 'yarn',
    pnpm: 'pnpm install'
  };

  const command = commands[packageManager];

  execSync(command, {
    cwd: targetDir,
    stdio: 'pipe',
    env: { ...process.env, npm_config_fund: 'false', npm_config_audit: 'false' }
  });
}

function initGit(targetDir: string): void {
  try {
    execSync('git init', { cwd: targetDir, stdio: 'pipe' });
    execSync('git add -A', { cwd: targetDir, stdio: 'pipe' });
    execSync('git commit -m "Initial commit from create-solana-privacy-app"', {
      cwd: targetDir,
      stdio: 'pipe'
    });
  } catch {
    // Git might not be installed, that's okay
  }
}
