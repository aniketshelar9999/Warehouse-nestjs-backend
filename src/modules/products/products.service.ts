import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/products.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Brand } from '../brands/entities/brand.entity';
import { Category } from '../categories/entities/categories.entity';
import { Supplier } from '../suppliers/entities/supplier.entity';



@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>,
        @InjectRepository(Brand)
        private readonly brandRepo: Repository<Brand>,
        @InjectRepository(Category)
        private readonly categoryRepo: Repository<Category>,
        @InjectRepository(Supplier)
        private readonly supplierRepo: Repository<Supplier>,
    ) { }

    async create(dto: CreateProductDto) {
        try {
            const brand = await this.brandRepo.findOne({ where: { id: dto.brandId } });
            if (!brand) throw new NotFoundException('Brand not found');

            const category = await this.categoryRepo.findOne({ where: { id: dto.categoryId } });
            if (!category) throw new NotFoundException('Category not found');

            const supplier = await this.supplierRepo.findOne({ where: { id: dto.supplierId } });
            if (!supplier) throw new NotFoundException('Supplier not found');

            const product = this.productRepo.create({
                name: dto.name,
                sku: dto.sku,
                description: dto.description,
                sellingPrice: dto.sellingPrice,
                costPrice: dto.costPrice,
                stock: dto.stock,
                status: dto.status,
                imageUrl: dto.imageUrl,
                barcode: dto.barcode,
                brand,
                category,
                supplier,
            });

            return await this.productRepo.save(product);

        } catch (error) {
            console.error('Error creating product:', error);

            // If it's already a NestJS HttpException, rethrow it
            // if (error instanceof HttpException) {
            //     throw error;
            // }

            // Otherwise throw a generic 500
            // throw new InternalServerErrorException('Failed to create product');
        }
    }


    // GET ALL PRODUCTS
    async findAll(query: any) {
        const { page = 1, limit = 10, search = '' } = query;
        const skip = (page - 1) * limit;

        const qb = this.productRepo
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.brand', 'brand')
            .leftJoinAndSelect('product.category', 'category')
            .leftJoinAndSelect('product.supplier', 'supplier');

        if (search) {
            qb.andWhere(
                `product.name ILIKE :search
             OR product.sku ILIKE :search
             OR product.barcode ILIKE :search`,
                { search: `%${search}%` },
            );
        }

        qb.skip(skip).take(limit);

        const [data, total] = await qb.getManyAndCount();

        return {
            data,
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / limit),
        };
    }

    // GET ONE PRODUCT
    async findOne(id: string) {
        const product = await this.productRepo.findOne({
            where: { id },
            relations: ['brand', 'category', 'supplier'],
        });

        if (!product) throw new NotFoundException('Product not found');
        return product;
    }


    // UPDATE PRODUCT
    async update(id: string, dto: UpdateProductDto) {
        const product = await this.findOne(id);

        if (dto.brandId) {
            const brand = await this.brandRepo.findOne({ where: { id: dto.brandId } });
            if (!brand) throw new NotFoundException('Brand not found');
            product.brand = brand;
        }

        if (dto.categoryId) {
            const category = await this.categoryRepo.findOne({ where: { id: dto.categoryId } });
            if (!category) throw new NotFoundException('Category not found');
            product.category = category;
        }

        if (dto.supplierId) {
            const supplier = await this.supplierRepo.findOne({ where: { id: dto.supplierId } });
            if (!supplier) throw new NotFoundException('Supplier not found');
            product.supplier = supplier;
        }

        delete dto.brandId;
        delete dto.categoryId;
        delete dto.supplierId;

        // ASSIGN ONLY SCALAR FIELDS
        Object.assign(product, dto);

        return this.productRepo.save(product);
    }

    async remove(id: string) {
        const product = await this.findOne(id);
        return this.productRepo.remove(product);
    }
}