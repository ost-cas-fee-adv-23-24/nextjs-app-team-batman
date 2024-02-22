/* eslint-disable @typescript-eslint/require-await */

import NextAuth from 'next-auth';
import Zitadel from 'next-auth/providers/zitadel';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  trustHost: true,
  providers: [
    Zitadel({
      clientId: '245812844136856406@mumble',
      issuer: 'https://cas-fee-adv-ed1ide.zitadel.cloud',
      authorization: {
        params: {
          scope: 'openid profile email urn:zitadel:iam:org:project:id:229389352298352392:aud',
        },
      },
      checks: ['pkce', 'state'],
      client: {
        token_endpoint_auth_method: 'none',
      },
    }),
  ],
  session: {
    // in zitadel the session is default set on 12 hours
    // so we set the maxAge to 10 hours to be sure the session is valid & not expired
    maxAge: 10 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.expiresAt = (account.expires_at ?? 0) * 1000;
      }
      if (user) token.user = user;
      return token;
    },
    session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
