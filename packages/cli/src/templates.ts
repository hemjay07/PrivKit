import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface TemplateInfo {
  name: string;
  displayName: string;
  description: string;
}

export interface TemplateConfig {
  name: string;
  displayName: string;
  description: string;
  version: string;
  nodeVersion: string;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

export const templates: TemplateInfo[] = [
  {
    name: 'privacy-cash',
    displayName: 'Privacy Cash',
    description: 'Private transfers with Privacy Cash SDK'
  },
  {
    name: 'light-protocol',
    displayName: 'Light Protocol',
    description: 'ZK compression with Light Protocol'
  },
  {
    name: 'arcium',
    displayName: 'Arcium',
    description: 'MPC computation with Arcium'
  },
  {
    name: 'full-stack',
    displayName: 'Full Stack',
    description: 'All privacy integrations combined'
  }
];

export function getTemplateDir(templateName: string): string {
  // In development, templates are in ../templates relative to src
  // In production (after build), templates are in ../templates relative to dist
  const templatesRoot = join(__dirname, '..', 'templates');
  return join(templatesRoot, templateName);
}

export function getTemplateConfig(templateName: string): TemplateConfig {
  const templateDir = getTemplateDir(templateName);
  const configPath = join(templateDir, 'template.json');
  const content = readFileSync(configPath, 'utf-8');
  return JSON.parse(content);
}

export function checkNodeVersion(requiredVersion: string): {
  compatible: boolean;
  currentVersion: string;
  requiredVersion: string;
} {
  const currentVersion = process.version.replace('v', '');
  const currentMajor = parseInt(currentVersion.split('.')[0], 10);

  // Parse required version (e.g., ">=24.0.0" -> 24)
  const match = requiredVersion.match(/(\d+)/);
  const requiredMajor = match ? parseInt(match[1], 10) : 0;

  return {
    compatible: currentMajor >= requiredMajor,
    currentVersion: `v${currentVersion}`,
    requiredVersion
  };
}
