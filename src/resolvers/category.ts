import {getRepository} from "typeorm";
import {Category} from "../entity/category";

export = {
	Query: {
		categories: () => getRepository(Category).find()
	}
}