import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import eslintConfigPrettier from 'eslint-config-prettier';
// @ts-expect-error - No types available
import drizzlePlugin from 'eslint-plugin-drizzle';
import globals from 'globals';

const config = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      '.github/**',
    ],
  },
  eslintConfigPrettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      drizzle: drizzlePlugin,
    },
    rules: {
      ...drizzlePlugin.configs.recommended.rules,
      semi: 'warn',
      eqeqeq: 'warn',
      curly: 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-misused-promises': [
        2,
        {
          checksVoidReturn: { attributes: false },
        },
      ],
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      // Legacy mobile-menu hook reads refs during render. The new primary
      // navigation does not import it, but keep linting non-blocking until the
      // archived component is removed.
      'react-hooks/refs': 'off',
      'drizzle/enforce-delete-with-where': 'error',
      'drizzle/enforce-update-with-where': 'error',
    },
  },
];

export default config;
