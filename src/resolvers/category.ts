import {getRepository} from "typeorm";
import {combineResolvers} from "graphql-resolvers";
import {isAuthenticated} from "./middleware";
import {Category} from "../entity/category";
import { compareIdInt } from "../helper/compare";

export = {
	Query: {
		getCategories: combineResolvers(isAuthenticated, async (_, {skip = 0, limit = 10}) => {
			try {
				const result = await getRepository(Category).find({
					order: {
						id: "ASC"
					},
					relations: ["recipes"],
					skip: skip,
					take: limit
				});
				return result;
			} catch (error) {
				console.log(error);
				throw error;
			}
		}),
		getOneCategory: combineResolvers(isAuthenticated, async (_, {id}) => {
			try {
				const category = await getRepository(Category).findOne(id, {relations: ["recipes"]});
				if (!category) {
					throw new Error('Category Not Found');
				}
				return category;
			} catch (error) {
				console.log(error);
				throw error;
			}
		}) 
	},
	Mutation: {
		createCategory: combineResolvers(isAuthenticated, async (_, {input}) => {
			try {
				const findCategory = await getRepository(Category).findOne({name: input.name});
				if (findCategory) {
					throw new Error('This Category Name already exist');
				}
				const category = getRepository(Category).create({...input});
				const result = getRepository(Category).save(category);
				return result;
			} catch (error) {
				console.log(error);
				throw error;
			}
		}),
		updateCategory: combineResolvers(isAuthenticated, async (_, {id, input}) => {
			try {
				await getRepository(Category).update(id, {...input});
				const category = await getRepository(Category).findOne(id);
				return category;
			} catch (error) {
				console.log(error);
				throw error;
			}
		}),
		deleteCategory: combineResolvers(isAuthenticated, async (_, id) => {
			try {
				const category = await getRepository(Category).findOne(id, {relations: ["recipes"]});
				console.log(category.recipes.length);
				if(category.recipes.length > 0) {
					throw new Error('Category is not empty');
				}
				await getRepository(Category).delete(id);
				return category;
			} catch (error) {
				console.log(error);
				throw error;
			}
		})
	}
}