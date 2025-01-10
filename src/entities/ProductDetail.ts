import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn ,ManyToOne} from 'typeorm';

import { Product } from './Product';

@Entity('productdetail')
export class ProductDetail extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    lang: string;
    
    @Column()
    name: string;
    
    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    curenncy: string; 
    
    @ManyToOne(() => Product, product => product.productDetails)
    product: Product;
    
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
    
    @CreateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
    
    }