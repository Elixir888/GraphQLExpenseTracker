import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const userResolver = {
  Mutation: {
    signUp: async (_, { input }, { req, login }) => {
      try {
        const { username, name, password, gender } = input;

        if (!username || !name || !password || !gender) {
          throw new Error("All fields are required");
        }

        const existingUser = await prisma.user.findUnique({ where: { username } });
        if (existingUser) {
          throw new Error("User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const profilePicture = gender === "male" ? `https://avatar.iran.liara.run/public/boy?username=${username}` : `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = await prisma.user.create({
          data: {
            username,
            name,
            password: hashedPassword,
            gender,
            profilePicture,
          },
        });

        await login(req, newUser);
        return newUser;
      } catch (err) {
        console.error("Error in signUp: ", err);
        throw new Error(err.message || "Internal server error");
      }
    },

    login: async (_, { input }, { req, authenticate, login }) => {
      try {
        const { username, password } = input;
        if (!username || !password) throw new Error("All fields are required");
        
        const { user } = await authenticate("graphql-local", { username, password });

        await login(req, user);
        return user;
      } catch (err) {
        console.error("Error in login:", err);
        throw new Error(err.message || "Internal server error");
      }
    },

    logout: async (_, __, { logout, req, res }) => {
      try {
        await logout();
        req.session.destroy((err) => {
          if (err) throw err;
        });
        res.clearCookie("connect.sid");

        return { message: "Logged out successfully" };
      } catch (err) {
        console.error("Error in logout:", err);
        throw new Error(err.message || "Internal server error");
      }
    },
  },

  Query: {
    getAllUsers: async () => {
        try {
          const allUsers = await prisma.user.findMany(); // Fetch all users from the database
          return allUsers; // Return the fetched users
        } catch (err) {
          console.error("Error fetching all users:", err);
          throw new Error("Error fetching all users");
        }
      },
    authUser: async (_, __, { getUser }) => {
      try {
        const user = await getUser();
        return user;
      } catch (err) {
        console.error("Error in authUser: ", err);
        throw new Error("Internal server error");
      }
    },

    user: async (_, { userId }) => {
      try {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        return user;
      } catch (err) {
        console.error("Error in user query:", err);
        throw new Error(err.message || "Error getting user");
      }
    },
  },

  User: {
    transactions: async (parent) => {
      try {
        const transactions = await prisma.transaction.findMany({ where: { userId: parent.id } });
        return transactions;
      } catch (err) {
        console.log("Error in user.transactions resolver: ", err);
        throw new Error(err.message || "Internal server error");
      }
    },
  },
};

export default userResolver;
