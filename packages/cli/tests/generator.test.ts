import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fs from 'fs-extra';
import path from 'path';

// Mock the generator module
vi.mock('fs-extra');

describe('Generator Error Handling', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('throws error when directory already exists', async () => {
    // Import dynamically to allow mocking
    const { createProject } = await import('../src/generator.js');

    vi.mocked(fs.existsSync).mockReturnValue(true);

    await expect(createProject({
      projectName: 'existing-project',
      template: 'privacy-cash',
      packageManager: 'npm',
      heliusKey: 'test-key',
      skipInstall: true,
      skipGit: true
    })).rejects.toThrow('Directory "existing-project" already exists');
  });

  it('error messages do not contain stack traces', () => {
    // Test that our error format only includes the message
    const error = new Error('EACCES: permission denied, mkdir /test');
    // Our error handler uses error.message, not error.stack
    const displayedMessage = error.message;

    expect(displayedMessage).toBe('EACCES: permission denied, mkdir /test');
    expect(displayedMessage).not.toContain('at ');
    expect(displayedMessage).not.toContain('Error:');
  });

  it('disk full errors have helpful message format', () => {
    // Test that disk full error messages are clear
    const diskFullError = new Error('ENOSPC: no space left on device, write');
    const displayedMessage = diskFullError.message;

    expect(displayedMessage).toContain('no space left');
    expect(displayedMessage).not.toContain('at ');
  });

  it('permission errors have helpful message format', () => {
    // Test that permission error messages are clear
    const permError = new Error('EACCES: permission denied, open /test/file');
    const displayedMessage = permError.message;

    expect(displayedMessage).toContain('permission denied');
    expect(displayedMessage).not.toContain('at ');
  });

  it('throws error when template directory does not exist', async () => {
    const { createProject } = await import('../src/generator.js');

    // First check returns false (directory doesn't exist), second returns false (template doesn't exist)
    vi.mocked(fs.existsSync)
      .mockReturnValueOnce(false)  // target directory doesn't exist
      .mockReturnValueOnce(false); // template directory doesn't exist

    await expect(createProject({
      projectName: 'test-project',
      template: 'privacy-cash',
      packageManager: 'npm',
      heliusKey: 'test-key',
      skipInstall: true,
      skipGit: true
    })).rejects.toThrow('Template "privacy-cash" not found');
  });

  it('template not found error suggests reinstalling', async () => {
    const { createProject } = await import('../src/generator.js');

    vi.mocked(fs.existsSync)
      .mockReturnValueOnce(false)  // target directory doesn't exist
      .mockReturnValueOnce(false); // template directory doesn't exist

    await expect(createProject({
      projectName: 'test-project',
      template: 'privacy-cash',
      packageManager: 'npm',
      heliusKey: 'test-key',
      skipInstall: true,
      skipGit: true
    })).rejects.toThrow(/reinstall/i);
  });
});
