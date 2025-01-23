import {
  Body,
  Controller,
  Param,
  Delete,
  HttpCode,
  Patch,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { FindProductDto } from './dto/FindProductDto';
import { TopPageDto } from './dto/top-pageDto';
import { TopPageService } from './top-page.service';
import { IdValidationPipes } from 'src/Pipes/id-validation-pipes';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: TopPageDto) {
    return this.topPageService.create(dto);
  }

  @Get(':id')
  async get(@Param('id', IdValidationPipes) id: string) {
    return this.topPageService.get(id);
  }

  @Delete(':id')
  async delete(@Param('id', IdValidationPipes) id: string) {
    return this.topPageService.delete(id);
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async patch(
    @Param('id', IdValidationPipes) id: string,
    @Body() dto: TopPageDto,
  ) {
    return this.topPageService.update(id, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindProductDto) {
    return this.topPageService.find(dto);
  }
}
