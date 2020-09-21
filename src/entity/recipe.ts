import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {Category} from "./category";
import {User} from "./user";

@Entity()
export class Recipe {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	description: string;
	
	@Column()
	ingredients: string;

	@ManyToOne(type => Category, category => category.recipes)
	category: Category;

	@ManyToOne(type => User, user => user.recipes)
	user: User;
}