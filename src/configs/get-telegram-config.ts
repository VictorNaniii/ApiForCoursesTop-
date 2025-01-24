import { ITelegramDto } from '../telegram/DTO/telegramDto';
import { ConfigService } from '@nestjs/config';

export const getTelegramConfig = async (): Promise<ITelegramDto> => {
  return {
    token: '',
    chatId: '',
  };
};
