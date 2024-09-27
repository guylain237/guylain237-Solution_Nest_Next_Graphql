import { Module } from '@nestjs/common';
import { PersonModule } from './person/person.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './person/entities/person.entity';
import { AnimalModule } from './animal/animal.module';
import { Animal } from './animal/entities/animal.entity';

@Module({
  imports: [
    //Importation du module PersonModule et AnimalModule
    PersonModule,
    AnimalModule,

    //Importation du module GraphQLModule avec la méthode forRoot
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.graphql',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    /*Importation du module ConfigModule et TypeOrmModule avec la méthode
     forRootAsync pour la configuration de la base de données*/

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('HOST'),
        port: +configService.get('PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DATABASE'),
        entities: [Person, Animal],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
