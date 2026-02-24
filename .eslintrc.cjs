module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:storybook/recommended',
    ],
    ignorePatterns: [
        'dist',
        '.eslintrc.cjs',
        'node_modules',
    ],
    parser: '@typescript-eslint/parser',
    plugins: [
        'react-refresh',
        '@typescript-eslint',
    ],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        // Indentation: 4 spaces.
        'indent': 'off',
        '@typescript-eslint/indent': ['error', 4],
        // Explicit Accessibility.
        '@typescript-eslint/explicit-member-accessibility': [
            'error',
            {
                accessibility: 'explicit',
                overrides: {
                    accessors: 'explicit',
                    constructors: 'no-public',
                    methods: 'explicit',
                    properties: 'explicit',
                    parameterProperties: 'explicit',
                },
            },
        ],
        // Explicit Return Types.
        '@typescript-eslint/explicit-function-return-type': [
            'error',
            {
                allowExpressions: false,
                allowTypedFunctionExpressions: true,
                allowHigherOrderFunctions: true,
                allowDirectConstAssertionInArrowFunctions: true,
                allowConciseArrowFunctionExpressionsStartingWithVoid: false,
            },
        ],
        // Semi colons.
        'semi': ['error', 'always'],
        '@typescript-eslint/semi': ['error', 'always'],
        // Quotes.
        'quotes': ['error', 'single'],
        '@typescript-eslint/quotes': ['error', 'single'],
        // Naming Convention.
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'default',
                format: ['camelCase'],
                leadingUnderscore: 'allow',
                trailingUnderscore: 'allow',
            },
            {
                selector: 'variable',
                format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
            },
            {
                selector: 'function',
                format: ['camelCase', 'PascalCase'],
            },
            {
                selector: 'typeLike',
                format: ['PascalCase'],
            },
            {
                selector: 'enumMember',
                format: ['UPPER_CASE'],
            },
            {
                selector: 'objectLiteralProperty',
                format: ['camelCase', 'UPPER_CASE', 'PascalCase', 'snake_case'],
            },
        ],
    },
};
