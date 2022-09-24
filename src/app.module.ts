import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { EmailHandlerModule } from './email-handler/email-handler.module';
import { S3StorageModule } from './s3Storage/s3Storage.module';

@Module({
  imports: [ DatabaseModule, AuthModule, S3StorageModule,EmailHandlerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
