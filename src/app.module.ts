import { Module } from '@nestjs/common';
import { DatabaseModule } from './module/database.module';
import { GetConfig } from 'typeormoption';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import AppPipe from './pipe/app.pipe';
import { AppFilter } from './filter/http..excepetion';
import { AppInterceptor } from './intercepter/app.intercepter';
import { SerializeInterceptor } from './intercepter/serialization.intercepter';
import { ConfigModule, ConfigService } from '@nestjs/config';

import redisConfig from './config/redis.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as entities from './database/entity'
import * as repositories from './database/repository'
import * as services from './service'
import * as controllers from './controller'
import MailerConfig from './config/mailer.config';

import { RedisModule } from './redis/redis.module';
import { SenderModule } from './sender/sender.module';


@Module({
  imports: [
    DatabaseModule.forRoot(GetConfig()),
    TypeOrmModule.forFeature(Object.values(entities)),
    DatabaseModule.forRepository(Object.values(repositories)),
    //MailModule.forRootAsync(),
    /* 邮件验证暂时不写 */
    //SenderModule,
    RedisModule,
    ConfigModule.forRoot(
      {
        load: [redisConfig, MailerConfig],
        isGlobal: true
      }
    ),

  ],
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
