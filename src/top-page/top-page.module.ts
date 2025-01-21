import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { TopPageService } from './top-page.service';

@Module({
  controllers: [TopPageController],
  providers: [TopPageService],
})
export class TopPageModule {}
