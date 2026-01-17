import fs from 'fs-extra';
import path from 'path';

export async function directoryExists(dir: string): Promise<boolean> {
  try {
    const stats = await fs.stat(dir);
    return stats.isDirectory();
  } catch {
    return false;
  }
}

export async function fileExists(file: string): Promise<boolean> {
  try {
    const stats = await fs.stat(file);
    return stats.isFile();
  } catch {
    return false;
  }
}

export async function ensureDir(dir: string): Promise<void> {
  await fs.ensureDir(dir);
}

export async function copyDir(src: string, dest: string): Promise<void> {
  await fs.copy(src, dest);
}

export async function readFile(file: string): Promise<string> {
  return fs.readFile(file, 'utf-8');
}

export async function writeFile(file: string, content: string): Promise<void> {
  await fs.ensureDir(path.dirname(file));
  await fs.writeFile(file, content, 'utf-8');
}
