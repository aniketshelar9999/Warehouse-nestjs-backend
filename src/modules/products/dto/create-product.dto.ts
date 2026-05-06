import { IsNotEmpty, IsString, IsUUID, IsOptional, IsNumber } from 'class-validator';

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

    @IsOptional()
    @IsString()
    description?: string;

    @IsNumber()
    price!: number;
}
