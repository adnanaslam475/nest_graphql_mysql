import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { getConnection, Like, Repository } from 'typeorm';
// import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRespository: Repository<Product>,
  ) {}

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

  async removeMany(ids: any) {
    return await this.productsRespository
      .createQueryBuilder()
      .delete()
      .from(Product)
      .where('id IN (:...id)', { id: ids || [] })
      .execute();
  }
}
