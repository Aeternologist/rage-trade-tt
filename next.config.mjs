// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    reactStrictMode: true,
    trailingSlash: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'static.alchemyapi.io',
                port: '',
                pathname: '**',
            },
        ],
    },
    webpack: (config) => {
        config.externals.push('pino-pretty', 'lokijs', 'encoding');
        return config;
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/auth',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
