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
  calculatedRating: number;
  @Prop()
  description: string;
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
