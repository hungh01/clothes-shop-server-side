import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn ,ManyToOne} from 'typeorm';
import { ProductType } from './ProductType';

@Entity('producttypedetail')
export class ProductTypeDetail extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lang: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => ProductType, (productType) => productType.productTypeDetails, {
    cascade: true
  })
  productType: ProductType;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

}