export default {
    printWidth: 80,
    tabWidth: 4,
    trailingComma: 'all',
    singleQuote: true,
    semi: true,
    plugins: [
        '@trivago/prettier-plugin-sort-imports',
        'prettier-plugin-tailwindcss',
    ],
    importOrder: [
        '<THIRD_PARTY_MODULES>',
        '^@/app',
        '^@/pages',
        '^@/widgets',
        '^@/features',
        '^@/entities',
        '^@/shared',
        '^[./]',
    ],
};
