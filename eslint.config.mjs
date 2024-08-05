import { defineConfig } from 'eslint';
import globals from 'globals';
import pluginJs from '@eslint/js';

export default defineConfig({
  languageOptions: {
    globals: globals.browser,
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
  },
  plugins: {
    // Ajoutez des plugins ici si nécessaire
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
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
      ],
    },
  ],
});
