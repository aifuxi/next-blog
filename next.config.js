/** @type {import('next').NextConfig} */
const nextConfig = {
  // 关闭reactStrictMode
  reactStrictMode: false,
  swcMinify: true,
  publicRuntimeConfig: {
    // 配置运行时的变量 process.env
    BASE_URL: process.env.BASE_URL,
  },
  // 配置代理，在react组件(不是在服务端渲染的时候，是在客户端的时候，如useEffect里面发送的请求)里发的请求都转发到
  // process.env.BASE_URL里面，next会自动根据运行环境来读取.env文件获取 process.env.BASE_URL
  async rewrites() {
    return [
      {
        // 这里只匹配/v1开头的请求，/v1开头的请求转发到process.env.BASE_URL/v1
        source: `/v1/:path*`,
        destination: `${process.env.BASE_URL}/v1/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
