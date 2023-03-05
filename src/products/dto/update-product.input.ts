import { CreateProductInput } from './create-product.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import graphqlTypeJson from 'graphql-type-json';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  @Field(() => String, { description: 'title of product' })
  title: string;
  @Field(() => String, { description: 'description of product' })
  description: string;

  @Field(() => Int, { description: 'price of product' })
  price: number;

  @Field(() => graphqlTypeJson, {
    defaultValue: null,
    description: 'suerid of product',
  })
  images?: object;
}
