/** @type {import('next').NextConfig} */

const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['react-leaflet-cluster'],
  i18n,
};

module.exports = nextConfig;
