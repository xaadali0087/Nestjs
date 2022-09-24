import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { S3StorageController } from './s3Storage.controller';
import { S3StorageService } from './s3Storage.service';

@Module({
  imports: [ConfigModule],
  controllers: [S3StorageController],
  exports: [S3StorageService],
  providers: [
    S3StorageService,
    {
      provide: 'S3',
      useFactory: (config: ConfigService) => {
        return new S3({
          accessKeyId: "AKIASVCEUW6U2T22NDF3",
          secretAccessKey: "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",
          region: "us-west-1",
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class S3StorageModule {}
