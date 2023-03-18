import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Video } from '../graphql';
import { CreateVideoInput } from './dto/create-video.input';
// import { CreateVideoDto } from './dto/create-video.input';
import { VideoGuard } from './video.guard';
import { VideoService } from './video.service';

@Resolver('Video')
export class VideoResolvers {

  private pubSub: PubSub;

  constructor(private readonly videoService: VideoService) {
    this.pubSub = new PubSub();
  }

  @Query(() => Video)
  @UseGuards(VideoGuard)
  async videos() {
    return this.videoService.findAll();
  }

  // @Mutation(() => Video)
  // async create(@Args('input') args: CreateVideoInput): Promise<Video> {
  //   const video = await this.videoService.create(args);
  //   this.pubSub.publish('videoAdded', { videoAdded: video });
  //   return video;
  // }

  @Subscription(returns => Video, {
    filter: (payload, variables) =>
      payload.videoAdded.title === variables.title,
  })
  videoAdded() {
    return this.pubSub.asyncIterator('videoAdded');
  }
}

