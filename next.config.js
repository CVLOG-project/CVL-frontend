const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**/**',
      },
    ],
    domains: [
      'cvlog-bucket.s3.amazonaws.com',
      'avatars.githubusercontent.com',
      'user-images.githubusercontent.com',
      'logme-bucket.s3.amazonaws.com',
    ],
  },

  eslint: {
    plugins: ['import'],
    rules: {
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
        },
      ],
    },
  },
};

module.exports = nextConfig;
