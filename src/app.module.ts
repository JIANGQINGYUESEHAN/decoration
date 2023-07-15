import { Module } from '@nestjs/common';
import { DatabaseModule } from './module/database.module';
import { GetConfig } from 'typeormoption';

@Module({
  imports: [DatabaseModule.forRoot(GetConfig())],
  controllers: [],
  providers: [],
})
// eslint-disable-next-line prettier/prettier
export class AppModule { }
