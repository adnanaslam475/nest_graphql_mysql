import { Resolver, Subscription } from "@nestjs/graphql";
import { PubSub } from 'graphql-subscriptions'
import { User } from "./users/entities/user.entity";
import { INestApplication } from '@nestjs/common';

const pubSub = new PubSub();

@Resolver((of) => User)
export class AuthorResolver {
    // ...
    @Subscription((x) => User)
    commentAdded() {
        return pubSub.asyncIterator('commentAdded');
    }
}