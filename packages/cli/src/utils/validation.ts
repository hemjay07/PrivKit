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

  // Check length (npm limit is 214 characters)
  const MAX_LENGTH = 214;
  if (name.length > MAX_LENGTH) {
    return {
      valid: false,
      error: `Project name is too long (${name.length} chars). npm package names must be ${MAX_LENGTH} characters or less.`
    };
  }

  // Check for spaces first and provide helpful suggestion
  if (name.includes(' ')) {
    const suggested = name.toLowerCase().replace(/\s+/g, '-');
    return {
      valid: false,
      error: `Project name cannot contain spaces. Try "${suggested}" instead.`
    };
  }

  // Check for special characters and provide helpful message
  const specialChars = name.match(/[^a-z0-9-_.]/gi);
  if (specialChars) {
    const uniqueChars = [...new Set(specialChars)].join(', ');
    const cleaned = name.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    return {
      valid: false,
      error: `Project name cannot contain special characters (found: ${uniqueChars}). npm package names must use lowercase letters, numbers, and hyphens. Try "${cleaned || 'my-app'}" instead.`
    };
  }

  const result = validateNpmPackageName(name);

  if (!result.validForNewPackages) {
    const errors = [...(result.errors || []), ...(result.warnings || [])];
    // Add npm naming rules reference for any other validation failures
    const baseError = errors[0] || 'Invalid project name';
    return {
      valid: false,
      error: `${baseError}. See npm naming rules: https://docs.npmjs.com/cli/v10/configuring-npm/package-json#name`
    };
  }

  return { valid: true };
}
