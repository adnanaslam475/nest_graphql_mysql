import { Field, ObjectType } from "@nestjs/graphql";

// @ObjectType()
// export class PageInfo {
//     constructor(next?: string, previous?: string) {
//         this.hasNextPage = (!next || next.length === 0);
//         this.hasPrevPage = (!previous || previous.length === 0);
//     }

//     @Field()
//     hasNextPage: boolean

//     @Field()
//     hasPrevPage: boolean
// }

export interface IPaginated<T> {
    nodes: T[];
    currentPage: number;
    totalCount: number;
    totalPages: number;
    search?: {
        start_date?: Date;
        end_date?: Date;
    }
    // pageInfo: PageInfo;
}