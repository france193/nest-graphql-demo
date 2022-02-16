import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';

/**
 * This module upload the enviroment configuration using yaml file in the directory .env in the root project.
 * To specify the enviroment is necessary use the varible env NODE_ENV as one of three values:
 * - development
 * - test
 * - production
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      ignoreEnvFile: true,
    }),
  ],
})
export class ConfigurationModule {}
