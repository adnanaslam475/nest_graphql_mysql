import { Field, Int, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class FetchUsersArgs {

    @Field(() => Number, { defaultValue: 1 })
    page = 1;

}
