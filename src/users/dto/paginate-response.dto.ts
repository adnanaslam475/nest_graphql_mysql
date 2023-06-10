import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '../../common/dto/paginate-response.dto';
import { User } from '../entities/user.entity';

@ObjectType()
export class PaginatedUsers extends Paginated(User) { }

