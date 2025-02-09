import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

class ProductCharacteristic {
  @Prop()
  name: string;

  @Prop()
  value: number;
}
@Schema({ timestamps: true })
export class PrductModel {
  @Prop()
  image: string;
  @Prop()
  title: string;
  @Prop()
  price: number;
  @Prop()
  oldPrice?: number;
  @Prop()
  credit: number;

  @Prop()
  description: string;
  @Prop()
  advantages: string;
  @Prop()
  disAdvantages: string;
  @Prop({ type: () => [String] })
  categories: string[];
  @Prop({ type: () => [String] })
  tags: string[];
  @Prop({ type: () => [ProductCharacteristic], _id: false })
  characteristic: ProductCharacteristic[];
}

export const ProductSchema = SchemaFactory.createForClass(PrductModel);
