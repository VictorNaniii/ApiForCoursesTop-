import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PrductModel } from './product.model';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create.product.dto';
import { findProductDto } from './dto/findPrdouctDto';
import { ReviewModel } from 'src/review/review.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(PrductModel.name)
    private readonly productModel: Model<PrductModel>,
  ) {}

  async create(dto: CreateProductDto) {
    const CreateProduct = await this.productModel.create(dto);
    if (!CreateProduct)
      throw new NotFoundException(
        'Something went wrong please complete all data',
      );

    return CreateProduct;
  }

  async findById(id: string) {
    const idProduct = await this.productModel.findById(id).exec();

    if (!idProduct)
      throw new NotFoundException(
        'Not valid product please introduce the right id of product',
      );

    return idProduct;
  }

  async deleteProduct(id: string) {
    const deleteProduct = await this.productModel.findByIdAndDelete(id).exec();
    if (!deleteProduct)
      throw new NotFoundException(
        'Not valid product please introduce the right id of product',
      );
    return deleteProduct;
  }

  async update(id: string, dto: CreateProductDto) {
    const updateProduct = await this.productModel
      .findByIdAndUpdate(id, dto, {
        new: true,
      })
      .exec();
    if (!updateProduct)
      throw new NotFoundException(
        'Not valid product please introduce the right id of product',
      );
    return updateProduct;
  }

  async findWithReview(dto: findProductDto) {
    return this.productModel
      .aggregate([
        {
          $match: {
            categories: dto.category,
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
        {
          $limit: dto.limit,
        },
        {
          $lookup: {
            from: 'reviewmodels',
            localField: '_id',
            foreignField: 'productId',
            as: 'review',
          },
        },
        {
          $addFields: {
            reviewCount: { $size: '$review' },
            reviewAvg: { $avg: '$review.rating' },
            review: {
              $function: {
                body: `function(reviews){
                        reviews.sort((a,b)=>{new Date(b.createdAt) -new Date(a.createdAt)})
                      return reviews;
                }`,
                args: ['$review'],
                lang: 'js',
              },
            },
          },
        },
      ])
      .exec() as unknown as (PrductModel & {
      review: ReviewModel[];
      reviewCount: number;
      reviewAvg: number;
    })[];
  }
}
