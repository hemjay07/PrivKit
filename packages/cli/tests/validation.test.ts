import { describe, it, expect } from 'vitest';
import { validateProjectName } from '../src/utils/validation.js';

describe('validateProjectName', () => {
  it('rejects empty string', () => {
    const result = validateProjectName('');
    expect(result.valid).toBe(false);
    expect(result.error).toBe('Project name cannot be empty');
  });

  it('rejects whitespace-only string', () => {
    const result = validateProjectName('   ');
    expect(result.valid).toBe(false);
    expect(result.error).toBe('Project name cannot be empty');
  });

  it('accepts valid project name', () => {
    const result = validateProjectName('my-app');
    expect(result.valid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('rejects names with uppercase letters', () => {
    const result = validateProjectName('MyApp');
    expect(result.valid).toBe(false);
    expect(result.error).toBeDefined();
  });

  it('rejects names starting with dot', () => {
    const result = validateProjectName('.hidden');
    expect(result.valid).toBe(false);
    expect(result.error).toBeDefined();
  });

  it('rejects names with special characters and provides helpful message', () => {
    const result = validateProjectName('my@project!');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('special characters');
    expect(result.error).toContain('npm package names');
    expect(result.error).toContain('my-project');  // suggests valid alternative
  });

  it('rejects names with spaces and suggests dashes', () => {
    const result = validateProjectName('my project');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('cannot contain spaces');
    expect(result.error).toContain('my-project');
  });

  it('suggests lowercase dashed name for spaced input', () => {
    const result = validateProjectName('My Cool Project');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('my-cool-project');
  });

  it('rejects names exceeding 214 characters', () => {
    const longName = 'a'.repeat(215);
    const result = validateProjectName(longName);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('too long');
    expect(result.error).toContain('215 chars');
  });

  it('accepts names at the 214 character limit', () => {
    const maxName = 'a'.repeat(214);
    const result = validateProjectName(maxName);
    expect(result.valid).toBe(true);
  });
});
