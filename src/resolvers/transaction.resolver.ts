import { transactions } from "../utils/data.js";

const transactionResolver = {
    Query: {
        transactions: () => {
            return transactions;
        }
    },
    Mutation: {}
};

export default transactionResolver;
