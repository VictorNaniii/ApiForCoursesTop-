import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TopPageModel } from './TopPageModel';
import { TopPageDto } from './dto/top-pageDto';
import { Model } from 'mongoose';
import { FindProductDto } from './dto/FindProductDto';

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPageModel.name)
    private readonly topPageModel: Model<TopPageModel>,
  ) {}

  async create(dto: TopPageDto) {
    const createTopPage = await this.topPageModel.create(dto);
    if (!createTopPage)
      throw new BadGatewayException('Please introduce right data');
    return createTopPage;
  }

  async get(id: string) {
    const FindTopPage = await this.topPageModel.findById(id).exec();
    if (!FindTopPage) throw new BadGatewayException('Invalid id');
    return FindTopPage;
  }

  async delete(id: string) {
    const delTopPage = await this.topPageModel.findByIdAndDelete(id).exec();
    if (!delTopPage) throw new BadGatewayException('Invalid id');
    return delTopPage;
  }

  async update(id: string, dto: TopPageDto) {
    const updatePage = await this.topPageModel
      .findByIdAndUpdate(id, dto, {
        new: true,
      })
      .exec();
    if (!updatePage) throw new BadGatewayException('Page not found!');
    return updatePage;
  }

  async find(dto: FindProductDto) {
    const findPage = await this.topPageModel.find(
      {
        firstCategory: dto.firstCategory,
      },
      {
        alias: 1,
        secondCategory: 1,
        title: 1,
      },
    );
  }
}
