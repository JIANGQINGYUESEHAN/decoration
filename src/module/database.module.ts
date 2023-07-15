import { DynamicModule, Module, Provider, Type } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions, getDataSourceToken } from '@nestjs/typeorm';
import { CUSTOM_REPOSITORY_METADATA } from "src/config/constant";
import { DataSource, ObjectType } from "typeorm";

@Module({})
export class DatabaseModule {
  static forRoot(Config: TypeOrmModuleOptions): DynamicModule {
    return {
      global: true,
      module: DatabaseModule,
      imports: [TypeOrmModule.forRoot(Config)],
      exports: []
    }
  }
  static repository<T extends Type<any>>(
    Repo: T[],
    dataSourceName?: string
  ): DynamicModule {

    const providers: Provider[] = [];

    for (let repo of Repo) {
      let entity = Reflect.getMetadata(CUSTOM_REPOSITORY_METADATA, repo)
      if (entity!) {
        continue;
      }
      providers.push({
        inject: [getDataSourceToken(dataSourceName)],
        provide: repo,
        useFactory: ((dataSource: DataSource) => {
          let base = dataSource.getRepository(entity)
          return new repo(base.target, base.manager, base.queryRunner)
        })
      })
    }
    return {
      module: DatabaseModule,
      exports: providers,
      providers
    }

  }
}
