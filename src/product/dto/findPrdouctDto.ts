import { IsNumber, IsString } from 'class-validator';

export class findProductDto {
  @IsString()
  category: string;
  @IsNumber()
  limit: number;
}
