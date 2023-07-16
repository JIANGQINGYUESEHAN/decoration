import { Module } from '@nestjs/common';
import { DatabaseModule } from './module/database.module';
import { GetConfig } from 'typeormoption';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import AppPipe from './pipe/app.pipe';
import { AppFilter } from './filter/http..excepetion';
import { AppInterceptor } from './intercepter/app.intercepter';
import { SerializeInterceptor } from './intercepter/serialization.intercepter';


@Module({
  imports: [DatabaseModule.forRoot(GetConfig())],
  controllers: [],
  providers: [
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
