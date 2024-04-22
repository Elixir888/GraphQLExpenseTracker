import { users } from "../utils/data.js"

const userResolver = {
    Query: {
        getAllUsers: () => {
            return users
        }
    },
    Mutation: {}
}

export default userResolver