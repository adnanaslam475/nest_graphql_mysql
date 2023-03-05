import { Resolver } from '@nestjs/graphql';
import { CloudinaryService } from './cloudinary.service';

@Resolver()
export class CloudinaryResolver {
  constructor(private readonly cloudinaryService: CloudinaryService) {}
}
