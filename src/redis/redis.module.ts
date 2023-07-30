import { Global, Module } from '@nestjs/common';


import { RedisService } from './services';
import { RedisOption } from './types';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  providers: [
    {
      inject: [ConfigService],
      provide: RedisService,
      useFactory: async (configService: ConfigService) => {
        // const configure = configService.get('Redis')
        // console.log(configService.get('Redis'));

        const service = new RedisService(await configService.get('Redis'));
        service.createClients();
        return service;
      },
    },
  ],
  exports: [RedisService],
})
export class RedisModule { }
