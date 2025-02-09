import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class AuthModel {
  @Prop()
  email: string;

  @Prop()
  passwordHash: string;
}

export const AuthSchema = SchemaFactory.createForClass(AuthModel);
