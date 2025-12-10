module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'plugin:prettier/recommended',
    '@vue/airbnb',
    '@vue/typescript',
    '@tresjs/eslint-config',
  ],

  parserOptions: {
    parser: '@typescript-eslint/parser',
    requireConfigFile: false,
  },

  rules: {
    'vue/multi-word-component-names': 'off',
    'global-require': 'off',
    'no-new': 0, // Intrusive when using Chart.js instances.
    'no-underscore-dangle': 0, // Chart.js uses underscore dangles (_) internally.
    'import/no-unresolved': 0, // False positives regarding imports that use aliases.
    'no-param-reassign': 0,
    'arrow-parens': 0,
    'linebreak-style': 0,
    'object-curly-newline': 0,
    'arrow-body-style': 0,
    'no-plusplus': 0,
    'comma-dangle': 0,
    'object-shorthand': 0,
    'function-paren-newline': 0,
    'no-restricted-syntax': 0,
    'import/no-useless-path-segments': 0,
    'import/no-cycle': 0,
    'operator-linebreak': 0,
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'implicit-arrow-linebreak': 0,
    'vue/no-mutating-props': 0,
    'vue/no-multiple-template-root': 0,
    indent: 0,
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      rules: {
        semi: ['error', 'always'],
        quotes: ['error', 'single'],
        indent: ['error', 2],
        'linebreak-style': 0,
        'comma-spacing': ['error', { before: false, after: true }],
        'max-len': 'off',
      },
      env: {
        jest: true,
      },
    },
    {
      files: ['*.vue'],
      rules: {
        semi: ['error', 'always'],
        quotes: ['error', 'single'],
        indent: ['error', 2],
        'linebreak-style': 0,
        'comma-spacing': ['error', { before: false, after: true }],
        'max-len': 'off',
        'vue/max-attributes-per-line': [
          'error',
          {
            singleline: {
              max: 4,
            },
            multiline: {
              max: 3,
            },
          },
        ],
        'vue/html-indent': 0,
      },
    },
  ],
};
