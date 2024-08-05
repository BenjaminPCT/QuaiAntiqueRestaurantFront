const globals = require('globals');
const pluginJs = require('@eslint/js');

module.exports = {
  languageOptions: {
    globals: globals.browser,
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
  },
  extends: [
    'eslint:recommended',
    pluginJs.configs.recommended,
  ],
  rules: {
    // Ajoutez des règles personnalisées ici si nécessaire
  },
  overrides: [
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    },
  ],
};
