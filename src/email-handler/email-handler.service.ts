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
