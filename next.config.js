/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "act.hoyoverse.com",
        port: "",
        pathname: "/darkmatter/hkrpg/prod_gf_cn/**",
      },
    ],
  },
};

module.exports = nextConfig;
