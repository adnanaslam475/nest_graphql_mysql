import { Field, Int, ArgsType } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@ArgsType()
export class FetchProductsArgs {
  @Field(() => Int, { defaultValue: 10 })
  @Min(1)
  @Max(50)
  limit = 10;

  @Field(() => String, { defaultValue: '' })
  orderBy = '';

  @Field(() => Number, { defaultValue: 1 })
  page = 1;

  @Field(() => String, { defaultValue: '' })
  column = '';
}
