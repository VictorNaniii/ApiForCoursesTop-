import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from './../../node_modules/bson/src/objectid';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class ReviewModel {
  @Prop()
  name: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  rating: number;

  @Prop()
  productId: Types.ObjectId;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);
