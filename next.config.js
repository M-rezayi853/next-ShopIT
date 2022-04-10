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
    STRIPE_SECRET_KEY:
      'sk_test_51KSPQDC6cs9LtJjcw5NEw53rrNfJtGQkPQwFpsg3tbgskCEp85VSQavyqZI4ButfiPlOTDzlZFk4B4YNenvTLCNH00RdD58RiT',
    STRIPE_API_KEY:
      'pk_test_51KSPQDC6cs9LtJjcpByYRQqd4q0VirC9Cg3juNv4WtkjiBVNwRlvvJxBTEXXIrbdrbNzzpXSlP9OLIqErsGh3Zt400vnPKXgLF',
    NEXTAUTH_URL: 'https://shopit-mh77.vercel.app',
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
}

module.exports = nextConfig
