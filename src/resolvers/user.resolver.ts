import {users} from "../utils/data"

const userResolver = {
    Query: {
        users: () => {
            return users
        }
    },
    Mutation: {}
}

export default userResolver