// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    reactStrictMode: true,
     trailingSlash: true,
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
