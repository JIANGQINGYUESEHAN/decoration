import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";


@Injectable()
export class AuthService {
  constructor(private mailService: MailerService) { }

  async sendMail({ to, subject, html }) {
    await this.mailService.sendMail({

    });
  }
  // 其他验证逻辑...
}
