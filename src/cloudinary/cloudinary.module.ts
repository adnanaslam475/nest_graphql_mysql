import { Module } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';

@Module({
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryProvider, CloudinaryService],
  // imports: [ProductsService],
})
export class CloudinaryModule {}
