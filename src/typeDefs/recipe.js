"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.recipeTypeDefs = apollo_server_express_1.gql `
	extend type Query {
		getRecipes: [Recipe!]
		getOneRecipe(id: String!): Recipe
		getMyRecipes: [Recipe!]
	}

	extend type Mutation {
		createRecipe(input: createRecipeInput!): Recipe
		updateRecipe(id: String!, input: updateRecipeInput!): Recipe
		deleteRecipe(id: String!): Recipe
	}

	input updateRecipeInput {
		name: String
		description: String
		ingredients: String
		categoryId: ID
	}

	input createRecipeInput {
		name: String!
		description: String!
		ingredients: String!
		category: ID!
	}

	type Recipe {
		id: String!
		name: String!
		description: String!
		ingredients: String!
		category: Category!
		user: User!
	}
`;
