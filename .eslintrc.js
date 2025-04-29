/**
 * ESLint Configuration for LifeKB
 * 
 * This configuration:
 * - Enforces code quality standards
 * - Prevents common errors and bugs
 * - Ensures TypeScript type safety
 * - Implements React and React Native best practices
 * - Integrates with Prettier for consistent formatting
 */

module.exports = {
  root: true, // Indicates this is the root ESLint configuration
  extends: [
    'eslint:recommended', // Basic ESLint recommendations
    'plugin:@typescript-eslint/recommended', // TypeScript specific rules
    'plugin:react/recommended', // React specific rules
    'plugin:react-hooks/recommended', // React Hooks rules
    'plugin:react-native/all', // React Native specific rules
    'prettier', // Disables ESLint rules that conflict with Prettier
  ],
  parser: '@typescript-eslint/parser', // Allows ESLint to understand TypeScript syntax
  plugins: ['@typescript-eslint', 'react', 'react-native', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // Enable JSX parsing
    },
    ecmaVersion: 2021, // Use modern JavaScript features
    sourceType: 'module', // Use ECMAScript modules
  },
  env: {
    'react-native/react-native': true, // Enable React Native global variables
    es6: true, // Enable ES6 globals
  },
  rules: {
    'prettier/prettier': 'error', // Report Prettier violations as errors
    'react/prop-types': 'off', // Disable prop-types as we use TypeScript
    'react/react-in-jsx-scope': 'off', // Not needed with newer React versions
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Don't require explicit return types
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Allow unused vars with _ prefix
    'react-native/no-inline-styles': 'warn', // Discourage inline styles in components
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect React version
    },
  },
}; 