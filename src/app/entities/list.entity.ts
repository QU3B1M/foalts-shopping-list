// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ItemOnList } from "./item_on_list.entity";

@Entity()
export class List extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;
	@ManyToMany(() => ItemOnList)
	@JoinTable()
	items: ItemOnList[];
	@CreateDateColumn()
	createdAt: Date;
	@UpdateDateColumn()
	updated_at: Date;
	@Column()
	status: string;
}
