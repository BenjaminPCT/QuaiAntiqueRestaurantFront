// eslint.config.js
import { FlatConfigProvider, createFlatConfig } from 'eslint';
import { recommended as recommendedJsConfig } from '@eslint/js';

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
    // Ajoutez la configuration recommandée de ESLint directement
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
  recommendedJsConfig,
]);

export default config;
