import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthModel } from './auth.model';
import { Model } from 'mongoose';

import { registerDto } from './dto/registerDto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthModel.name)
    private readonly authModel: Model<AuthModel>,
  ) {}

  async register(dto: registerDto) {
    return this.authModel.create(dto);
  }
}
