
import type {NextConfig} from 'next';

const isGithubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isGithubPages ? '/FSF_Co' : undefined,
  assetPrefix: isGithubPages ? '/FSF_Co' : undefined,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    allowedDevOrigins: ['https://6000-firebase-studio-1748655878420.cluster-pgviq6mvsncnqxx6kr7pbz65v6.cloudworkstations.dev'],
  },
};

export default nextConfig;
