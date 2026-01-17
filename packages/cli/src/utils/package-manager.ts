import { execSync } from 'child_process';
import { readdirSync } from 'fs';

export type PackageManager = 'npm' | 'yarn' | 'pnpm';

export function detectPackageManager(): PackageManager {
  // Check for user agent hint from npm/yarn/pnpm
  const userAgent = process.env.npm_config_user_agent;

  if (userAgent) {
    if (userAgent.includes('yarn')) return 'yarn';
    if (userAgent.includes('pnpm')) return 'pnpm';
  }

  // Check for lockfiles in cwd
  const cwd = process.cwd();

  try {
    const files = readdirSync(cwd);
    if (files.includes('yarn.lock')) return 'yarn';
    if (files.includes('pnpm-lock.yaml')) return 'pnpm';
  } catch {
    // Ignore errors
  }

  return 'npm';
}

export function isPackageManagerInstalled(pm: PackageManager): boolean {
  try {
    execSync(`${pm} --version`, { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}
