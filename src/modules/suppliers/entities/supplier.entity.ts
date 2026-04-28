import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { OneToMany } from 'typeorm';
import { BrandSupplier } from '../../brand-suppliers/entities/brand-supplier.entity';

@Entity('suppliers')
export class Supplier {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ length: 255 })
    name!: string;

    @Column({ length: 255, nullable: true })
    contactEmail?: string;

    @Column({ length: 50, nullable: true })
    phone?: string;

    @Column({ type: 'text', nullable: true })
    address?: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToMany(() => BrandSupplier, (bs) => bs.supplier)
    brandSuppliers!: BrandSupplier[];
}
