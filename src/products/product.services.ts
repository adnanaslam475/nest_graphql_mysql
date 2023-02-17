import { Injectable } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsServices {
  products: Product[] = [];
  insertProduct(title: string, desc: string, price: number) {
    const newProduct = new Product(
      new Date().toTimeString(),
      title,
      price,
      desc,
    );
    this.products.push(newProduct);
  }
}
