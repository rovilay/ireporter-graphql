import { GraphQLEnumType } from 'graphql';

new GraphQLEnumType({
    name: 'Role',
    values: {
        ADMIN: {
            value: "ADMIN",
        },
        USER: {
            value: "USER",
        },
    },
});

export default `
    type User {
        _id: String!
        firstName: String!
        lastName: String!
        email: String!,
        profileImage: String!
        role: String!
    }

    type AuthUser {
        token: String!
    }

    enum Role {
        ADMIN,
        USER
    }

    type Query {
        user(id: String!): User
        users: [User!]!
    }

    type Mutation {
        signup(firstName: String!, lastName: String!,
            email: String!, password: String!, profileImage: String): User
        updateUserRole(id: String!, role: Role!): User
        login(email: String!, password: String!): AuthUser
    }
`;
