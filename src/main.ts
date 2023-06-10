import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
// import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import { AppModule } from './app.module';

declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    // { rawBody: true, bodyParser: true },
    //   {
    //   cors: {
    //     credentials: true,
    //     // origin: ['http://localhost:3000'],
    //   },
    // }
  );
  await app.listen(5000);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  console.log('succeess.?');
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
// "start:dev": "nest start --watch",
// "start:dev": "nest build --webpack --webpackPath webpack-hmr.config.js --watch",
