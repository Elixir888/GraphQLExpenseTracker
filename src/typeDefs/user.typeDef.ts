const userTypeDef = `#graphql
    type User {
        _id: ID!,
        username: String!,
        name: String!,
        password: String!,
        profilePicture: String,
        gender: String!,
        transactions: [Transaction!]
    }

    type Query {
        user(userId: ID!): User
        authUser: User
        getAllUsers: [User!]! # Add getAllUsers field
    }

    type Mutation {
        signUp(input: SignUpInput!): User
        login(input: LoginInput!): User
        logout: LogoutResponse
        createUniqueUser(input: UniqueUserInput!): User
    }

    input SignUpInput {
        username: String!
        name: String!
        password: String!
        gender: String!
    }

    input LoginInput {
        username: String!
        password: String!
    }

    input UniqueUserInput {
        username: String!
        name: String!
        password: String!
        gender: String!
    }

    type LogoutResponse {
        message: String!
    }

`;

export default userTypeDef;
