import { DynamicModule, Module } from '@nestjs/common';
import { RedisModule, RedisModuleOptions } from 'nestjs-redis';


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







