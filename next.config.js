const isProd = process.env.NODE_ENV === "production";

module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://upsurge.in/:path*",
      },
    ];
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  images: {
    domains: [
      "i.ibb.co",
      "images.unsplash.com",
      "res.cloudinary.com",
      "upsurgevideoassets.s3.ap-south-1.amazonaws.com",
      "imgcdn.upsurge.in",
      "storage.googleapis.com",
    ],
  },
  swcMinify: true,
  env: {
    NEXT_PUBLIC_LIVE_SERVER: isProd
      ? "https://upsurge-server.onrender.com/"
      : process.env.NEXT_PUBLIC_LIVE_SERVER,
    NEXT_PUBLIC_TEST_SERVER: isProd
      ? "https://upsurge-server.onrender.com/"
      : process.env.NEXT_PUBLIC_TEST_SERVER,
    NEXT_PUBLIC_MEDIA_BUCKET: "https://storage.googleapis.com",
    NEXT_PUBLIC_GAME_BUCKET: "https://storage.googleapis.com",
    NEXT_PUBLIC_UNICOIN_VALUE: 1000,
  },
};
