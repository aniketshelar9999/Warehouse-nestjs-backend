import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { BrandSuppliersService } from './brand-suppliers.service';
import { CreateBrandSupplierDto } from './dto/create-brand-supplier.dto';
import { UpdateBrandSupplierDto } from './dto/update-brand-supplier.dto';

@Controller('brand-suppliers')
export class BrandSuppliersController {
    constructor(private readonly service: BrandSuppliersService) { }

    @Post()
    create(@Body() dto: CreateBrandSupplierDto) {
        return this.service.create(dto);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateBrandSupplierDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}
