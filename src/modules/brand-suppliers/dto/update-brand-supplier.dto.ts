import { IsUUID, IsOptional } from 'class-validator';

export class UpdateBrandSupplierDto {
    @IsUUID()
    @IsOptional()
    brandId?: string;

    @IsUUID()
    @IsOptional()
    supplierId?: string;
}