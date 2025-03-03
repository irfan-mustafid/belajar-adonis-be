import { configApp } from '@adonisjs/eslint-config';
import adonisJSPlugin from '@adonisjs/eslint-plugin';

export default [
  configApp(),
  {
    plugins: {
      '@adonisjs': adonisJSPlugin,
    },
    rules: {
      '@adonisjs/prefer-lazy-controller-import': 'error',
      '@adonisjs/prefer-lazy-listener-import': 'error',
    },
  },
];
