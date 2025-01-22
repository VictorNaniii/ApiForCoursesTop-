import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReviewModule } from './review.module';
import { CreateReviewDto } from './dto/create-review-dto';
import { ReviewService } from './review.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.reviewService.delete(id);
  }

  @Get('byProduct/:productId')
  async getProduct(@Param('productId') productId: string) {
    return this.reviewService.findByIdProduct(productId);
  }

  @Get('delete-all-review/:ProducID')
  async deleteAllReviewByProduct(@Param('productId') productId: string) {
    return this.reviewService.deleteAllReviewByProduct(productId);
  }
}
