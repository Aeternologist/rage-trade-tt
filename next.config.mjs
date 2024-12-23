// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config) => {
        config.externals.push('pino-pretty', 'lokijs', 'encoding');
        return config;
    },
    async redirects() {
        return [
            {
                source: '/dashboard',
                destination: '/dashboard/wallet-assets',
                permanent: true,
            },
            {
                source: '/',
                destination: '/auth',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
