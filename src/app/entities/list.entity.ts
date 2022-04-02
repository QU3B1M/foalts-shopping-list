// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ItemOnList } from "./item_on_list.entity";

@Entity()
export class List extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

  @ManyToMany(() => ItemOnList)
  @JoinTable()
  ItemOnList: ItemOnList[];
	@Column()
	createdAt: Date;
	@Column()
	status: string;
}
