import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import {getRepository, MoreThan} from "typeorm";
import {combineResolvers} from "graphql-resolvers";
import {isAuthenticated} from "./middleware";
import {compareIdInt} from "../helper/compare";

import {User} from "../entity/user";

export = {
	Query: {
		getUsers: combineResolvers(isAuthenticated, async (_, {cursor, limit = 10}) => {
			try {
				const query = {
					take: limit
				};
				if (cursor) {
					query['where'] = `id > ${cursor}`;
				}
				const users = await getRepository(User).find(query);
				return users.sort(compareIdInt);
			} catch (error) {
				console.log(error);
				throw(error);
			}
		}),
		getUser: combineResolvers(isAuthenticated, async (_, {id}) => {
			try {
				const user = await getRepository(User).findOne(id);
				return user;
			} catch (error) {
				console.log(error);
				throw(error);
			}
		})
	},
	Mutation: {
		signUp: async (_, {input}) => {
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
		},
		login: async (_, {input}) => {
			try {
				const userRepository = getRepository(User);
				const user = await userRepository.findOne({email: input.email});
				if (!user) {
					throw new Error('User not found');
				}
				const validPassword = await bcrypt.compare(input.password, user.password);
				if (!validPassword) {
					throw new Error('Incorrect Password');
				}
				const token = jwt.sign(
					{email: user.email, id: user.id},
					process.env.JWT_KEY || "jwtkey",
					{expiresIn: '12h'}
				);
				return {token};
			} catch (error) {
				console.log(error);
				throw error;
			}
		}
	}
}