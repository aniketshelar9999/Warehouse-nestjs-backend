import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    Unique,
} from 'typeorm';
import { Brand } from '../../brands/entities/brand.entity';
import { Supplier } from '../../suppliers/entities/supplier.entity';

@Entity('brand_suppliers')
@Unique(['brandId', 'supplierId']) // prevent duplicates
export class BrandSupplier {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'uuid', name: 'brand_id' })
    brandId!: string;

    @Column({ type: 'uuid', name: 'supplier_id' })
    supplierId!: string;

    @ManyToOne(() => Brand, (brand) => brand.brandSuppliers, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'brand_id' })
    brand!: Brand;

    @ManyToOne(() => Supplier, (supplier) => supplier.brandSuppliers, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'supplier_id' })
    supplier!: Supplier;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}
