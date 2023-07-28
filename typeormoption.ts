import * as fs from 'fs';
import * as dotenv from 'dotenv';

import { databaseConfig } from 'src/config/datbase.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
function SetConfig(fileName: string) {
  //先判断是否存在
  if (fs.existsSync(fileName)) {
    //读取文件

    return dotenv.parse(fs.readFileSync(fileName))
  }
  return {};
}

export function GetConfig(): TypeOrmModuleOptions {
  const CommonConfig = SetConfig('.env')
  const spaicalConfig = SetConfig(`.env.${process.env.NODE_ENV || 'development'}`)
  const Config = { ...CommonConfig, ...spaicalConfig }
  console.log(Config);
  return {
    type: Config[databaseConfig.DB_TYPE] as any,
    host: Config[databaseConfig.DB_HOST],
    port: Config[databaseConfig.DB_PORT] as any,
    username: Config[databaseConfig.DB_USERNAME],
    password: Config[databaseConfig.DB_PASSWORD],
    database: Config[databaseConfig.DB_DATABASE],
    synchronize: true,
    autoLoadEntities: true,
    logging: false,
  };
}


