import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReviewModule } from './review.module';
import { CreateReviewDto } from './dto/create-review-dto';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('create')
  async create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.reviewService.delete(id);
  }

  @Get('byProduct/:productId')
  async getProduct(@Param('productId') productId: string) {
    return this.reviewService.findByIdProduct(productId);
  }
}
