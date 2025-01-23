import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { TopPageService } from './top-page.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPageSchema } from './TopPageModel';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TopPageModule.name,
        schema: TopPageSchema,
      },
    ]),
  ],
  controllers: [TopPageController],
  providers: [TopPageService],
})
export class TopPageModule {}
