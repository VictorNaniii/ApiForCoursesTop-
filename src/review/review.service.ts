import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReviewModel } from './review.model';
import { Model, Types } from 'mongoose';
import { CreateReviewDto } from './dto/create-review-dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(ReviewModel.name)
    private readonly reviewModel: Model<ReviewModel>,
  ) {}

  async create(dto: CreateReviewDto) {
    return this.reviewModel.create(dto);
  }

  async delete(id: string) {
    const deleteDoc = await this.reviewModel.findByIdAndDelete(id);
    if (!deleteDoc) throw new NotFoundException('Invalid review');
    return deleteDoc;
  }

  async findByIdProduct(productId: string) {
    const findProduct = await this.reviewModel
      .find({
        productId: new Types.ObjectId(productId),
      })
      .exec();
    if (!findProduct) throw new NotFoundException('Product not found');
    return findProduct;
  }
}
