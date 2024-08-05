// eslint.config.js
import { FlatConfigProvider, createFlatConfig } from 'eslint';
import recommendedJs from '@eslint/js';

const config = createFlatConfig([
  {
    languageOptions: {
      globals: {
        browser: 'readonly',
      },
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
    },
    plugins: {
      // Ajoutez d'autres plugins ici si nécessaire
    },
    rules: {
      // Ajoutez des règles personnalisées ici si nécessaire
    },
    overrides: [
      {
        files: ['**/*.ts'],
        parser: '@typescript-eslint/parser',
        plugins: ['@typescript-eslint'],
        rules: {
          // Règles spécifiques pour TypeScript
        },
      },
    ],
  },
  recommendedJs.configs.recommended,
]);

export default config;

