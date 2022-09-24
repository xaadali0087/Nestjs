import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { User } from 'src/database/entities/auth.schema';
// import { User } from 'src/database/schemas/user.schema';
import { v4 as uuidv4 } from 'uuid';
import { SignatureDto } from './dto/signature.dto';
import { FILE_TYPE } from './types/storageTypes';

@Injectable()
export class S3StorageService {
  constructor(
    @Inject('S3') private readonly S3: S3,
    private readonly configService: ConfigService,
  ) {}

  async uploadPublicFile(type: string, file: any) {
    
    if (!file) {
      throw new BadRequestException('File not attached');
    }

    let path = '';

    switch (type) {
      case FILE_TYPE.USER_IMAGE:
        const id = uuidv4()
        path = `users/${id}/${FILE_TYPE.USER_IMAGE}`;
        break;
           default:
        break;
    }

    const uploadResult = await this.S3.upload({
      Bucket: "productkm",
      Body: file.buffer,
      Key: path,
      // ACL: 'public-read',
      ContentType: 'image/jpg',
    }).promise();

    return {
      url: uploadResult.Location,
      key: uploadResult.Key,
    };
  }

  // async uploadBase64File(UploadedFile: SignatureDto, user: User) {
  //   let { type, file } = UploadedFile;

  //   if (!file) {
  //     throw new BadRequestException('File not attached');
  //   }

  //   file = file.replace(/^data:image\/\w+;base64,/, '');

  //   file = Buffer.from(file, 'base64');

  //   let path = '';

  //   switch (type) {
  //     case FILE_TYPE.GPA_LEVEL:
  //       path = `users/${user._id}/${FILE_TYPE.GPA_LEVEL}`;
  //       break;
  //     case FILE_TYPE.PROFILE_PICTURE:
  //       path = `users/${user._id}/${FILE_TYPE.PROFILE_PICTURE}`;
  //       break;
  //     case FILE_TYPE.CHATS:
  //       let key1 = uuidv4();
  //       path = `users/${user._id}/${FILE_TYPE.CHATS}/${key1}`;
  //       break;
  //     case FILE_TYPE.NFT_TOKENS:
  //       let key3 = uuidv4();
  //       path = `nftTokens/${FILE_TYPE.NFT_TOKENS}/${key3}`;
  //       break;
  //     case FILE_TYPE.DIRECT_WIRE:
  //       let key4 = uuidv4();
  //       path = `users/${user._id}/${FILE_TYPE.DIRECT_WIRE}/${key4}`;
  //       break;

  //     default:
  //       break;
  //   }

  //   const uploadResult = await this.S3.upload({
  //     Bucket: this.configService.get('AWS_BUCKET'),
  //     Body: file,
  //     Key: path,
  //     ContentType: 'image/png',
  //   }).promise();

  //   return {
  //     url: uploadResult.Location,
  //     key: uploadResult.Key,
  //   };
  // }
}
