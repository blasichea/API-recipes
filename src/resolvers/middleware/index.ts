import {skip} from "graphql-resolvers";
import { getRepository } from "typeorm";
import { Recipe } from "../../entity/recipe";

export function isAuthenticated (_, __, {email}) {
	if (!email) {
		throw new Error('Access Denied! Please Login');
	}
	return skip;
}

export async function isMyRecipe (_, {id}, {userId}) {
	try {
		const recipe = await getRepository(Recipe).findOne(id, {relations:["user"]});
		if (!recipe) {
			throw new Error('Recipe Not Found');
		}
		if (recipe.user.id !== userId) {
			throw new Error('Recipe is not own');
		}
		return skip;
	} catch (error) {
		console.log(error);
		throw error;
	}	
}