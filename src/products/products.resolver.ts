import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { Body, ParseIntPipe, UseGuards, ValidationPipe, UseInterceptors } from '@nestjs/common';
import { CurrentUser } from 'src/users/user.decorator.graphql';
import { User } from 'src/users/entities/user.entity';
import { LoggingInterceptor } from 'src/users/users.interceptors';
// import { FetchProductsArgs } from './dto/fetch-products-input';

@Resolver(() => Product)
// @UseGuards(JwtAuthGuard)
@UseInterceptors(LoggingInterceptor)

export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) { }
  @Query(() => [Product], { name: 'products' })
  findAll() {
    return this.productsService.findAll();
  }

  @Query(() => Product, { name: 'product' })
  getProductById(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.findOne(id);
  }

  @Mutation(() => Product)
  @UseGuards(JwtAuthGuard)
  createProduct(
    @CurrentUser() user: User,
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productsService.create({
      ...createProductInput,
      userId: user.id,
    });
  }

  @Query(() => [Product], { name: 'getProducts' })
  async findAllPage(
    @Args('page', ParseIntPipe) page: number,
    @Args('limit', { type: () => Int }) limit: number,
    @Args('column', { type: () => String, defaultValue: 'id' }) column: string,
    @Args('orderBy', { type: () => String, defaultValue: 'asc' }) orderBy: string,
  ): Promise<Product[]> {
    try {
      console.log('page=====', page)
      return await this.productsService.findwithPagination({
        page,
        limit,
        column,
        orderBy,
      });
    } catch (error) {
      console.log('er', error)
    }
  }

  @Mutation(() => Product)
  @UseGuards(JwtAuthGuard)
  updateProduct(
    @CurrentUser() user: User,
    @Args('id', { type: () => Int }) id: number,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productsService.update(id, {
      ...updateProductInput,
      userId: user.id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Product)
  removeProduct(
    @CurrentUser() user: User,
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.productsService.remove(id, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Product)
  removeManyProducts(
    @CurrentUser() user: User,
    @Args({ name: 'ids', type: () => [Number] }) ids: Number[],
  ) {
    return this.productsService.removeManyProducts(ids, user.id);
  }
}
