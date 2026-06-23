import js from '@eslint/js';
import globals from 'globals';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import sonarjs from 'eslint-plugin-sonarjs';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default defineConfig([
  globalIgnores(['coverage', 'dist', 'docs', 'node_modules']),
  js.configs.recommended,
  eslintPluginUnicorn.configs.all,
  sonarjs.configs.recommended,
  eslintConfigPrettier,
  {
    rules: {
      // Non-recommended JS rules that can catch problems
      'array-callback-return': 'error',
      'func-name-matching': 'error',
      'func-names': ['error', 'as-needed'],
      'guard-for-in': 'error',
      'id-denylist': ['error', 'cb', 'e', 'err'],
      'no-await-in-loop': 'error',
      'no-class-assign': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-control-regex': 'error',
      'no-debugger': 'error',
      'no-duplicate-imports': 'error',
      'no-extend-native': 'error',
      'no-octal-escape': 'error',
      'no-proto': 'error',
      'no-sequences': 'error',
      'no-setter-return': 'error',
      'no-shadow': 'error',
      'no-template-curly-in-string': 'error',
      'no-unreachable-loop': 'error',
      'no-unsafe-finally': 'error',
      'no-unsafe-optional-chaining': 'error',
      'no-useless-call': 'error',
      'no-useless-concat': 'error',
      'nonblock-statement-body-position': ['error', 'below'],
      'require-atomic-updates': 'error',
      'symbol-description': 'error',
      'use-isnan': 'error',
      curly: ['error', 'multi-line'],
      radix: 'error',
      strict: ['error', 'never'],
      // Annoying Sonar rules
      'sonarjs/cognitive-complexity': 'off', // some calendar-math functions are difficult to break up into _readable_ small functions
      'sonarjs/function-return-type': 'off', // different return types (ex: discriminated unions) are not an issue
      'sonarjs/no-nested-functions': 'off', // nested functions are very useful for closures in TS/JS
      'sonarjs/todo-tag': 'warn', // a "to do" comment should not break the build; but it's a good idea to periodically remind you about it
      // Annoying Unicorn rules
      'unicorn/no-null': 'off', // Douglas Crockford is wrong. "null" should be used as a literal when assigned manually, not "undefined".
      'unicorn/no-array-reverse': 'off', // toReversed() is only available in ES2023.
      'unicorn/no-array-sort': 'off', // This method is only available in ES2023.
      'unicorn/no-useless-undefined': ['error', { checkArguments: false }], // you cannot omit function arguments in strict TS (in tests)
      'unicorn/numeric-separators-style': 'off', // always forcing underscores in numeric constants makes no sense
      'unicorn/prefer-string-replace-all': 'off', // replace(/[set of numbers]/g) is way more terse for fallback GUID generation
      'unicorn/prevent-abbreviations': 'off', // "ref" and "args" abbreviations are commonly used
    },
  },
  {
    files: ['**/*.ts'],
    extends: [tseslint.configs.strictTypeChecked],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.builtin,
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      // TS rules
      '@typescript-eslint/unified-signatures': 'off', // allow various overloads
    },
  },
  {
    files: ['scripts/**/*.mjs'],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      'no-console': 'off', // build/codegen scripts report progress to stdout by design
    },
  },
  {
    files: ['tests/**/*.ts'],
    rules: {
      // Test files delegate their `it`/`test` calls through shared helpers
      // (testDateUnitFn, testWeekFn, etc.), so Sonar's static check can't see
      // the assertions and flags every file as empty.
      'sonarjs/no-empty-test-file': 'off',
    },
  },
]);
