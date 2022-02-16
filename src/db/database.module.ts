import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';

/**
 * This module is used for setup a connection using TypeOrm
 * with a database, in this case PostgreSQL.
 */
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const options: TypeOrmModuleOptions = {
          type: 'postgres',
          host: configService.get<string>('database.host'),
          port: parseInt(configService.get<string>('database.port')),
          username: configService.get<string>('database.username'),
          password: configService.get<string>('database.password'),
          database: configService.get<string>('database.database'),
          entities: [path.join(__dirname, '..', '/**/*.entity{.ts,.js}')],
          synchronize: true,
        };
        return options;
      },
    }),
  ],
})
export class DatabaseModule {}
