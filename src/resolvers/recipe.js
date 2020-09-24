"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const typeorm_1 = require("typeorm");
const graphql_resolvers_1 = require("graphql-resolvers");
const recipe_1 = require("../entity/recipe");
const middleware_1 = require("./middleware");
module.exports = {
    Query: {
        getRecipes: graphql_resolvers_1.combineResolvers(middleware_1.isAuthenticated, () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield typeorm_1.getRepository(recipe_1.Recipe).find({ relations: ["category", "user"] });
                return result;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        })),
        getOneRecipe: graphql_resolvers_1.combineResolvers(middleware_1.isAuthenticated, (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const recipe = yield typeorm_1.getRepository(recipe_1.Recipe).findOne(id, { relations: ["category", "user"] });
                if (!recipe) {
                    throw new Error('Recipe Id Not Found');
                }
                return recipe;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        })),
        getMyRecipes: graphql_resolvers_1.combineResolvers(middleware_1.isAuthenticated, (_, __, { userId }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const recipes = yield typeorm_1.getRepository(recipe_1.Recipe).find({ user: userId });
                return recipes;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        }))
    },
    Mutation: {
        createRecipe: graphql_resolvers_1.combineResolvers(middleware_1.isAuthenticated, (_, { input }, { userId }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const recipeRepository = typeorm_1.getRepository(recipe_1.Recipe);
                const recipe = recipeRepository.create(Object.assign(Object.assign({}, input), { user: userId }));
                const result = yield recipeRepository.save(recipe);
                return result;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        })),
        updateRecipe: graphql_resolvers_1.combineResolvers(middleware_1.isAuthenticated, middleware_1.isMyRecipe, (_, { id, input }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield typeorm_1.getRepository(recipe_1.Recipe).update(id, Object.assign({}, input));
                const recipe = yield typeorm_1.getRepository(recipe_1.Recipe).findOne(id, { relations: ["category"] });
                return recipe;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        })),
        deleteRecipe: graphql_resolvers_1.combineResolvers(middleware_1.isAuthenticated, middleware_1.isMyRecipe, (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const recipe = yield typeorm_1.getRepository(recipe_1.Recipe).findOne(id);
                yield typeorm_1.getRepository(recipe_1.Recipe).delete(id);
                return recipe;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        }))
    }
};
