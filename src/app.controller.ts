import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GqlAuthGuard } from './auth/dto/gql-auth-guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
