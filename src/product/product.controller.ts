import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PrductModel } from './product.model';
// import { AuthService } from './../auth/auth.service';
import { findProductDto } from './dto/findPrdouctDto';

@Controller('product')
export class ProductController {
  // constructor(private readonly prductService: PrductModel) {}

  @Post('create')
  async create(@Body() dto: Omit<PrductModel, '_id'>) {}

  @Get(':id')
  async get(@Param('id') id: string) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {}

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: PrductModel) {}

  @HttpCode(200)
  @Post()
  async findProduct(@Body() dto: findProductDto) {}
}
