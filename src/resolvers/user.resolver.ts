import {users} from "../utils/data.js"

const userResolver = {
    Query: {
        users: () => {
            return users
        }
    },
    Mutation: {}
}

export default userResolver