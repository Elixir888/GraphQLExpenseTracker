import {transactions} from "../utils/data"

const transactionResolver = {
    Query: {
        users: () => {
            return transactions
        }
    },
    Mutation: {}
}

export default transactionResolver