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
import { UserEmail } from 'src/decorators/user-email.decorators';
import { IdValidationPipes } from 'src/Pipes/id-validation-pipes';

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
  async delete(
    @Param('id', IdValidationPipes) id: string,
    @UserEmail() email: string,
  ) {
    console.log(email);
    return this.reviewService.delete(id);
  }

  @Get('byProduct/:productId')
  async getProduct(@Param('productId', IdValidationPipes) productId: string) {
    return this.reviewService.findByIdProduct(productId);
  }

  @Get('delete-all-review/:ProducID')
  async deleteAllReviewByProduct(
    @Param('productId', IdValidationPipes) productId: string,
  ) {
    return this.reviewService.deleteAllReviewByProduct(productId);
  }
}
