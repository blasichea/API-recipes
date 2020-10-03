import {gql} from "apollo-server-express";

export const recipeTypeDefs = gql`
	extend type Query {
		getRecipes(cursor: String, limit: Int): RecipeFeed!
		getOneRecipe(id: String!): Recipe
		getMyRecipes(cursor: String, limit: Int): RecipeFeed!
	}

	type RecipeFeed {
		recipeFeed: [Recipe!]
		pageInfo: PageInfoRecipe!
	}

	type PageInfoRecipe {
		nextPageCursor: String
		hasNextPage: Boolean
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