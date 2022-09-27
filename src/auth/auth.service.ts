import {
  BadRequestException, Injectable,
  NotFoundException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, userDocument } from 'src/database/entities/auth.schema';
import { PasswordReset, PasswordResetDocument } from 'src/database/entities/passwordReset.schema';
import { EmailHandlerService } from 'src/email-handler/email-handler.service';
import { VerifyPinDto } from './dto/verify-pin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModal: Model<userDocument>,
    private readonly emailService: EmailHandlerService,
    @InjectModel(PasswordReset.name)
    private readonly PasswordResetModel: Model<PasswordResetDocument>,
  ) {}
  async interNEwUser(AuthCredentialsDto) {
    try {
      let foundExistingEmail = await this.userModal.findOne({
        email: AuthCredentialsDto.email,
      });
  
      let foundExistingUserName = await this.userModal.findOne({
        userName: AuthCredentialsDto.userName,
      });
      console.log('foundExistingEmail', foundExistingEmail);
      console.log('foundExistingUserName', foundExistingUserName);
  
      if (foundExistingEmail) {
        throw new NotFoundException('User with that email already exists');
      }
  
      if (foundExistingUserName) {
        throw new NotFoundException('User with that name already exists');
      }
      let code = Math.floor(100000 + Math.random() * 900000);      ;
    //  const user =  await this.userModal.create(AuthCredentialsDto);
      const mail = {
        to: AuthCredentialsDto.email,
        subject: 'Emial Verification Pin',
        from: "adadmaan@gmail.com",
        text: `Your Email verification code is ${code}. Please do not share this with anyone.`,
      };
      
      await this.PasswordResetModel.create({
        email : AuthCredentialsDto.email,
        code,
      });
      await this.emailService.sendEmail(mail);
      return {
        // user: user,
        statud: true,
        message:
          'Verification code is send to your email please verify your email address',
      };
    } catch (error) {
      throw new BadRequestException(error)
      
    }

  }
  async registerusers(AuthCredentialsDto) {
    try {
   
     ;
     const user =  await this.userModal.create(AuthCredentialsDto);
     
     
      return {
        user: user,
        statud: true,
        message:
          'User register successfully',
      };
    } catch (error) {
      throw new BadRequestException(error)
      
    }

  }

  async verifyPasswordResetPin(verifyPinParams: VerifyPinDto) {
    try {
      const { code } = verifyPinParams;
      const dbCode = await this.PasswordResetModel.findOne({ code });
      if (!dbCode) {
        throw new NotFoundException('Invalid Code');
      }
      const user = await this.userModal.findOne({ email: dbCode.email });
      await this.PasswordResetModel.deleteOne({ _id: dbCode._id });
      return {
        message: 'Code validated',
        status: true,
      };
    } catch (err) {
      throw err;
    }
  }
  // async userLogin(email, password) {
  //   // let { email, password } = loginCredentialsDto;
  //   // const user = await this.userModal.findOne({ email: email.toLowerCase() });
  //   // if (user && (await bcrypt.compare(password, user.password))) {
  //   //   const accessToken: string = await this.getJwtToken(user);
  //   //   return {
  //   //     status: 'success',
  //   //     data: {
  //   //       accessToken,
  //   //       user,
  //   //     },
  //   //   };
  //   // } else {
  //   //   return null;
  //   // }
  // }

  // async changePassword(
  //   newPassword: string,
  //   oldPassword: string,
  //   userID: string,
  // ) {
  //   // try {
  //   //   /* find user */
  //   //   const findUser = await this.userModal.findById(userID);
  //   //   if (!findUser) throw new NotFoundException({ message: 'user not found' });
  //   //   /** match password */
  //   //   const verified = await bcrypt.compareSync(oldPassword, findUser.password);
  //   //   if (!verified)
  //   //     throw new ForbiddenException({ message: "password didn't match" });
  //   //   const hashPassword = bcrypt.hashSync(newPassword, 8);
  //   //   const _user = this.userModal.findByIdAndUpdate(
  //   //     { _id: userID },
  //   //     {
  //   //       password: hashPassword,
  //   //     },
  //   //   );
  //   //   return 'Password change successfully';
  //   // } catch (error) {
  //   //   throw error;
  //   // }
  // }

  // async forgetPassword(ForgotPasswordDto) {
  //   // try {
  //   //   const { email } = ForgotPasswordDto;
  //   //   // const user = await this.userModal.findOne({ email });
  //   //   // console.log('email---------', user);
  //   //   // if (!user) {
  //   //   //   throw new NotFoundException('User with the given email not found');
  //   //   // }
  //   //   let code = Math.floor(1000 + Math.random() * 9000);
  //   //   console.log(
  //   //     '🚀 ~ file: auth.service.ts ~ line 179 ~ AuthService ~ forgotPassword ~ code',
  //   //     code,
  //   //   );
  //   //   const mail = {
  //   //     to: email,
  //   //     subject: 'Password Reset Email',
  //   //     from: "test@yopmail.com",
  //   //     text: `Your password reset code is ${code}. Please do not share this with anyone.`,
  //   //   };
  //   //   await this.emailService.sendEmail(mail);
  //   //   return {
  //   //     message: 'Password reset email has been sent successfully!',
  //   //   };
  //   // } catch (error) {
  //   //   console.log(
  //   //     '🚀 ~ file: auth.service.ts ~ line 198 ~ AuthService ~ forgotPassword ~ err',
  //   //     error,
  //   //   );
  //   // }
  // }

  // async getJwtToken(user: any, is2FaAuthenticated = false) {
  //   // console.log("user::::", user);

  //   const payload: any = {
  //     userId: user.id,
  //     // name: user.name,
  //     // email: user.email,
  //   };
  //   return this.jwtService.sign(payload);
  // }

  // async findUser(userId: string) {
  //   return await this.userModal.findOne({ _id: userId });
  // }
}
