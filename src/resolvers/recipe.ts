import {getRepository} from "typeorm";
import {combineResolvers} from "graphql-resolvers";
import {Recipe} from "../entity/recipe";
import {Category} from "../entity/category";
import {User} from "../entity/user";
import {isAuthenticated, isMyRecipe} from "./middleware";
import { recipeTypeDefs } from "../typeDefs/recipe";

export = {
	Query: {
		getRecipes: combineResolvers(isAuthenticated, async () => {
			try {
				const result = await getRepository(Recipe).find({relations:["category", "user"]})
				return result;
			} catch (error) {
				console.log(error);
				throw error;
			}
		}),
		getOneRecipe: combineResolvers(isAuthenticated, async (_, {id}) => {
			try {
				const recipe = await getRepository(Recipe).findOne(id, {relations:["category", "user"]});
				if (!recipe) {
					throw new Error('Recipe Id Not Found');
				}
				return recipe;
			} catch (error) {
				console.log(error);
				throw error;
			}
		}),
		getMyRecipes: combineResolvers(isAuthenticated, async (_, __, {userId}) => {
			try {
				const recipes = await getRepository(Recipe).find({user: userId});
				return recipes;
			} catch (error) {
				console.log(error);
				throw error;
			}
		})
	},
	Mutation: {
		createRecipe: combineResolvers(isAuthenticated, async (_, {input}, {userId}) => {
			try {
				const recipeRepository = getRepository(Recipe);
				const recipe = recipeRepository.create({...input, user: userId});
				const result = await recipeRepository.save(recipe);
				return result;
			} catch (error) {
				console.log(error);
				throw error;
			}
		}),
		updateRecipe: combineResolvers(isAuthenticated, isMyRecipe, async (_,{id, input}) => {
			try {
				await getRepository(Recipe).update(id, {...input});
				const recipe = await getRepository(Recipe).findOne(id,{relations:["category"]});
				return recipe;
			} catch (error) {
				console.log(error);
				throw error;
			}
		}),
		deleteRecipe: combineResolvers(isAuthenticated, isMyRecipe, async (_, {id}) => {
			try {
				const recipe = await getRepository(Recipe).findOne(id);
				await getRepository(Recipe).delete(id);

				return recipe;
			} catch (error) {
				console.log(error);
				throw error;
			}
		})
	}
}