import {gql} from "apollo-server-express";

export const userTypeDefs = gql`
	extend type Query {
		getUsers(cursor: Int, limit: Int): UserFeed!
		getUser(id:ID!): User
	}

	type UserFeed {
		userFeed: [User!]
		pageInfo: PageInfoUser!
	}

	type PageInfoUser {
		nextPageCursor: Int
		hasNextPage: Boolean
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