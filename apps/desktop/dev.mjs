/**
 * Kick-off dev mode (Vite + Electron) with bullet-proof binary resolution
 * for monorepo workspaces.
 *
 * Handles three lookup locations for CLI binaries:
 *   1. apps/desktop/node_modules/.bin
 *   2. <repo-root>/node_modules/.bin   (hoisted)
 *   3. $PATH                              (global / npx)
 */

import { resolve, dirname } from 'path';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import concurrently from 'concurrently';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot  = resolve(__dirname, '..', '..');
const isWin     = process.platform === 'win32';

/** Return absolute path to CLI if found, else fall back to plain cmd */
function bin(cmd) {
  const filename = isWin ? `${cmd}.cmd` : cmd;

  // 1. workspace-local
  const local = resolve(__dirname, 'node_modules', '.bin', filename);
  if (existsSync(local)) return local;

  // 2. monorepo root (hoisted)
  const hoisted = resolve(repoRoot, 'node_modules', '.bin', filename);
  if (existsSync(hoisted)) return hoisted;

  // 3. rely on $PATH
  return filename;
}

const viteCmd     = `${bin('vite')} --config vite.config.ts`;
const waitOnCmd   = `${bin('wait-on')} http://localhost:5173`;
const electronCmd = `${bin('electron')} .`;

/**
 * concurrently v8+ returns an object { result: Promise, commands, ... }
 * We only care about the `result` Promise for success & failure handling.
 */
const { result } = concurrently(
  [
    { command: viteCmd,                      name: 'VITE',     prefixColor: 'cyan'  },
    { command: `${waitOnCmd} && ${electronCmd}`, name: 'ELECTRON', prefixColor: 'green' },
  ],
  {
    killOthers: ['failure', 'success'],
    prefix: 'time',
  },
);

// Bubble up non-zero exits from any child process
result.catch(() => process.exit(1));
