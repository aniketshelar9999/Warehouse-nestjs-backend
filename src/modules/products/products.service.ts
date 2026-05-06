import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/products.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Brand } from '../brands/entities/brand.entity';
import { Category } from '../categories/entities/categories.entity';



@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>,
        @InjectRepository(Brand)
        private readonly brandRepo: Repository<Brand>,
        @InjectRepository(Category)
        private readonly categoryRepo: Repository<Category>,
    ) { }

    async create(dto: CreateProductDto) {
        const brand = await this.brandRepo.findOne({ where: { id: dto.brandId } });
        if (!brand) throw new NotFoundException('Brand not found');

        const category = await this.categoryRepo.findOne({ where: { id: dto.categoryId } });
        if (!category) throw new NotFoundException('Category not found');

        const product = this.productRepo.create({
            name: dto.name,
            sku: dto.sku,
            description: dto.description,
            price: dto.price,
            brand,
            category,
        });

        return this.productRepo.save(product);
    }

    // GET ALL PRODUCTS
    findAll() {
        return this.productRepo.find({
            relations: ['brand', 'category'],
            order: { createdAt: 'DESC' },
        });
    }

    // GET ONE PRODUCT
    async findOne(id: string) {
        const product = await this.productRepo.findOne({
            where: { id },
            relations: ['brand', 'category'],
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

        Object.assign(product, dto);
        return this.productRepo.save(product);
    }
    async remove(id: string) {
        const product = await this.findOne(id);
        return this.productRepo.remove(product);
    }
}