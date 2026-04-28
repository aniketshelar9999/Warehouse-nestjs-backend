import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateSupplierDto {
    @IsString()
    @MaxLength(255)
    name!: string; // REQUIRED

    @IsOptional()
    @IsEmail()
    @MaxLength(255)
    contactEmail!: string; // REQUIRED

    @IsOptional()
    @IsString()
    @MaxLength(50)
    phone?: string; // OPTIONAL

    @IsOptional()
    @IsString()
    address?: string; // OPTIONAL
}
