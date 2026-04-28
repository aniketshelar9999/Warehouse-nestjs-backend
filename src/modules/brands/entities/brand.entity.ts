import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { OneToMany } from 'typeorm';
import { BrandSupplier } from '../../brand-suppliers/entities/brand-supplier.entity'

@Entity('brands')
export class Brand {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ unique: true })
    name!: string;

    @Column({ nullable: true })
    description?: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToMany(() => BrandSupplier, (bs) => bs.brand)
    brandSuppliers!: BrandSupplier[];
}