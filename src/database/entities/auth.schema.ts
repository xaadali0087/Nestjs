import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type userDocument = User &
  Document & {
    _id?: any;
  };

@Schema({ timestamps: true })
export class User {
  _id?: any;
  @Prop()
  userName: string;
  @Prop()
  email: string;
  @Prop()
  bio: string;
  @Prop()
  walletAddress: string;

  @Prop()
  userImage: string;
}

export const userSchema = SchemaFactory.createForClass(User);
// { required: true, unique: true, lowercase: true, trim: true }