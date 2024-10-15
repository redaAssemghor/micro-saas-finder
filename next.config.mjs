/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: {
      // Enabled by default in development, disabled in production to reduce file size
      displayName: true,
      ssr: true,
    },
  },
};

export default nextConfig;
