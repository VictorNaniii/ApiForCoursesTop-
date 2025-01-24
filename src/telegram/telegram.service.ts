import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { ITelegramDto } from './DTO/telegramDto';
import { getTelegramConfig } from 'src/configs/get-telegram-config';
@Injectable()
export class TelegramService {
  bot: Telegraf;
  options: ITelegramDto;

  constructor() {
    getTelegramConfig().then((config) => {
      this.options = config;
    });
    this.bot = new Telegraf(this.options.token);
  }

  async sendMessage(message: string, chatId: string = this.options.chatId) {
    await this.bot.telegram.sendMessage(chatId, message);
  }
}
