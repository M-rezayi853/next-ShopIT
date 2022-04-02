/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    DB_LOCAL_URI:
      'mongodb+srv://mh77-1234:mh77-1234@cluster0.24y80.mongodb.net/shopit?retryWrites=true&w=majority',
    SMTP_HOST: 'smtp.mailtrap.io',
    SMTP_PORT: '2525',
    SMTP_EMAIL: '0b76c4dc5ea898',
    SMTP_PASSWORD: 'c9c383a7d66b18',
    SMTP_FROM_EMAIL: 'noreply@shopit.com',
    SMTP_FROM_NAME: 'ShopIT',
    CLOUDINARY_CLOUD_NAME: 'dmscqygte',
    CLOUDINARY_API_KEY: '938881393821676',
    CLOUDINARY_API_SECRET: 'JjWNA1SrLm9n172TY4FETyU05zA',
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
}

module.exports = nextConfig
