import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user";
import bcrypt from "bcrypt";
import dbConnect from "@/utils/dbConnect";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        dbConnect();
        const { email, password } = credentials;

        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("Invalid email or password");
        }
        if (!user.password) {
          throw new Error("Palease login via method you used to signup");
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
          throw new Error("Invalid email or password");
        }
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // save user if they login via social network
    async signIn({ user }) {
      dbConnect();

      const { email } = user;

      let dbUser = await User.findOne({ email });

      if (!dbUser) {
        dbUser = await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
        });
      }

      return true;
    },

    // add additional information to the session (jwt, session)
    jwt: async ({ token, user }) => {
      // console.log('jwt callback', token, user);
      const userByEmail = await User.findOne({ email: token.email });
      userByEmail.password = undefined;
      token.user = userByEmail;
      return token;
    },
    session: async ({ session, token }) => {
      // console.log('session callback', session, token);
      session.user = token.user;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
