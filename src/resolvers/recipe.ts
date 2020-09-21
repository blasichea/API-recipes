import {getRepository} from "typeorm";
import {Recipe} from "../entity/recipe";

export = {
	Query: {
		recipes: () => getRepository(Recipe).find()
	}
}