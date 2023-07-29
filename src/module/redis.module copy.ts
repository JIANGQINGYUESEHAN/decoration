import { DynamicModule, Module } from '@nestjs/common';
import { RedisModule, RedisModuleOptions } from 'nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';

export class redisModule {
  static forRoot(RedisOption: RedisModuleOptions): DynamicModule {
    return {
      global: true,
      module: redisModule,
      imports: [
        RedisModule.register(RedisOption),
      ],
    };
  }
}







