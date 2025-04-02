import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["raw.githubusercontent.com"], // ✅ เพิ่ม hostname ของภาพที่ใช้
  },
  /* config options here */
};

export default nextConfig;
