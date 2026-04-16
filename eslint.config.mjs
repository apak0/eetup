import eslintJS from '@eslint/js'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import unusedImports from 'eslint-plugin-unused-imports'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'
import reactPlugin from 'eslint-plugin-react'

export default defineConfig({
  plugins: {
    '@typescript-eslint': tseslint.plugin,
    'unused-imports': unusedImports,
    'simple-import-sort': simpleImportSort,
    react: reactPlugin,
  },
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      projectService: true,
    },
  },
  extends: [eslintJS.configs.recommended, tseslint.configs.strict],

  rules: {
    // Own rules:
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsForRegex: ['_$'] }],
    'react-hooks/exhaustive-deps': 'off',

    // Overwritten extended rules:
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
    'jsx-a11y/no-autofocus': 'off',

    // Plugin rules:
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Packages `react` related packages come first.
          ['^react', '^@?\\w'],
          // Aliases.
          ['^(index|constants|assets|styles)(/.*|$)'],
          ['^(components|utils|services)(/.*|$)'],
          ['^(pages)(/.*|$)'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports.
          ['^.+\\.?(css)$'],
        ],
      },
    ],
  },
})
