import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Brand } from 'src/modules/brands/entities/brand.entity';
import { Category } from 'src/modules/categories/entities/categories.entity';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    @Column({ type: 'varchar', length: 150 })
    name!: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    sku!: string;

    @ManyToOne(() => Brand)
    @JoinColumn({ name: 'brand_id' })
    brand!: Brand;

    @ManyToOne(() => Category)
    @JoinColumn({ name: 'category_id' })
    category!: Category;

    @Column({ type: 'text', nullable: true })
    description!: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    price!: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;


}