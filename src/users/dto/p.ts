import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class PasswordInput extends PartialType(CreateUserInput) {
    @Field(() => String)
    newpassword: string;

    @Field(() => String)
    confirmpassword: string;
}
