import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import connectDB from "@/lib/mongodb";

export const authOptions = ({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      // authorization: {
      //   params: {
      //     scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/drive.file",
      //     access_type: "offline",
      //     prompt: "consent",
      //   },
      // },
    }),
  ],
  callbacks: {
    // async jwt({ token, account }) {
    //   if (account) {
    //     token.accessToken = account.access_token;
    //     token.refreshToken = account.refresh_token;
    //   }
    //   return token;
    // },
    async session({ session, token, user }: { session: any, token: any, user: any }) {
      const db = await connectDB();
      if (!db.connection || !db.connection.db) {
        throw new Error("Database connection is not established");
      }
      const userRecord = await db.connection.db.collection('users').findOne({ email: session.user.email });

      if (userRecord) {
        session.user.id = userRecord._id;
      } else {
        throw new Error("User record not found");
      }
      // session.accessToken = token.accessToken;
      // session.refreshToken = token.refreshToken;
      return session;
    },
    async signIn({ user, account, profile, email, credentials }: { user: any, account: any, profile?: any, email?: any, credentials?: any }) {
      const db = await connectDB();
      if (!db.connection || !db.connection.db) {
        throw new Error("Database connection is not established");
      }
      const existingUser = await db.connection.db.collection('users').findOne({ email: user.email });

      if (!existingUser) {
        await db.connection.db.collection('users').insertOne({ email: user.email, name: user.name, image: user.image });
      }

      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export default NextAuth(authOptions)