import { InputType, Int, Field, Float, ArrayElement } from '@nestjs/graphql';
import graphqlTypeJson from 'graphql-type-json';
import { CreateDateColumn } from 'typeorm';

@InputType()
export class CreateProductInput {
  @Field(() => String, { description: 'title of product' })
  title: string;

  @Field(() => String, { description: 'description of product' })
  description: string;

  @Field(() => Float, { description: 'price of product' })
  price: number;

  @Field(() => Int, { defaultValue: null, description: 'suerid of product' })
  userId?: number;

  @Field(() => graphqlTypeJson, {
    defaultValue: null,
    description: 'suerid of product',
  })
  images?: object;
  @CreateDateColumn()
  createdAt: Date;
}
