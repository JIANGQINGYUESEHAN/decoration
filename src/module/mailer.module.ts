
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({})
export class MailModule {
  static forRootAsync() {
    return {
      module: MailModule,
      imports: [
        MailerModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            transport: {
              host: configService.get('Mail.host'),
              port: configService.get<number>('Mail.port'),
              ignoreTLS: true,
              secure: false,
              auth: {
                user: configService.get('Mail.user'),
                pass: configService.get('Mail.pass'),
              },
            },
            defaults: {
              from: configService.get('Mail.from'),
            },
            preview: false,
            template: {
              dir: __dirname + '/../templates',
              adapter: new HandlebarsAdapter(),
              options: {
                strict: true,
              },
            },
          }),

        }),
      ],
    };
  }
}

