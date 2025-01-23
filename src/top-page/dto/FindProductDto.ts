import { IsEnum } from 'class-validator';
import { TopLevelCategory } from '../TopPageModel';

export class FindProductDto {
  @IsEnum(TopLevelCategory)
  firstCategory: TopLevelCategory;
}
