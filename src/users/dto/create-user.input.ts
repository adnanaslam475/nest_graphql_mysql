import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'password of the user' })
  password: string;

  @Field(() => String, { description: 'email of the user' })
  email: string;
}
