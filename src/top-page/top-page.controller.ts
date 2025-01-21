import {
  Body,
  Controller,
  Param,
  Delete,
  HttpCode,
  Patch,
  Get,
  Post,
} from '@nestjs/common';
import { TopPageModel } from './top-page.model';
import { FindProductDto } from './dto/FindProductDto';

@Controller('top-page')
export class TopPageController {
  async create(@Body() dto: Omit<TopPageModel, '_id'>) {}

  @Get(':id')
  async get(@Param('id') id: string) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {}

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: TopPageModel) {}

  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindProductDto) {}
}
