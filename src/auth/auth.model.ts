import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { TimeStamps, Base } from '@typegoose/typegoose';

// export interface authModel extends Base {}
@Schema({ timestamps: true })
export class AuthModel {
  @Prop()
  email: string;

  @Prop()
  passwordHash: string;
}

export const AuthSchema = SchemaFactory.createForClass(AuthModel);
