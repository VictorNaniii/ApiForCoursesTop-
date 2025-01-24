import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TopPageModel } from './TopPageModel';
import { TopPageDto } from './dto/top-pageDto';
import { Model } from 'mongoose';
import { FindProductDto } from './dto/FindProductDto';
import { title } from 'process';

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
    const findPage = await this.topPageModel
      .aggregate([
        {
          $match: {
            firstCategory: dto.firstCategory, // Match by firstCategory from dto
          },
        },
        {
          $group: {
            _id: { secondCategory: '$secondCategory' }, // Group by secondCategory
            pages: { $push: { alias: '$alias', title: '$title' } }, // Push alias and title into pages array
          },
        },
      ])
      .exec();

    if (!findPage)
      throw new BadGatewayException('Introduce right primary category');
    return findPage;
  }

  async searchInTheWholePage(q: string) {
    const findData = await this.topPageModel.find({
      $text: { $search: q, $caseSensitive: false },
    });

    if (!findData) throw new NotFoundException('Sorry nothing find');
    return findData;
  }
}
