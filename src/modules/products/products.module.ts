import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/products.entity';
import { Brand } from '../brands/entities/brand.entity';
import { Category } from '../categories/entities/categories.entity';
import { Supplier } from 'src/modules/suppliers/entities/supplier.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Product, Brand, Category, Supplier])],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule { }