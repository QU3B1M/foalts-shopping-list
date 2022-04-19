// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class List extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;
	
	@ManyToMany(() => Product)
	@JoinTable()
	items: Product[];

	@Column()
	status: string;
}
