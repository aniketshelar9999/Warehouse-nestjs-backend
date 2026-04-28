import { IsUUID } from 'class-validator';

export class CreateBrandSupplierDto {
    @IsUUID()
    brandId!: string;

    @IsUUID()
    supplierId!: string;
}