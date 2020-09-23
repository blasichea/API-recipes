import "reflect-metadata";
import express from "express";
import cors from "cors";
import {createConnection} from "typeorm";
import {ApolloServer} from "apollo-server-express";
import * as dotEnv from "dotenv";
import typeDefs = require("./typeDefs");
import resolvers = require("./resolvers");
import verifyUser from "./helper/context";

//Set variables
dotEnv.config();


//DB connection
createConnection().then(connection => {
	if (connection) {
		console.log('Database connection successful');
	}
	const app = express();
	const PORT = process.env.PORT || 3000;
	const apolloServer = new ApolloServer({
		typeDefs,
		resolvers,
		context: ({req}) => {
			const dataUser = verifyUser(req)
			console.log('CONTEXT :::::: ', dataUser)
			return dataUser;
		},
		formatError: (error) => {
			return {
				message: error.message
			};
		}
	});
	//body paser
	app.use(express.json());
	//cors
	app.use(cors());
	
	apolloServer.applyMiddleware({app, path: '/graphql'});
	
	app.listen(PORT, () => {
		console.log(`Server listening on PORT: ${PORT}`);
	});
})
.catch(error => {console.log(error)});

