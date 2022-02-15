import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetsModule } from './pets/pets.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { OwnersModule } from './owners/owners.module';
import * as path from 'path';
import { Pet } from './pets/entities/pet.entity';
import { Owner } from './owners/entities/owner.entity';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
    }),
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'db.sqlite',
    //   synchronize: true,
    //   entities: ['dist/**/*.entity{.ts,.js}'],
    // }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const options: TypeOrmModuleOptions = {
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'admin',
          password: 'password',
          database: 'test_db',
          entities: [Pet, Owner],
          synchronize: true,
        };
        return options;
      },
    }),
    PetsModule,
    OwnersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
