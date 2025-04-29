/**
 * ESLint Configuration for LifeKB
 * 
 * Modern flat configuration format (ESLint 9+)
 */

import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

// Derive dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create compatibility layer for older configs
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // Enable JavaScript recommended rules
  js.configs.recommended,
  
  // Apply prettier compatibility
  ...compat.extends('prettier'),
  
  // Configure TypeScript and React for future use
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: {
        name: 'typescript-eslint',
        pluginName: '@typescript-eslint/parser',
      },
    },
  },
  
  {
    // Ignore specific files/directories
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      '*.config.js',
      'package-lock.json',
      '*.md',
      'docs/**'
    ]
  },
  
  {
    // Common rules
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
    }
  }
]; 