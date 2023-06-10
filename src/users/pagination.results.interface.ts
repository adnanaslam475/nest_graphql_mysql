// import { Field, ObjectType } from '@nestjs/graphql'
// import { PageInfo } from 'src/page-info.response';
// import { User } from './entities/user.entity';
// // import { PageInfo } from "../page-info.response.ts";


// @ObjectType()
// export class PaginateUserResponse {
//     constructor(currentPage: Number, totalCount: Number, totalPages: Number,
//         pageInfo: PageInfo, meta: any, items?: User[]) {
//         this.totalCount = totalCount;
//         this.currentPage = currentPage;
//         this.totalPages = totalPages;
//         this.pageInfo = pageInfo;
//         this.items = items;
//         this.meta = meta;
//     }

//     @Field()
//     currentPage: Number

//     @Field()
//     meta: {};

//     @Field()
//     totalCount: Number

//     @Field()
//     totalPages: Number

//     @Field()
//     pageInfo: PageInfo

//     @Field((type) => [User], { nullable: true })
//     items: User[];
// }