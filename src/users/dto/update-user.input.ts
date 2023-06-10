import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => Int)
  userId?: number;

  @Field(() => String)
  password?: string;

  @Field(() => String)
  confirm_password?: string;
}
