import {gql} from "apollo-server-express";

export const categoryTypeDefs = gql`
	extend type Query {
		categories: [Category!]
	}

	type Category {
		id: ID!
		name: String!
		recipes: [Recipe!]
	}
`;