import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { Request, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/users/user.decorator.graphql';
import { User } from 'src/users/entities/user.entity';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

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
      userId: user.userId,
    });
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
      userId: user.userId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Product)
  removeProduct(
    @CurrentUser() user: User,
    @Args('id', { type: () => Int }) id: number,
  ) {
    console.log('thisreme');
    return this.productsService.remove(id, user.userId);
  }
}
