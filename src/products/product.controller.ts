import {
  Controller,
  Post,
  // Get,
  // Abstract,
  // Response,
  // Req,
  // Patch,
  // Delete,
  // Put,
  // Module,
  // Injectable,
  Body,
} from '@nestjs/common';
import { ProductsServices } from './product.services';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsServices) {}

  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
    //  title: string; desc: string; price: number },
  ) {
    const id = this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    console.log('is', id);

    return { id };
  }
}
