import { sendRequest } from "@/utils/api";
import NextAuth, { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import GithubProvider from "next-auth/providers/github";

export const authOptions : AuthOptions = {
  secret: process.env.NO_SECRET,
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, trigger }) {
      if (trigger === 'signIn' && account?.provider === 'github') {
        const res = await sendRequest<IBackendRes<JWT>>({
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/social-media`,
          method: "POST",
          body: {
            type: "GITHUB",
            username: user?.email,
          },
        });

        if (res.data)
          token = res.data
      }
      return token
    },
    async session({session, user, token}) {
      if (token) {
        session.access_token = token.access_token
        session.refresh_token = token.refresh_token
        session.user = token.user
      }

      return session
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };

