import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '8.ajes.com',
				port: '',
				pathname: '/imgs/**',
			},
			{
				protocol: 'https',
				hostname: '11.ajes.com',
				port: '',
				pathname: '/imgs/**',
			},
			{
				protocol: 'https',
				hostname: 'images.pexels.com',
				port: '',
				pathname: '/photos/**',
			},
			{
				protocol: 'https',
				hostname: 'flagcdn.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'd1b41ywfwbg1x9.cloudfront.net',
				port: '',
				pathname: '/**'

			},
			{
				protocol: 'https',
				hostname: 'www.paypalobjects.com',
				port: '',
				pathname: '/**'

			},
		],
	},
    allowedDevOrigins: [
        'http://localhost:3000',
        'http://192.168.11.18:3000',
        'https://cdn.gtranslate.net/widgets/latest/dwf.js',
    ]
};

export default nextConfig;