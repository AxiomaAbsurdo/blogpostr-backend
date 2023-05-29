import { Controller, Post, Body } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/generate-blog')
  async generateBlog(
    @Body() body: { text: string; tone: string },
  ): Promise<string> {
    return this.appService.generateBlog(body);
  }
}
