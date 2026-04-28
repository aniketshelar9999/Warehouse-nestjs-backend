import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BrandSupplier } from './entities/brand-supplier.entity';
import { CreateBrandSupplierDto } from './dto/create-brand-supplier.dto';
import { UpdateBrandSupplierDto } from './dto/update-brand-supplier.dto';

@Injectable()
export class BrandSuppliersService {
    constructor(
        @InjectRepository(BrandSupplier)
        private readonly repo: Repository<BrandSupplier>,
    ) { }

    async create(dto: CreateBrandSupplierDto): Promise<BrandSupplier> {
        // Duplicate prevention
        const exists = await this.repo.findOne({
            where: {
                brandId: dto.brandId,
                supplierId: dto.supplierId,
            },
        });

        if (exists) {
            throw new BadRequestException('This supplier is already linked to this brand');
        }

        const entity = this.repo.create(dto);
        return this.repo.save(entity);
    }

    async findAll(): Promise<BrandSupplier[]> {
        return this.repo.find({
            relations: ['brand', 'supplier'],
        });
    }

    async findOne(id: string): Promise<BrandSupplier> {
        const record = await this.repo.findOne({
            where: { id },
            relations: ['brand', 'supplier'],
        });

        if (!record) {
            throw new NotFoundException('Brand–Supplier relationship not found');
        }

        return record;
    }

    async update(id: string, dto: UpdateBrandSupplierDto): Promise<BrandSupplier> {
        const record = await this.repo.findOne({ where: { id } });

        if (!record) {
            throw new NotFoundException('Brand–Supplier relationship not found');
        }

        // If brandId or supplierId is being changed → check duplicates again
        if (dto.brandId || dto.supplierId) {
            const newBrandId = dto.brandId ?? record.brandId;
            const newSupplierId = dto.supplierId ?? record.supplierId;

            const exists = await this.repo.findOne({
                where: {
                    brandId: newBrandId,
                    supplierId: newSupplierId,
                },
            });

            if (exists && exists.id !== id) {
                throw new BadRequestException('This supplier is already linked to this brand');
            }
        }

        Object.assign(record, dto);
        return this.repo.save(record);
    }

    async remove(id: string): Promise<void> {
        const record = await this.repo.findOne({ where: { id } });

        if (!record) {
            throw new NotFoundException('Brand–Supplier relationship not found');
        }

        await this.repo.remove(record);
    }
}
