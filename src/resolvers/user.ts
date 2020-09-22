import {getRepository} from "typeorm";
import {User} from "../entity/user";
import * as bcrypt from "bcryptjs";

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
	},
	Mutation: {
		signup: async (_, {input}) => {
			const userRepository = getRepository(User);
			try {
				const user = await userRepository.findOne({email: input.email});
				if (user) {
					throw new Error('Email already in use');
				}
				const hashedPassword = await bcrypt.hash(input.password, 12);
				const newUser = userRepository.create({...input, password: hashedPassword});
				const result = await userRepository.save(newUser);
				return result;
			} catch (error) {
				console.log(error);
				throw error;
			}
		}
	}
}