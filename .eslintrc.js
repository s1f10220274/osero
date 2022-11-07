const { ALL } = require('dns')

module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'standard',
    'eslint:recommended',
    //↓は↑より後に記述しなければならない。後に書いた方が優先だから
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  overrides: [],
  parserOptions: {
    complexity: ['error', 1],
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', '@typescript-eslint/recommended'],
  rules: {
    'no-dupe-args': ['error'],
    'no-dupe-keys': ['error'],
    'no-unreachable': ['error'],
  },
  ignorePatterns: [],
}
