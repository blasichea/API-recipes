"use strict";
const userResolver = require("./user");
const categoryResolver = require("./category");
const recipeResolver = require("./recipe");
module.exports = [
    userResolver,
    categoryResolver,
    recipeResolver
];
