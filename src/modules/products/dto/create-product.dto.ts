import { IsNotEmpty, IsString, IsUUID, IsOptional, IsNumber, IsPositive, IsInt, IsEnum } from 'class-validator';
import { ProductStatus } from '../enums/product-status.enum';
import { Type } from 'class-transformer';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    sku!: string;

    @IsUUID()
    brandId!: string;

    @IsUUID()
    categoryId!: string;

    @IsUUID()
    supplierId!: string;

    @IsOptional()
    @IsString()
    description?: string;

    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    sellingPrice!: number;

    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    costPrice!: number;

    @Type(() => Number)
    @IsInt()
    @IsPositive()
    stock!: number;

    @IsOptional()
    @IsEnum(ProductStatus)
    status?: ProductStatus; // default = active in entity

    @IsOptional()
    @IsString()
    imageUrl?: string;

    @IsOptional()
    @IsString()
    barcode?: string;
}
