import { BadRequestException, Injectable, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggingInterceptor } from 'src/users/users.interceptors';
// import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { getConnection, Like, Repository } from 'typeorm';
import { FetchProductsArgs } from './dto/fetch-products-input';
// import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';

@Injectable()
// @UseInterceptors(LoggingInterceptor)
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRespository: Repository<Product>,
  ) { }

  async create(createProductInput: any) {
    const product = this.productsRespository.create(createProductInput);
    return await this.productsRespository.save(product);
  }

  async findAll() {
    return await this.productsRespository.find();
  }

  findOne(id: number) {
    return this.productsRespository.findOne({ where: { id } });
  }

  async update(id: number, updateProductInput: UpdateProductInput) {
    return await this.productsRespository.save({
      id,
      ...updateProductInput,
    });
  }

  async remove(id: number, userId: number) {
    return await this.productsRespository.delete({ id, userId });
  }

  async findwithPagination({
    page,
    limit,
    orderBy,
    column,
  }: FetchProductsArgs): Promise<Product[]> {
    const products: Product[] = await this.productsRespository.find({
      take: limit,
      skip: limit * (page - 1),

      order: {
        [column]: orderBy,
      },
    });
    return products;
  }

  async removeManyProducts(ids: any, userId) {
    return await this.productsRespository
      .createQueryBuilder()
      .delete()
      .from(Product)
      .where('id IN (:...id)', { id: ids || [] })
      .andWhere('userId = :userId', { userId })
      .execute();
  }
}
