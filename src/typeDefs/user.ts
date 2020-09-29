import {gql} from "apollo-server-express";

export const userTypeDefs = gql`
	extend type Query {
		getUsers(skip: Int, limit:Int): [User!]
		getUser(id:ID!): User
	}

	extend type Mutation {
		signUp(input: signUpInput): User
		login(input: loginInput): Token
	}

	input loginInput {
		email: String!
		password: String!
	}

	type Token {
		token: String!
	}

	input signUpInput {
		name: String!
		email: String!
		password: String!
	}

	type User {
		id: ID!
		name: String!
		email: String!
		password: String!
		recipes: [Recipe!]!
	}
`;