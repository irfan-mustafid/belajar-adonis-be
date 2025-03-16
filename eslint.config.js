import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default [
  {
    files: ['**/*.{js,ts}'], // Target semua file JS dan TS
    languageOptions: {
      parser: tsParser, // Gunakan TypeScript parser
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'prettier': prettierPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules, // Aturan rekomendasi TypeScript
      ...prettierConfig.rules, // Integrasi Prettier
      'prettier/prettier': 'error', // Jalankan Prettier sebagai linting
      'no-console': 'warn', // Peringatkan jika ada console.log
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' }, // Abaikan argumen dengan prefix '_'
      ],
      'eqeqeq': ['error', 'always'], // Wajib pakai strict equality (===)
      'max-lines': ['error', 300], // Maksimal 300 baris per file
    },
  },
]
