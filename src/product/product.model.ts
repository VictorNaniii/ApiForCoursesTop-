import { Prop } from '@nestjs/mongoose';

export class PrductModel {
  @Prop()
  image: string;
  @Prop()
  title: string;
  @Prop()
  price: number;
  @Prop()
  oldPrice: number;
  @Prop()
  credit: number;
  @Prop()
  calculatedRating: number;
  @Prop()
  description: string;
  @Prop()
  advantages: string;
  @Prop()
  disAdvantages: string;
  @Prop()
  categories: string[];
  @Prop()
  tags: string[];
  @Prop()
  characteristic: string;
}
