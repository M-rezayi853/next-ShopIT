import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

import User from '../../../models/user'
import connectDatabase from '../../../config/database'

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        connectDatabase()

        const { email, password } = credentials

        // Check if email and password is entered
        if (!email || !password) {
          throw new Error('لطفا ایمیل یا رمز عبور را وارد کنید')
        }

        // Find user in the database
        const user = await User.findOne({ email }).select('+password')

        if (!user) {
          throw new Error('ایمیل یا رمز عبور نامعتبر است')
        }

        // Check if password is correct or not
        const isPasswordMatched = await user.comparePassword(password)

        if (!isPasswordMatched) {
          throw new Error('ایمیل یا رمز عبور نامعتبر است')
        }

        return Promise.resolve(user)
      },
    }),
  ],
  callbacks: {
    jwt: async (token, user) => {
      user && (token.user = user)
      return Promise.resolve(token)
    },
    session: async (session, token) => {
      session.user = token.user
      return Promise.resolve(session)
    },
  },
})
