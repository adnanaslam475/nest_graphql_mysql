import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmpty } from 'class-validator';
import graphqlTypeJson from 'graphql-type-json';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { nullable: true, description: 'id of the user' })
  id: number;

  @Column({ nullable: true })
  @IsEmpty()
  @Field(() => String, { description: 'title of product' })
  title: string;

  @Column({ nullable: true })
  @IsEmpty()
  @Field(() => String, { description: 'description of product' })
  description: string;

  @Column({ nullable: true, default: null })
  @Field(() => Int, {
    defaultValue: 0,
    description: 'userId of creator of product',
  })
  userId: number;

  @Column()
  @IsEmpty()
  @Field(() => Int, { description: 'price of product' })
  price: number;

  @Column('json', { nullable: false })
  @Field(() => graphqlTypeJson, { nullable: true })
  images: object;
}
