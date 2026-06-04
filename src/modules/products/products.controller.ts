import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('products')
@UseInterceptors(AnyFilesInterceptor())
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post()

    create(@Body() dto: CreateProductDto) {
        return this.productsService.create(dto);
    }

    @Get()
    findAll(@Query() query: any) {
        return this.productsService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
        return this.productsService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productsService.remove(id);
    }

}