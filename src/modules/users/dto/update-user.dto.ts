import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../entities/user.entities';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;

    @IsOptional()
    refreshToken?: string | null;
}
