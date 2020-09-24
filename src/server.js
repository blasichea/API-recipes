"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const apollo_server_express_1 = require("apollo-server-express");
const dotEnv = __importStar(require("dotenv"));
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const context_1 = __importDefault(require("./helper/context"));
//Set variables
dotEnv.config();
//DB connection
typeorm_1.createConnection().then(connection => {
    if (connection) {
        console.log('Database connection successful');
    }
    const app = express_1.default();
    const PORT = process.env.PORT || 3000;
    const apolloServer = new apollo_server_express_1.ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => {
            const dataUser = context_1.default(req);
            console.log('CONTEXT :::::: ', dataUser);
            return dataUser;
        },
        formatError: (error) => {
            return {
                message: error.message
            };
        }
    });
    //body paser
    app.use(express_1.default.json());
    //cors
    app.use(cors_1.default());
    apolloServer.applyMiddleware({ app, path: '/graphql' });
    app.listen(PORT, () => {
        console.log(`Server listening on PORT: ${PORT}`);
    });
})
    .catch(error => { console.log(error); });
