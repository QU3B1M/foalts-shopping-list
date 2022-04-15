// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ItemOnList extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

	@ManyToOne(() => Product)
  @JoinColumn()
	product: Product;
  @Column()
  price: number;
  @Column()
  quantity: number;
}
