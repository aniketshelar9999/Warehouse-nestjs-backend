import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from './entities/supplier.entity';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Injectable()
export class SuppliersService {
    constructor(
        @InjectRepository(Supplier)
        private repo: Repository<Supplier>,
    ) { }

    create(dto: CreateSupplierDto) {
        const supplier = this.repo.create(dto);
        return this.repo.save(supplier);
    }

    findAll() {
        return this.repo.find({
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: string) {
        const supplier = await this.repo.findOne({ where: { id } });
        if (!supplier) throw new NotFoundException('Supplier not found');
        return supplier;
    }

    async update(id: string, dto: UpdateSupplierDto) {
        const supplier = await this.findOne(id);
        Object.assign(supplier, dto);
        return this.repo.save(supplier);
    }

    async remove(id: string) {
        const supplier = await this.findOne(id);
        return this.repo.remove(supplier);
    }
}
