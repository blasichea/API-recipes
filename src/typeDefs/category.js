"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.categoryTypeDefs = apollo_server_express_1.gql `
	extend type Query {
		getCategories: [Category!]
		getOneCategory(id: ID!): Category
	}

	extend type Mutation {
		createCategory(input: createCategoryInput!): Category
		updateCategory(id: ID!, input: updateCategoryInput!): Category
		deleteCategory(id: ID!): Category
	}

	input createCategoryInput {
		name: String!
	}

	input updateCategoryInput {
		name: String
	}

	type Category {
		id: ID!
		name: String!
		recipes: [Recipe!]!
	}
`;
