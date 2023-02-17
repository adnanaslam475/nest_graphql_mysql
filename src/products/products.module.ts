import { Module } from '@nestjs/common';
import { ProductsController } from './product.controller';
import { ProductsServices } from './product.services';

@Module({
  controllers: [ProductsController],
  providers: [ProductsServices],
})
export class ProductsModule {}
