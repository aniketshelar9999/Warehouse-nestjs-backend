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
import { Supplier } from 'src/modules/suppliers/entities/supplier.entity';
import { ProductStatus } from '../enums/product-status.enum';


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

    @ManyToOne(() => Supplier)
    @JoinColumn({ name: 'supplier_id' })
    supplier!: Supplier;

    @Column({ type: 'text', nullable: true })
    description!: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    sellingPrice!: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    costPrice!: number;

    @Column({ type: 'int', default: 0 })
    stock!: number;

    @Column({
        type: 'varchar',
        length: 20,
        default: ProductStatus.ACTIVE,
    })
    status!: ProductStatus;

    @Column({ type: 'text', nullable: true })
    imageUrl?: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    barcode?: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;


}