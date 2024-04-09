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
      "storage.googleapis.com"
    ],
  },
  swcMinify: true,
};
