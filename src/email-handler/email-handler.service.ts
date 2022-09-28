import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class EmailHandlerService {
  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey("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");
  }

  async sendEmail(mail: SendGrid.MailDataRequired) {
    try {
      const transport = await SendGrid.send(mail);
      console.log("transport", transport);
      return transport;
    } catch (err) {
      throw err;
    }
  }
}
