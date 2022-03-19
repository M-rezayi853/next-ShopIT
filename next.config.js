/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DB_LOCAL_URI:
      'mongodb+srv://mh77-1234:mh77-1234@cluster0.24y80.mongodb.net/shopit?retryWrites=true&w=majority',
  },
}

module.exports = nextConfig
