"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.userTypeDefs = apollo_server_express_1.gql `
	extend type Query {
		users: [User!]
		user(id:ID!): User
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
