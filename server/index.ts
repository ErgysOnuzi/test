// Next.js bridge for Replit workflow
import { spawn } from 'child_process';
import path from 'path';

console.log('Starting La Cantina Berlin Next.js Application...');

// Start Next.js development server on port 5000
const nextProcess = spawn('npx', ['next', 'dev', '--port', '5000'], {
  cwd: process.cwd(),
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV: 'development' },
});

nextProcess.on('error', (error) => {
  console.error('Failed to start Next.js:', error);
  process.exit(1);
});

nextProcess.on('close', (code) => {
  console.log(`Next.js process exited with code ${code}`);
  process.exit(code || 0);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down Next.js server...');
  nextProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('Shutting down Next.js server...');
  nextProcess.kill('SIGTERM');
});
