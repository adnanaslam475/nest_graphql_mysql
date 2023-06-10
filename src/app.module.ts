import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';

import { ProductsModule } from './products/products.module';
import { join } from 'path';
// import { UsersModule } from './users/users.module';
import { TypeOrmModuleOptions } from './typeormtype.module';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
// import { VideoModule } from './video/video.module';

@Module({
  imports: [

    GraphQLModule.forRoot
      // <ApolloDriverConfig>
      ({
        driver: ApolloDriver,
        buildSchemaOptions: {
          dateScalarMode: 'isoDate',
          numberScalarMode: 'float',
        },
        subscriptions: {

          'graphql-ws': true,
          'subscriptions-transport-ws': {
            path: '/graphql'
          }
        },
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        debug: true,
        playground: true,
        context: ({ req }) => {
          return { req };
        },
      }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      // host: 'host.docker.internal',
      host: 'localhost',
      port: 3306,
      username: 'root',
      retryAttempts: 5,
      retryDelay: 3600,
      password: 'password',
      database: 'new_schema',
      autoLoadEntities: true,
      synchronize: true, // foor tables generation
      // dropSchema: true,
      // entities: ['src/**/*.entity.ts']
    }),
    ProductsModule,
    AuthModule,
    UsersModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, JwtService],
})
export class AppModule { }
