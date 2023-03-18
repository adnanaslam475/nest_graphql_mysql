import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoResolvers } from './video.resolver';

@Module({
  providers: [VideoResolvers, VideoService]
})
export class VideoModule { }
