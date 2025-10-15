import { sendRequest } from '@/utils/api';
import dayjs, { ManipulateType } from 'dayjs';
import { AuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

const refreshAccessToken = async (token: JWT) => {
  const res = await sendRequest<IBackendRes<JWT>>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh`,
    method: 'POST',
    body: {
      refresh_token: token.refresh_token,
    },
  });

  if (res.data) {
    console.log('>>> check old token: ', token.access_token);
    console.log('>>> check new token: ', res.data?.access_token);

    return {
      ...token,
      access_token: res.data.access_token,
      refresh_token: res.data.refresh_token,
      access_expire: dayjs()
        .add(
          +process.env.TOKEN_EXPIRE_NUMBER!,
          process.env.TOKEN_EXPIRE_UNIT as ManipulateType
        )
        .unix(),
      error: '',
    };
  } else {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
};

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Email and Password',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'ShikamaruBH',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const res = await sendRequest<IBackendRes<JWT>>({
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`,
          method: 'POST',
          body: {
            password: credentials?.password,
            username: credentials?.username,
          },
        });

        if (res.data) {
          // Any object returned will be saved in `user` property of the JWT
          return res.data as any;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          throw new Error(res?.message);

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, trigger }) {
      if (trigger === 'signIn' && account?.provider !== 'credentials') {
        const res = await sendRequest<IBackendRes<JWT>>({
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/social-media`,
          method: 'POST',
          body: {
            type: account?.provider.toLocaleUpperCase(),
            username: user?.email,
          },
        });

        if (res.data) token = res.data;
      }

      if (trigger === 'signIn' && account?.provider === 'credentials') {
        //@ts-ignore
        token.access_token = user?.access_token;
        //@ts-ignore
        token.refresh_token = user?.refresh_token;
        //@ts-ignore
        token.user = user?.user;
        //@ts-ignore
        token.access_expire = dayjs()
          .add(
            +process.env.TOKEN_EXPIRE_NUMBER!,
            process.env.TOKEN_EXPIRE_UNIT! as ManipulateType
          )
          .unix();
      }

      const isTokenExpired = dayjs().isAfter(
        dayjs.unix((token.access_expire as number) ?? 0)
      );
      console.log('Check token expired: ', isTokenExpired);
      if (isTokenExpired) {
        return refreshAccessToken(token);
      }

      return token;
    },
    async session({ session, user, token }) {
      if (token) {
        session.access_token = token.access_token;
        session.refresh_token = token.refresh_token;
        session.access_expire = token.access_expire;
        session.error = token.error;
        session.user = token.user;
      }

      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};
