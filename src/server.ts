import "reflect-metadata";
import express from "express";
import {ApolloServer} from "apollo-server-express";
import * as dotEnv from "dotenv";

//Set variables
dotEnv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server listening on PORT: ${PORT}`);
});
