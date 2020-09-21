import {getRepository} from "typeorm";
import {User} from "../entity/user";

export = {
	Query: {
		users: () => {
			console.log("Find users");
			return getRepository(User).find();
		},
		user: (_, {id}) => {
			console.log("find one user");
			return getRepository(User).findOne(id);
		}
	}
}