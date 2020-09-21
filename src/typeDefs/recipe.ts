import {gql} from "apollo-server-express";

export const recipeTypeDefs = gql`
	extend type Query {
		recipes: [Recipe!]
	}

	type Recipe {
		id: ID!
		name: String!
		description: String!
		ingredients: String!
		category: Category!
		user: User!
	}
`;