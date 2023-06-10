import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  // @Field(() => String, { description: 'password of the user' })
  // password: string;

  @Field(() => String, { description: 'email of the user' })
  email: string;

  @Field(() => String, { description: 'firstname of the user' })
  firstname: string;
  @Field(() => String, { description: 'lastname of the user' })
  lastname: string;

  @Field(() => String, { description: 'mac/ip of the user' })
  mac: string;


  @Field(() => String, { description: 'phone of the user' })
  phone: string;
  @Field(() => String, { description: 'role of the user' })
  role: string;

}
