import { ApolloDriver } from '@nestjs/apollo';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { ProductsModule } from './products/products.module';
// import { UsersModule } from './users/users.module';
// import { TypeOrmModuleOptions } from './typeormtype.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: true,
      playground: true,
      context: ({ req }) => ({ req }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      retryAttempts: 5,
      retryDelay: 3600,
      password: 'password',
      database: 'new_schema',
      autoLoadEntities: true,
      // entities: [Book],
      synchronize: true,
      dropSchema: true,
    }),
    ProductsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, JwtService],
  // exports: [],
})
export class AppModule {}
