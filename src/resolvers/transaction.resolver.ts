import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const transactionResolver = {
  Query: {
    transactions: async (_, __, { user }) => {
      try {
        if (!user) throw new Error("Unauthorized");

        const transactions = await prisma.transaction.findMany({
          where: {
            userId: user._id,
          },
        });

        return transactions;
      } catch (err) {
        console.error("Error getting transactions:", err);
        throw new Error("Error getting transactions");
      }
    },
    transaction: async (_, { transactionId }) => {
      try {
        const transaction = await prisma.transaction.findUnique({
          where: {
            id: transactionId,
          },
        });

        return transaction;
      } catch (err) {
        console.error("Error getting transaction:", err);
        throw new Error("Error getting transaction");
      }
    },
    categoryStatistics: async (_, __, { user }) => {
      if (!user) throw new Error("Unauthorized");

      const transactions = await prisma.transaction.findMany({
        where: {
          userId: user._id,
        },
      });

      const categoryMap = {};

      transactions.forEach((transaction) => {
        if (!categoryMap[transaction.category]) {
          categoryMap[transaction.category] = 0;
        }
        categoryMap[transaction.category] += transaction.amount;
      });

      return Object.entries(categoryMap).map(([category, totalAmount]) => ({ category, totalAmount }));
    },
  },
  Mutation: {
    createTransaction: async (_, { input }, { user }) => {
      try {
        const newTransaction = await prisma.transaction.create({
          data: {
            ...input,
            userId: user._id,
          },
        });

        return newTransaction;
      } catch (err) {
        console.error("Error creating transaction:", err);
        throw new Error("Error creating transaction");
      }
    },
    updateTransaction: async (_, { input }) => {
      try {
        const updatedTransaction = await prisma.transaction.update({
          where: {
            id: input.transactionId,
          },
          data: input,
        });

        return updatedTransaction;
      } catch (err) {
        console.error("Error updating transaction:", err);
        throw new Error("Error updating transaction");
      }
    },
    deleteTransaction: async (_, { transactionId }) => {
      try {
        const deletedTransaction = await prisma.transaction.delete({
          where: {
            id: transactionId,
          },
        });

        return deletedTransaction;
      } catch (err) {
        console.error("Error deleting transaction:", err);
        throw new Error("Error deleting transaction");
      }
    },
  },
  Transaction: {
    user: async (parent) => {
      const userId = parent.userId;
      try {
        const user = await prisma.user.findUnique({
          where: {
            id: userId,
          },
        });

        return user;
      } catch (err) {
        console.error("Error getting user:", err);
        throw new Error("Error getting user");
      }
    },
  },
};

export default transactionResolver;
