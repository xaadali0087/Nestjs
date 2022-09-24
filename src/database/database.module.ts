import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './entities/auth.schema';
import { PasswordReset, PasswordResetSchema } from './entities/passwordReset.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://decentralverse:mahboobmahboob123$@cluster0.pb111kz.mongodb.net/test'),
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    MongooseModule.forFeature([
      { name: PasswordReset.name, schema: PasswordResetSchema },
    ]),
  ],

  controllers: [],
  exports: [MongooseModule],
})
export class DatabaseModule {}
