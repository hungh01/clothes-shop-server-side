import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn ,OneToMany, } from 'typeorm';

import { ProductTypeDetail } from './ProductTypeDetail';
import { Product } from './Product';


@Entity('producttype')
export class ProductType extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => ProductTypeDetail, typeProductDetail => typeProductDetail.productType)
  productTypeDetails: ProductTypeDetail[];

  @OneToMany(() => Product, product => product.productType)
  products: Product[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

}