import {gql} from "apollo-server-express";

export const userTypeDefs = gql`
	extend type Query {
		users: [User!]
		user(id:ID!): User
	}

	type User {
		id: ID!
		name: String!
		email: String!
		password: String!
		recipes: [Recipe!]
	}
`;