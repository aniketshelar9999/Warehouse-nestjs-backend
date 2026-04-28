import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandSuppliersService } from './brand-suppliers.service';
import { BrandSuppliersController } from './brand-suppliers.controller';
import { BrandSupplier } from './entities/brand-supplier.entity';

@Module({
    imports: [TypeOrmModule.forFeature([BrandSupplier])],
    controllers: [BrandSuppliersController],
    providers: [BrandSuppliersService],
})
export class BrandSuppliersModule { }
