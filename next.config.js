const withPWA = require('next-pwa')({
  dest: 'public',
})


module.exports = withPWA({
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
    ],
  },
  swcMinify: true,
});
