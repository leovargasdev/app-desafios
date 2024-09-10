import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

import { UserModel, connectMongoose } from 'service/mongoose'

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || ''
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || ''
    })
  ],
  callbacks: {
    async signIn({ user }) {
      await connectMongoose()

      const isUser = await UserModel.findOneAndUpdate(
        { email: user.email },
        user
      )

      if (!isUser) {
        // novo usuário
        await UserModel.create(user)
      }
      return true
    },
    async session({ session }) {
      await connectMongoose()

      const { user } = session

      if (user) {
        const userMongo = await UserModel.findOne({ email: user.email })

        return {
          ...session,
          user: {
            ...user,
            ...userMongo._doc
          }
        }
      }

      return session
    }
  }
})
