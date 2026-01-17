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

export interface ProjectConfig {
  projectName: string;
  template: 'privacy-cash' | 'light-protocol' | 'arcium' | 'full-stack';
  packageManager: 'npm' | 'yarn' | 'pnpm';
  heliusKey: string;
  skipInstall: boolean;
  skipGit: boolean;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}
