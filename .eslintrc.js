/**
 * ESLint Configuration for LifeKB
 * 
 * This configuration:
 * - Enforces code quality standards
 * - Prevents common errors and bugs
 * - Ensures TypeScript type safety
 * - Implements React and React Native best practices
 * - Integrates with Prettier for consistent formatting
 * 
 * Simplified configuration for initial project setup
 */

module.exports = {
  root: true, // Indicates this is the root ESLint configuration
  extends: [
    'eslint:recommended', // Basic ESLint recommendations
    'plugin:react/recommended', // React specific rules
    'prettier', // Disables ESLint rules that conflict with Prettier
  ],
  parser: '@typescript-eslint/parser', // Allows ESLint to understand TypeScript syntax
  plugins: ['react', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // Enable JSX parsing
    },
    ecmaVersion: 2021, // Use modern JavaScript features
    sourceType: 'module', // Use ECMAScript modules
  },
  env: {
    browser: true,
    node: true,
    es6: true, // Enable ES6 globals
  },
  rules: {
    'prettier/prettier': 'error', // Report Prettier violations as errors
    'react/prop-types': 'off', // Disable prop-types as we use TypeScript
    'react/react-in-jsx-scope': 'off', // Not needed with newer React versions
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect React version
    },
  },
  // Skip linting node_modules
  ignorePatterns: ['node_modules/', 'dist/', 'build/'],
}; 