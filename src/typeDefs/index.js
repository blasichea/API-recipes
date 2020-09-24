"use strict";
const apollo_server_express_1 = require("apollo-server-express");
const user_1 = require("./user");
const recipe_1 = require("./recipe");
const category_1 = require("./category");
const typeDefs = apollo_server_express_1.gql `
	type Query {
		_: String
	}

	type Mutation {
		_: String
	}

	type Subscription {
		_: String
	}
`;
module.exports = [
    typeDefs,
    user_1.userTypeDefs,
    recipe_1.recipeTypeDefs,
    category_1.categoryTypeDefs
];
