import * as path from 'path';
import { Injectable } from '@nestjs/common';
import Email from 'email-templates';
import { pick } from 'lodash';

import Mail from 'nodemailer/lib/mailer';
import SMTPConnection from 'nodemailer/lib/smtp-connection';
import * as mailer from 'nodemailer';
import { SmtpConfig, SmtpSendParams } from '../types';


/**
 * SMTP邮件发送驱动
 */
@Injectable()
export class SmtpService {
  /**
   * 初始化配置
   * @param options
   */
  constructor(protected readonly options: SmtpConfig) {
    this.options = options
  }

  /**
   * 合并配置并发送邮件
   * @param params
   * @param options
   */
  async send<T>(params: SmtpSendParams & T) {
    const newOptions = this.options
    const client = this.createClient();
    return this.makeSend(client, params, newOptions);
  }

  /**
   * 创建NodeMailer客户端
   * @param options
   */
  createClient() {
    const { host, secure, user, password, port } = this.options;
    const clientOptions: SMTPConnection.Options = {
      host,
      secure: secure ?? false,
      auth: {
        user,
        pass: password,
      },
    };


    if (!clientOptions.secure) clientOptions.port = port ?? 25;
    return mailer.createTransport(clientOptions);
  }

  /**
   * 转义通用发送参数为NodeMailer发送参数
   * @param client
   * @param params
   * @param options
   */
  protected async makeSend(client: Mail, params: SmtpSendParams, options: SmtpConfig) {
    const tplPath = path.join(__dirname, './templates/verification.hbs')

    const textOnly = !params.html && params.text;
    const noHtmlToText = params.html && params.text;
    const configd: Email.EmailConfig = {
      preview: params.preview ?? false,
      send: !params.preview,
      message: { from: params.from ?? options.from ?? options.user },
      transport: client,
      subjectPrefix: params.subjectPrefix,
      textOnly,
      juiceResources: {
        preserveImportant: true,
        webResources: {
          relativeTo: tplPath,
        },
      },
    };
    if (noHtmlToText) configd.htmlToText = false;
    const email = new Email(configd);
    const message = {
      ...pick(params, ['from', 'to', 'reply', 'attachments', 'subject']),
      template: tplPath,
    };
    return email.send({
      template: tplPath,
      message,
      locals: params.vars,
    });
  }
}
