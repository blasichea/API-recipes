import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Recipe} from "./recipe";

@Entity()
export class Category {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@OneToMany(type => Recipe, recipe => recipe.category)
	recipes: Recipe[];
}