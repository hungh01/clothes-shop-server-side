import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn ,OneToMany, ManyToOne} from 'typeorm';

import { ProductDetail } from './ProductDetail';
import { ProductType } from './ProductType';


@Entity('product')

export class Product extends BaseEntity {
    
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => ProductType, productType => productType.products)
  productType: ProductType;

  @Column({ type: 'text', array: true })
  imageURL: string[];

  @OneToMany(() => ProductDetail, productDetail => productDetail.product)
  productDetails: ProductDetail[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}