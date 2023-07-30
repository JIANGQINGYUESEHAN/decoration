import { Module, ModuleMetadata, Global } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { SmtpService } from './services';


@Global()
@Module({
  providers: [
    {
      inject: [ConfigService],
      provide: SmtpService,
      useFactory: async (configService: ConfigService) => {
        const service = new SmtpService(await configService.get('Mailer'))

        service.createClient()
        return service;
      }
    }
  ],
  exports: [SmtpService]

})
export class SenderModule { }
