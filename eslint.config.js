import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {},
});

export default [
  ...compat.extends('next/core-web-vitals', 'eslint:recommended'),
  {
    rules: {
      // Next.js and React rules
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',

      // General code quality
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
    },
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      '*.config.*',
    ],
  },
];
