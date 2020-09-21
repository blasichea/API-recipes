import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Recipe} from "./recipe";

@Entity()
export class User {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@OneToMany(type => Recipe, recipe => recipe.user)
	recipes: Recipe[];
}