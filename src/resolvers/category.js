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
const middleware_1 = require("./middleware");
const category_1 = require("../entity/category");
module.exports = {
    Query: {
        getCategories: graphql_resolvers_1.combineResolvers(middleware_1.isAuthenticated, () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield typeorm_1.getRepository(category_1.Category).find({ relations: ["recipes"] });
                return result;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        })),
        getOneCategory: graphql_resolvers_1.combineResolvers(middleware_1.isAuthenticated, (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const category = yield typeorm_1.getRepository(category_1.Category).findOne(id, { relations: ["recipes"] });
                if (!category) {
                    throw new Error('Category Not Found');
                }
                return category;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        }))
    },
    Mutation: {
        createCategory: graphql_resolvers_1.combineResolvers(middleware_1.isAuthenticated, (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const findCategory = yield typeorm_1.getRepository(category_1.Category).findOne({ name: input.name });
                if (findCategory) {
                    throw new Error('This Category Name already exist');
                }
                const category = typeorm_1.getRepository(category_1.Category).create(Object.assign({}, input));
                const result = typeorm_1.getRepository(category_1.Category).save(category);
                return result;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        })),
        updateCategory: graphql_resolvers_1.combineResolvers(middleware_1.isAuthenticated, (_, { id, input }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield typeorm_1.getRepository(category_1.Category).update(id, Object.assign({}, input));
                const category = yield typeorm_1.getRepository(category_1.Category).findOne(id);
                return category;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        })),
        deleteCategory: graphql_resolvers_1.combineResolvers(middleware_1.isAuthenticated, (_, id) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const category = yield typeorm_1.getRepository(category_1.Category).findOne(id, { relations: ["recipes"] });
                console.log(category.recipes.length);
                if (category.recipes.length > 0) {
                    throw new Error('Category is not empty');
                }
                yield typeorm_1.getRepository(category_1.Category).delete(id);
                return category;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        }))
    }
};
