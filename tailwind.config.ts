import type { Config } from 'tailwindcss';

const config = {
    darkMode: ['class'],
    content: ['./src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            borderWidth: {
                '0.5': '0.5px',
            },
            colors: {
                /* Brand */
                'brand-0': 'hsl(var(--brand-0))',
                'brand-1': 'hsl(var(--brand-1))',
                'brand-2': 'hsl(var(--brand-2))',
                'brand-3': 'hsl(var(--brand-3))',

                /* Grays */
                'gray-0': 'hsl(var(--gray-0))',
                'gray-1': 'hsl(var(--gray-1))',
                'gray-2': 'hsl(var(--gray-2))',
                'gray-3': 'hsl(var(--gray-3))',
                'gray-4': 'hsl(var(--gray-4))',
                'gray-5': 'hsl(var(--gray-5))',
                'gray-6': 'hsl(var(--gray-6))',
                'gray-7': 'hsl(var(--gray-7))',
                'gray-8': 'hsl(var(--gray-8))',
                'gray-9': 'hsl(var(--gray-9))',
                'gray-10': 'hsl(var(--gray-10))',
                'gray-11': 'hsl(var(--gray-11))',
                'gray-12': 'hsl(var(--gray-12))',
                'gray-13': 'hsl(var(--gray-13))',

                /* Secondary */
                'secondary-0': 'hsl(var(--secondary-0))',
                'secondary-1': 'hsl(var(--secondary-1))',
                'secondary-2': 'hsl(var(--secondary-2))',
                'secondary-3': 'hsl(var(--secondary-3))',
                'secondary-4': 'hsl(var(--secondary-4))',

                /* Red */
                'red-0': 'hsl(var(--red-0))',
                'red-1': 'hsl(var(--red-1))',
                'red-2': 'hsl(var(--red-2))',
                'red-3': 'hsl(var(--red-3))',

                /* Green */
                'green-0': 'hsl(var(--green-0))',
                'green-1': 'hsl(var(--green-1))',
                'green-2': 'hsl(var(--green-2))',
                'green-3': 'hsl(var(--green-3))',

                /* Blue */
                'blue-0': 'hsl(var(--blue-0))',
                'blue-1': 'hsl(var(--blue-1))',
                'blue-2': 'hsl(var(--blue-2))',
                'blue-3': 'hsl(var(--blue-3))',

                /* Gold */
                'gold-0': 'hsl(var(--gold-0))',
                'gold-1': 'hsl(var(--gold-1))',
                'gold-2': 'hsl(var(--gold-2))',
                'gold-3': 'hsl(var(--gold-3))',

                /* Text */
                primary: 'hsl(var(--text-primary))',
                secondary: 'hsl(var(--text-secondary))',

                /* Networks */
                ethereum: 'hsl(var(--ethereum))',
                arbitrum: 'hsl(var(--arbitrum))',
                optimism: 'hsl(var(--optimism))',
            },
            fontSize: {
                xxs: ['0.625rem', '0.875rem'],
            },
        },
    },
    plugins: [],
} satisfies Config;

export default config;
