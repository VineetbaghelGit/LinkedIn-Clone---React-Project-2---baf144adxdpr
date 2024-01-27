/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
   images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "newton-project-resume-backend.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "newton-project-resume-backend.s3.ap-south-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "loremflickr.com",
        port: "",
        pathname: "/**",
      },
       {
        protocol: "https",
        hostname: "cloudflare-ipfs.com",
        port: "",
        pathname: "/**",
      },
     
    ],
  },
};

module.exports = nextConfig;
