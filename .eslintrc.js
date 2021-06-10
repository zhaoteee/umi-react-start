module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'no-console': 0,
    'react-hooks/rules-of-hooks': 'error', // 检查 Hook 的规则
    'no-param-reassign': 0,
    'prefer-promise-reject-errors': 0,
  },
};
