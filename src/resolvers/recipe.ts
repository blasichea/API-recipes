import {getRepository, MoreThan} from "typeorm";
import {combineResolvers} from "graphql-resolvers";
import {Recipe} from "../entity/recipe";
import {isAuthenticated, isMyRecipe} from "./middleware";
import { compareIdString } from "../helper/compare";

export = {
	Query: {
		getRecipes: combineResolvers(isAuthenticated, async (_, {cursor, limit = 10}) => {
			try {
				let query = {
					take: limit + 1,
					relations:["category", "user"]
				}
				if (cursor) {
					query['where'] = {id: MoreThan(cursor)};
				}
				let recipes = (await getRepository(Recipe).find(query)).sort(compareIdString);
				const hasNextPage = recipes.length > limit;
				recipes = hasNextPage ? recipes.slice(0, -1) : recipes;
				return {
					recipeFeed: recipes,
					pageInfo: {
						nextPageCursor: hasNextPage ? recipes[recipes.length -1].id : null,
						hasNextPage
					}
				};
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
		getMyRecipes: combineResolvers(isAuthenticated, async (_, {cursor, limit = 10}, {userId}) => {
			try {
				let query = {
					take: limit + 1,
					relations: ["category"]
				};
				if (cursor) {
					query['where'] = {user: userId, id: MoreThan(cursor)}
				} else {
					query['where'] = {user: userId};
				}
				let recipes = (await getRepository(Recipe).find(query)).sort(compareIdString);
				const hasNextPage = recipes.length > limit;
				recipes = hasNextPage ? recipes.slice(0, -1) : recipes;
				return {
					recipeFeed: recipes,
					pageInfo: {
						nextPageCursor: hasNextPage ? recipes[recipes.length - 1].id : null,
						hasNextPage
					}
				};
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