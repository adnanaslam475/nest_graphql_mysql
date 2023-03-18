import { Injectable } from '@nestjs/common';
import { User, Video } from 'src/graphql';
import { CreateVideoInput } from './dto/create-video.input';
import { UpdateVideoInput } from './dto/update-video.input';

@Injectable()
export class VideoService {
  private readonly videos: Video[] = [];



  create(videoDto: CreateVideoInput): Video {
    const listSize: number = this.videos.length + 1;
    const video: Video = new Video();
    video.id = listSize.toString();
    video.title = videoDto.title;
    video.url = videoDto.url;
    const author: User = { id: videoDto.userId, name: 'Author ' + videoDto.userId };
    video.author = author;
    this.videos.push(video);
    return video;
  }


  findAll() {
    return `This action returns all video`;
  }

  findOne(id: number) {
    return `This action returns a #${id} video`;
  }

  update(id: number, updateVideoInput: UpdateVideoInput) {
    return `This action updates a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }
}
