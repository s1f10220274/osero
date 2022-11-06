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
    'prettier',
    'standard',
    'eslint:recommended',
    //↓は↑より後に記述しなければならない。後に書いた方が優先だから
    'plugin:@typescript-eslint/recommended',
    {
      /*} 'no-dupe-args',
    'no-dupe-keys',

    'no-extra-semi',
    'no-irregular-whitespace',
    'no-unreachable',
    'curly',
  'all',*/
    },
  ],
  overrides: [],
  parserOptions: {
    complexity: ['error', 1],
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react'],
  rules: { curly: ALL },
  ignorePatterns: [],
}
