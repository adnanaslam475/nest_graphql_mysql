import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { Entity } from 'typeorm';

@Entity()
@ObjectType()
export class Video {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  userId: string;
}
