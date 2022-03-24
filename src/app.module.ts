import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetsModule } from './pets/pets.module';
import { OwnersModule } from './owners/owners.module';
import * as path from 'path';
import { ConfigurationModule } from './config/configuration.module';
import { DatabaseModule } from './db/database.module';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
    // }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      driver: ApolloDriver,
      debug: false,
      playground: true,
      cors: {
        origin: 'http://localhost:3000',
        credentials: false,
      },
    }),
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'db.sqlite',
    //   synchronize: true,
    //   entities: ['dist/**/*.entity{.ts,.js}'],
    // }),
    // TypeOrmModule.forRootAsync({
    //   useFactory: () => {
    //     const options: TypeOrmModuleOptions = {
    //       type: 'postgres',
    //       host: 'localhost',
    //       port: 5432,
    //       username: 'admin',
    //       password: 'password',
    //       database: 'test_db',
    //       entities: [Pet, Owner],
    //       synchronize: true,
    //     };
    //     return options;
    //   },
    // }),
    PetsModule,
    OwnersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
