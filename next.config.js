/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DB_LOCAL_URI:
      'mongodb+srv://mh77-1234:mh77-1234@cluster0.24y80.mongodb.net/shopit?retryWrites=true&w=majority',
    SMTP_HOST: 'smtp.mailtrap.io',
    SMTP_PORT: '2525',
    SMTP_EMAIL: '0b76c4dc5ea898',
    SMTP_PASSWORD: 'c9c383a7d66b18',
    SMTP_FROM_EMAIL: 'noreply@shopit.com',
    SMTP_FROM_NAME: 'ShopIT',
  },
}

module.exports = nextConfig
