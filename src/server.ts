import "reflect-metadata";
import express from "express";
import {createConnection} from "typeorm";
import {ApolloServer} from "apollo-server-express";
import * as dotEnv from "dotenv";
import typeDefs = require("./typeDefs");
import resolvers = require("./resolvers");

//Set variables
dotEnv.config();

//DB connection
createConnection().then(connection => {
	const app = express();
	const PORT = process.env.PORT || 3000;
	const apolloServer = new ApolloServer({
		typeDefs,
		resolvers
	});

	app.use(express.json());

	apolloServer.applyMiddleware({app, path: '/graphql'});

	app.listen(PORT, () => {
		console.log(`Server listening on PORT: ${PORT}`);
	});
})
.catch(error => {console.log(error)});

