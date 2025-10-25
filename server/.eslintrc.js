module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    'airbnb-base'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'no-console': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-underscore-dangle': 'off',
    'consistent-return': 'off',
    'no-param-reassign': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }]
  }
};

