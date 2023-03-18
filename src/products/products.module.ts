import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { AuthorResolver } from 'src/substrciptions';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [
    ProductsResolver,
    ProductsService,
    AuthorResolver,
    CloudinaryService,
    JwtStrategy,
  ],
  exports: [ProductsService],
})
export class ProductsModule { }
