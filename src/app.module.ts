import { Module } from '@nestjs/common';
import { DatabaseModule } from './module/database.module';
import { GetConfig } from 'typeormoption';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import AppPipe from './pipe/app.pipe';
import { AppFilter } from './filter/http..excepetion';
import { AppInterceptor } from './intercepter/app.intercepter';
import { SerializeInterceptor } from './intercepter/serialization.intercepter';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';

import redisConfig from './config/redis';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as entities from './database/entity'
import * as repositories from './database/repository'
import * as services from './service'
import * as controllers from './controller'
@Module({
  imports: [
    DatabaseModule.forRoot(GetConfig()),
    TypeOrmModule.forFeature(Object.values(entities)),
    DatabaseModule.forRepository(Object.values(repositories)),
    ConfigModule.forRoot(
      {
        load: [redisConfig],
        isGlobal: true
      }
    ),
    {
      ...BullModule.forRootAsync({
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          redis: {
            host: config.get('redis.host'),
            port: config.get('redis.port'),
            password: config.get('redis.password'),
          },
        }),
      }),
      global: true,
    },],
  controllers: Object.values(controllers),
  exports: [...Object.values(services), DatabaseModule.forRepository(Object.values(repositories)),],
  providers: [
    ...Object.values(services),
    {
      provide: APP_INTERCEPTOR,
      useClass: SerializeInterceptor,

    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AppInterceptor,
    },
    {
      provide: APP_PIPE,
      useValue: new AppPipe({
        validationError: { target: true },
        forbidUnknownValues: true,
        transform: true,
        whitelist: true,
      }),
    },
    {
      provide: APP_FILTER,
      useClass: AppFilter,
    },
  ],
})
// eslint-disable-next-line prettier/prettier
export class AppModule { }
