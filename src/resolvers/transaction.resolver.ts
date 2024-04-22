import {transactions} from "../utils/data.js"

const transactionResolver = {
    Query: {
        users: () => {
            return transactions
        }
    },
    Mutation: {}
}

export default transactionResolver