import { z } from 'zod';
import validateNpmPackageName from 'validate-npm-package-name';

export const TemplateSchema = z.enum([
  'privacy-cash',
  'light-protocol',
  'arcium',
  'full-stack'
]);

export const PackageManagerSchema = z.enum(['npm', 'yarn', 'pnpm']);

export const ConfigSchema = z.object({
  projectName: z.string().min(1),
  template: TemplateSchema,
  packageManager: PackageManagerSchema,
  heliusKey: z.string(),
  skipInstall: z.boolean(),
  skipGit: z.boolean()
});

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateProjectName(name: string): ValidationResult {
  if (!name || name.trim() === '') {
    return { valid: false, error: 'Project name cannot be empty' };
  }

  const result = validateNpmPackageName(name);

  if (!result.validForNewPackages) {
    const errors = [...(result.errors || []), ...(result.warnings || [])];
    return {
      valid: false,
      error: errors[0] || 'Invalid project name'
    };
  }

  return { valid: true };
}
