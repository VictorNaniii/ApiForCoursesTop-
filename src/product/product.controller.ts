import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PrductModel } from './product.model';
// import { AuthService } from './../auth/auth.service';
import { findProductDto } from './dto/findPrdouctDto';
import { CreateProductDto } from './dto/create.product.dto';
import { ProductService } from './product.service';
import { IdValidationPipes } from 'src/Pipes/id-validation-pipes';

@Controller('product')
export class ProductController {
  constructor(private readonly prductService: ProductService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateProductDto) {
    return this.prductService.create(dto);
  }

  @Get(':id')
  async get(@Param('id', IdValidationPipes) id: string) {
    return this.prductService.findById(id);
  }

  @Delete(':id')
  async delete(@Param('id', IdValidationPipes) id: string) {
    return this.prductService.deleteProduct(id);
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async patch(
    @Param('id', IdValidationPipes) id: string,
    @Body() dto: CreateProductDto,
  ) {
    return this.prductService.update(id, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find-product')
  async findProduct(@Body() dto: findProductDto) {
    return this.prductService.findWithReview(dto);
  }
}
